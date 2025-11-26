import { use, type JSX } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router';

interface Props {
    element: JSX.Element;
}

export const PrivateRoute = ({ element }: Props) => {
    const { authStatus } = use(UserContext);
    if (authStatus === 'checking') return <div>Loading...</div>;
    return authStatus === 'authenticated' ? (
        element
    ) : (
        <Navigate to="/login" replace />
    );
};
