import { useRef, useState } from 'react';
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.actions';

export const useGifs = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);
    const handleTermClicked = async (term: string) => {
        await handleSearch(term);
    };
    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleSearch = async (term: string) => {
        term = term.trim().toLowerCase();
        if (term.length === 0) return;
        if (previousTerms.includes(term)) {
            setPreviousTerms((prev) =>
                prev.filter((prevTerm) => prevTerm !== term)
            );
            setPreviousTerms((prev) => [term, ...prev].splice(0, 8));
        } else {
            setPreviousTerms((prev) => [term, ...prev].splice(0, 8));
        }
        const cacheGifs = gifsCache.current;
        if (cacheGifs[term]) {
            setGifs(cacheGifs[term]);
        } else {
            const newGifs = await getGifsByQuery(term);
            cacheGifs[term] = newGifs;
            setGifs(newGifs);
        }
    };
    return {
        previousTerms,
        gifs,
        handleSearch,
        handleTermClicked,
    };
};
