import { UserContext } from '@/09-useContext/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export const LoginPage = () => {
    const { login } = use(UserContext);
    const navigation = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = login(Number(userId));
        if (!result) {
            toast.error('Usuario no encontrado');
            return;
        }
        navigation('/profile');
    };

    const [userId, setUserId] = useState('');
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Página de login</h1>
            <hr />
            <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 my-10"
            >
                <Input
                    type="number"
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    placeholder="ID del usuario"
                />
                <Button type="submit">Iniciar Sesión</Button>
            </form>
            <Link to="/about">
                <Button variant="ghost">Volver</Button>
            </Link>
        </div>
    );
};
