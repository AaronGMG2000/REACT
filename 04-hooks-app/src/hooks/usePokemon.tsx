import { useEffect, useState } from 'react';

interface Props {
    id: number;
}

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
}
export const usePokemon = ({ id }: Props) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchPokemonById = async (id: number): Promise<Pokemon> => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        return {
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default,
        };
    };

    useEffect(() => {
        let cancelled = false;
        const loadPokemon = async () => {
            if (!cancelled) {
                setIsLoading(true);
            }
            try {
                const newPokemon = await fetchPokemonById(id);
                if (!cancelled) {
                    setPokemon(newPokemon);
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };
        loadPokemon();
        return () => {
            cancelled = true;
        };
    }, [id]);

    return {
        pokemon,
        isLoading,
        formattedId: `#${id.toString().padStart(3, '0')}`,
    };
};
