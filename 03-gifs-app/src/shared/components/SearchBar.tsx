import { useEffect, useState } from 'react';

interface Props {
    placeHolder: string;
    onQuery: (term: string) => void;
}

export const SearchBar = ({ placeHolder, onQuery }: Props) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onQuery(query);
        }, 700);
        return () => clearTimeout(timeoutId);
    }, [query, onQuery]);

    useEffect(() => {
        setQuery('');
    }, [onQuery]);

    const handleSearch = () => {
        onQuery(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeHolder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};
