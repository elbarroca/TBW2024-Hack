import { memo, useCallback, useContext } from 'react';
import { UiWallet, useConnect } from '@wallet-standard/react';
import { useToast } from '@/hooks/useToast';
import { SelectedWalletAccountContext } from '@/contexts/solana/SelectedWalletAccountContext';
import { useAppDispatch } from '@/store';
import { setAccount, setAuthLoading, setLoginStatus, setUser } from '@/store/auth';
import { useSignIn } from '@solana/react';
import { useRequestNonceMutation, useVerifySignatureMutation } from '@/api/endpoints/auth';
import bs58 from 'bs58';
import { setUserDataLoading, setBalances, setNFTs } from '@/store/user';
import { LoginStatus } from '@/types/auth';
import { useLazyGetBalancesQuery } from '@/api/endpoints/solana';
import { useLazyGetAssetsQuery } from '@/api/endpoints/metaplex';

interface WalletItemProps {
    wallet: UiWallet;
}

const MESSAGE_PREFIX = 'Sign this message to log in to Mentora';

export const WalletItem = memo(({ wallet }: WalletItemProps) => {
    const { toast } = useToast();
    const [__, connect] = useConnect(wallet);
    const [_, setSelectedWalletAccount] = useContext(SelectedWalletAccountContext);
    const dispatch = useAppDispatch();
    const signIn = useSignIn(wallet);
    const [requestNonce] = useRequestNonceMutation();
    const [verifySignature] = useVerifySignatureMutation();
    const [fetchBalances] = useLazyGetBalancesQuery();
    const [fetchNFTs] = useLazyGetAssetsQuery();

    const handleConnect = useCallback(async () => {
        try {
            const nextAccounts = await connect();
            if (nextAccounts[0]) {
                dispatch(setAccount(nextAccounts[0].address));
                dispatch(setAuthLoading(true));

                const { nonce } = await requestNonce({ 
                    address: nextAccounts[0].address
                }).unwrap();
                
                const { signature } = await signIn({ 
                    address: nextAccounts[0].address, 
                    statement: MESSAGE_PREFIX, 
                    nonce, 
                });

                const { user } = await verifySignature({ 
                    address: nextAccounts[0].address,
                    nonce,
                    signature: bs58.encode(signature)
                }).unwrap();
    
                dispatch(setUser(user));
                dispatch(setLoginStatus(LoginStatus.IN));
    
                dispatch(setUserDataLoading(true));
                
                const [balancesResponse, nftsResponse] = await Promise.all([
                    fetchBalances(nextAccounts[0].address).unwrap(),
                    fetchNFTs(nextAccounts[0].address).unwrap()
                ]) as any;

                dispatch(setBalances(balancesResponse?.balances || []));
                dispatch(setNFTs(nftsResponse?.assets || []));
            }
        } catch (e) {
            toast({
                title: "Error",
                description: "Failed to connect wallet",
            });
        }
    }, [connect, setSelectedWalletAccount, wallet.accounts]);
    
    return (
        <div
            role="button"
            className="flex justify-between items-center bg-[#F6F8FB] border-2 border-[#F6F8FB] rounded-full py-4 px-5 hover:border-indigo-600 transition-colors cursor-pointer"
            onClick={handleConnect}
        >
            <p className="text-dark/50 text-base">{wallet.name}</p>
            {wallet.icon && <img src={wallet.icon} width={40} height={40} alt={wallet.name} />}
        </div>
    );
});