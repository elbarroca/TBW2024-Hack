import { useAppSelector } from '@/store';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />; // Main Page
  }

  return children;
} 