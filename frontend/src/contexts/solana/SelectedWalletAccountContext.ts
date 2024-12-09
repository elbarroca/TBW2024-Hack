import { createContext } from 'react';
import { UiWalletAccount } from '@wallet-standard/react';

export type SelectedWalletAccountState = UiWalletAccount | undefined;
export type SelectedWalletAccountSetter = React.Dispatch<React.SetStateAction<SelectedWalletAccountState>>;
export type SelectedWalletAccountContextState = readonly [
    SelectedWalletAccountState,
    SelectedWalletAccountSetter
];

export const SelectedWalletAccountContext = createContext<SelectedWalletAccountContextState>([
    undefined,
    () => {
        console.error('No SelectedWalletAccountContext provider');
    },
]); 