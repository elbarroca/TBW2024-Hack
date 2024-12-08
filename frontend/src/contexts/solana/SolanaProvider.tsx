import { FC, ReactNode } from 'react';
import { ChainContextProvider } from './ChainContextProvider';
import { RpcContextProvider } from './RpcContextProvider';
import { SelectedWalletAccountContextProvider } from './SelectedWalletAccountContextProvider';

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ChainContextProvider>
            <RpcContextProvider>
                <SelectedWalletAccountContextProvider>
                    {children}
                </SelectedWalletAccountContextProvider>
            </RpcContextProvider>
        </ChainContextProvider>
    );
};
