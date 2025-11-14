import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import * as actions from '../actions/get-gifs-by-query.actions';
import { useGifs } from './useGifs';
import { act } from 'react';

describe('useGifs', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeInstanceOf(Function);
        expect(result.current.handleTermClicked).toBeInstanceOf(Function);
    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('Goku');
        });
        expect(result.current.gifs.length).toBe(25);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });
        expect(result.current.gifs.length).toBe(25);
    });

    test('should a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('Goku');
        });
        expect(result.current.gifs.length).toBe(25);

        vi.spyOn(actions, 'getGifsByQuery').mockRejectedValue(
            new Error('Should not be called')
        );
        await act(async () => {
            await result.current.handleSearch('Goku');
        });
        expect(result.current.gifs.length).toBe(25);
    });

    test('should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(actions, 'getGifsByQuery').mockResolvedValue([]);
        const terms = [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
        ];
        for (const term of terms) {
            await act(async () => {
                await result.current.handleSearch(term);
            });
        }
        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toEqual(terms.slice(2).reverse());
    });
});
