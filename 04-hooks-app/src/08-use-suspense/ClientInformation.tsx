import { use, type Usable } from 'react';
import type { User } from './api/get-user.action';

interface Props {
    getUser: Usable<User>;
}

export const ClientInformation = ({ getUser }: Props) => {
    const user = use(getUser);
    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h2 className="text-4xl font-thin">Client Information</h2>
            <p className="text-2xl">Client Name: {user.name}</p>
            <p className="text-2xl">Client location: {user.location}</p>
            <p className="text-2xl">Client role: {user.role}</p>
        </div>
    );
};
