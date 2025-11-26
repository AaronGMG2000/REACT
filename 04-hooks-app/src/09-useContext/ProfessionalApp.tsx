import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.router';
import { UserProvider } from './context/UserProvider';

export const ProfessionalApp = () => {
    return (
        <UserProvider>
            <div className="bg-gradient">
                <RouterProvider router={appRouter} />
            </div>
        </UserProvider>
    );
};
