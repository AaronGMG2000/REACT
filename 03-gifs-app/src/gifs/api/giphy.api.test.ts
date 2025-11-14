import { describe, expect, test } from 'vitest'
import { giphyApi } from './giphy.api';

describe('giphyApi', () => {
    test('should be configured correctly', async () => {
        const params = giphyApi.defaults.params;
        expect(giphyApi).toBeDefined();
        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
        expect(params.lang).toBe('es');

        expect(params).toStrictEqual({
            api_key: import.meta.env.VITE_GIPHY_API_KEY,
            lang: 'es',
        });
    });
})