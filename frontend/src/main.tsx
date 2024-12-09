import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SolanaProvider } from './contexts/solana/SolanaProvider';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
        <SolanaProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                    <Toaster />
                </AuthProvider>
            </QueryClientProvider>
        </SolanaProvider>
    </ReduxProvider>
);
