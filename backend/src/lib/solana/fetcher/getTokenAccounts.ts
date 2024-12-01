import type { Address } from '@solana/addresses';
import { config } from '../../config';
import { JsonParsedTokenAccount } from '@solana/web3.js';

export type TokenAccount = {
  pubkey: string;
  account: JsonParsedTokenAccount;
};

export async function getTokenAccounts(ownerAddress: Address): Promise<TokenAccount[]> {
  const response = await config.RPC
    .getTokenAccountsByOwner(
      ownerAddress,
      { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address },
      { encoding: 'jsonParsed' }
    )
    .send();

  if (!response?.value) {
    return [];
  }

  return response.value.map(account => ({
    pubkey: account.pubkey,
    account: account.account.data.parsed.info
  }));
}