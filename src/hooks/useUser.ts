import { useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    title: string;
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // TODO: Replace with actual API call
        const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            bio: 'Experienced instructor with a passion for teaching.',
            title: 'Senior Instructor',
        };

        setUser(mockUser);
        setLoading(false);
    }, []);

    return { user, loading, error };
}
