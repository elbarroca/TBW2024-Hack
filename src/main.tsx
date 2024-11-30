import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SolanaContextProvider } from './contexts/SolanaProvider';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SolanaContextProvider>
        <App />
        <Toaster />
      </SolanaContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
