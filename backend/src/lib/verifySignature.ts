import { address, getAddressCodec } from "@solana/addresses";
import { sign } from 'tweetnacl';
import bs58 from 'bs58';

export async function verifySignature(
  userAddress: string,
  signature: string,
  message: string
): Promise<boolean> {
  try {
    const solanaAddress = address(userAddress);
    const signatureUint8 = bs58.decode(signature);
    const messageUint8 = new TextEncoder().encode(message);
    
    const addressCodec = getAddressCodec();
    const readOnlyBytes = addressCodec.encode(solanaAddress);
    const publicKeyBytes = new Uint8Array(readOnlyBytes);
    
    return sign.detached.verify(
      messageUint8,
      signatureUint8,
      publicKeyBytes
    );
  } catch (error) {
    console.error('Error verifying signature:', error);
    return false;
  }
} 