import { useEffect, useState, type PropsWithChildren } from 'react';
import { users, type User } from '../data/user-mock.data';
import { UserContext, type AuthStatus } from './UserContext';

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number) => {
        const user = users.find((user) => user.id === userId);
        if (!user) {
            console.log(`User not found ${userId}`);
            setAuthStatus('not-authenticated');
            setUser(null);
            return false;
        }
        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', user.id.toString());
        return true;
    };
    const handleLogout = () => {
        setAuthStatus('not-authenticated');
        setUser(null);
        localStorage.removeItem('userId');
    };

    useEffect(() => {
        (async () => {})();
    }, []);

    return (
        <UserContext
            value={{
                authStatus,
                isAuthenticated: authStatus === 'authenticated',
                user,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </UserContext>
    );
};
