export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    image: string;
    category: string;
    duration: string;
    enrolled: number;
}

export interface WalletState {
    connected: boolean;
    address: string | null;
}
