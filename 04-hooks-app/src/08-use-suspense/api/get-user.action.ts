export interface User {
    id: number;
    name: string;
    location: string;
    role: string;
}

export const getUser = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        id: id,
        name: 'John Doe',
        location: 'New York',
        role: 'Admin',
    };
};
