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
  try {
    const response = await rpc
      .getTokenAccountsByOwner(
        ownerAddress,
        { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address },
        { encoding: 'jsonParsed' }
      )
      .send();

    if (!response) {
      console.warn('No response from getTokenAccountsByOwner');
      return [];
    }

    if (!response.value) {
      console.warn('No value in getTokenAccountsByOwner response');
      return [];
    }

    return response.value.map(account => {
      try {
        if (!account.account.data.parsed?.info) {
          console.warn('Invalid account data structure:', account);
          return null;
        }

        return {
          pubkey: account.pubkey,
          account: account.account.data.parsed.info
        };
      } catch (error) {
        console.error('Error parsing account:', error, account);
        return null;
      }
    }).filter((account): account is TokenAccount => account !== null);

  } catch (error) {
    console.error('Error in getTokenAccounts:', error);
    return [];
  }
}