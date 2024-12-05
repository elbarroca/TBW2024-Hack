import { Address, address } from '@solana/addresses';
import { getProgramDerivedAddress} from '@solana/addresses';

// Token Constants
export const TEN = BigInt(10);

export const USDC_MINT = address(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
);

export const SOL_MINT = address(
  "So11111111111111111111111111111111111111112",
);

// Program IDs
export const APP_PROGRAM_ID = 'App111111111111111111111111111111111111111' as Address;
export const COURSE_PROGRAM_ID = 'Course11111111111111111111111111111111111' as Address;
export const PAYMENT_PROGRAM_ID = 'Pay1111111111111111111111111111111111111' as Address;

// PDA Seeds
export const APP_SEED = 'app';
export const COURSE_SEED = 'course';
export const PAYMENT_SEED = 'payment';

// PDA Derivation Functions
export async function deriveAppPda(appId: string): Promise<Address> {
  const [pda] = await getProgramDerivedAddress({
    programAddress: APP_PROGRAM_ID,
    seeds: [
      APP_SEED,
      appId
    ]
  });
  return pda;
}

export async function deriveCoursePda(courseId: string): Promise<Address> {
  const [pda] = await getProgramDerivedAddress({
    programAddress: COURSE_PROGRAM_ID,
    seeds: [
      COURSE_SEED,
      courseId
    ]
  });
  return pda;
}

export async function derivePaymentPda(paymentId: string): Promise<Address> {
  const [pda] = await getProgramDerivedAddress({
    programAddress: PAYMENT_PROGRAM_ID,
    seeds: [
      PAYMENT_SEED,
      paymentId
    ]
  });
  return pda;
}

// Token Metadata
export const MINT_DECIMALS: Record<string, number> = {
  USDC: 6,
  SOL: 9,
};

export const symbolFromMint: Record<string, string> = {
  So11111111111111111111111111111111111111112: "SOL",
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: "MSOL",
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: "BONK",
};

export const mintFromSymbol: Record<string, string> = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  MSOL: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
  BONK: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
};

export const decimalsFromSymbol: Record<string, number> = {
  SOL: 9,
  USDC: 6,
  MSOL: 9,
  BONK: 5,
};
