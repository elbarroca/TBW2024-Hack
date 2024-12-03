import { sign as tweetnacl_sign } from 'tweetnacl';
import bs58 from 'bs58';
import { supabase } from '../db/client';
import type { SignMessagePayload } from '../types/auth';

export class SignMessage {
  private payload: SignMessagePayload;

  constructor(payload: SignMessagePayload) {
    this.payload = payload;
  }

  public getPublicKey(): string {
    return this.payload.publicKey;
  }

  public getNonce(): string {
    return this.payload.nonce;
  }

  public prepare(): string {
    return `${this.payload.statement}${this.payload.nonce}`;
  }

  async validate(signature: string) {
    try {
      const msg = this.prepare();
      console.log('Backend verifying message:', msg);
      const signatureUint8 = bs58.decode(signature);
      const msgUint8 = new TextEncoder().encode(msg);
      const pubKeyUint8 = bs58.decode(this.getPublicKey());

      return tweetnacl_sign.detached.verify(
        msgUint8,
        signatureUint8,
        pubKeyUint8
      );
    } catch (error) {
      console.error('Error validating signature:', error);
      return false;
    }
  }
} 