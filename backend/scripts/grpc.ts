import Client, {
  SubscribeRequest,
  CommitmentLevel,
  SubscribeUpdate,
} from "@triton-one/yellowstone-grpc";
import { ClientDuplexStream } from "@grpc/grpc-js";
import { config } from "../src/lib/config";

// note: had problems on the startup so implemented a reconnection backoff strategy until getting a response
class GrpcManager {
  private client: Client | null = null;
  private stream: ClientDuplexStream<SubscribeRequest, SubscribeUpdate> | null =
    null;
  private reconnectTimeout: Timer | null = null;
  private initialReconnectDelay = 1000; // 1 second
  private maxReconnectDelay = 60000; // 1 minute
  private reconnectFactor = 1.5;
  private jitterFactor = 0.2;
  private currentReconnectDelay: number = this.initialReconnectDelay;

  private channelOptions = {
    "grpc.max_receive_message_length": 1024 * 1024, // 1 MB
    "grpc.max_send_message_length": 1024 * 1024, // 1 MB
    "grpc.keepalive_time_ms": 10000,
    "grpc.keepalive_timeout_ms": 5000,
    "grpc.keepalive_permit_without_calls": 1,
    "grpc.http2.max_pings_without_data": 0,
    "grpc.max_connection_idle_ms": 60000,
    "grpc.client_idle_timeout_ms": 60000,
  };

  async connect() {
    try {
      this.client = new Client(
        config.GRPC_ENDPOINT,
        config.GRPC_TOKEN,
        this.channelOptions,
      );
      this.stream = await this.client.subscribe();

      this.stream.on("data", this.handleData);
      this.stream.on("error", this.handleError);
      this.stream.on("end", this.handleEnd);

      await this.subscribe();
      console.log("Connected and subscribed to slot updates");
    } catch (error) {
      console.error("Failed to connect:", error);
      this.scheduleReconnect();
    }
  }

  private async subscribe() {
    const request: SubscribeRequest = {
      slots: {
        incoming_slots: {},
      },
      accounts: {},
      transactions: {},
      blocks: {},
      blocksMeta: {},
      accountsDataSlice: [],
      transactionsStatus: {},
      entry: {},
      commitment: CommitmentLevel.CONFIRMED,
    };

    if (!this.stream) {
      throw new Error("Stream is not initialized");
    }

    return new Promise<void>((resolve, reject) => {
      this.stream!.write(request, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  private handleData = (data: SubscribeUpdate) => {
    if (data.slot) {
      console.log("Slot update received:", data.slot);
    }
  };

  private handleError = (error: Error) => {
    console.error("Stream error:", error.message);
    this.scheduleReconnect();
  };

  private handleEnd = () => {
    console.log("Stream ended unexpectedly. Reconnecting...");
    this.scheduleReconnect();
  };

  private scheduleReconnect = () => {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    const jitteredDelay =
      this.currentReconnectDelay * (1 + Math.random() * this.jitterFactor);
    console.log(`Scheduling reconnection in ${Math.round(jitteredDelay)}ms`);

    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, jitteredDelay);

    // Calculate next delay for potential future reconnect
    this.currentReconnectDelay = Math.min(
      this.currentReconnectDelay * this.reconnectFactor,
      this.maxReconnectDelay,
    );
  };

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.stream) {
      this.stream.removeListener("data", this.handleData);
      this.stream.removeListener("error", this.handleError);
      this.stream.removeListener("end", this.handleEnd);
      this.stream.destroy();
      this.stream = null;
    }

    this.client = null;
    this.currentReconnectDelay = this.initialReconnectDelay;
  }
}

async function listenForSlotUpdates() {
  const grpcManager = new GrpcManager();
  await grpcManager.connect();

  process.on("SIGINT", () => {
    console.log("Caught interrupt signal. Disconnecting...");
    grpcManager.disconnect();
    process.exit();
  });
}

listenForSlotUpdates();
