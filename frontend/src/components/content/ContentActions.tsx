import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function ContentActions({ content }) {
  const { can, user } = useAuth();
  const isOwner = content.creator_id === user?.id;

  return (
    <div className="space-x-2">
      {can('update', 'content') && isOwner && (
        <Button onClick={() => handleEdit()}>
          Edit Content
        </Button>
      )}
      
      {can('delete', 'content') && (isOwner || user?.role === 'admin') && (
        <Button variant="destructive" onClick={() => handleDelete()}>
          Delete Content
        </Button>
      )}
    </div>
  );
} 