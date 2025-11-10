import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.actions';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);
    const [gifs, setGifs] = useState<Gif[]>([]);

    const handleTermClicked = (term: string) => {
        handleSearch(term);
    };

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

        const newGifs = await getGifsByQuery(term);
        setGifs(newGifs);
    };

    return (
        <>
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el gif perfecto"
            />
            <SearchBar placeHolder="Buscar gifs" onQuery={handleSearch} />
            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={handleTermClicked}
            />
            <GifList gifs={gifs} />
        </>
    );
};
