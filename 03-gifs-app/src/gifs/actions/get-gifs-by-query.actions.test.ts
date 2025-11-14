
import { afterEach, describe, expect, test, vi } from 'vitest';
import { getGifsByQuery } from './get-gifs-by-query.actions';
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from '../api/giphy.api';
import { gifsMock } from '../../../tests/moks/gifs.data.ts';
import { giphyResponseDataMock } from '../../../tests/moks/giphy.response.data';

describe('get-gifs-by-query actions', () => {

    const mock = new AxiosMockAdapter(giphyApi);

    afterEach(() => {
        mock.reset();
    });


    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphyResponseDataMock);
        const gifs = await getGifsByQuery('cats');
        expect(gifs.length).toBeGreaterThan(0);
        const firstGif = gifs[0];
        expect(firstGif).toStrictEqual(gifsMock[0]);
    });

    test('should return a list empty if query is empty', async () => {
        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);
    });

    test('should handle error when the API returns an error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
        });
        mock.onGet('/search').reply(400, {
            message: 'Bad Request'
        });
        const gifs = await getGifsByQuery('cats');
        expect(gifs.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
        consoleErrorSpy.mockRestore();
    });

});
