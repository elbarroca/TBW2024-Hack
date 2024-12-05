import type { Address } from '@solana/addresses';
import { config } from '../../lib/config';
import { TokenAmount } from '@solana/rpc-types';
import { rpc } from '../rpc';

type TokenAccountState = 'frozen' | 'initialized' | 'uninitialized';

export type TokenAccount = Readonly<{
  pubkey: Address;
  account: {
    closeAuthority?: Address;
    delegate?: Address;
    delegatedAmount?: TokenAmount;
    extensions?: readonly unknown[];
    isNative: boolean;
    mint: Address;
    owner: Address;
    rentExemptReserve?: TokenAmount;
    state: TokenAccountState;
    tokenAmount: TokenAmount;
  }
}>;

export async function getTokenAccounts(ownerAddress: Address): Promise<TokenAccount[]> {
  const response = await rpc
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