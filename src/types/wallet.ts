export interface WalletState {
  connected: boolean;
  address: string | null;
}

export interface WalletProvider {
  name: string;
  icon: string;
}