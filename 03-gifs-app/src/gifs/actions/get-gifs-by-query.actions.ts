import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";


export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

    if (!query.trim()) {
        return [];
    }

    try {
        const response = await giphyApi<GiphyResponse>('/search', { params: { q: query, limit: 25 } });

        const gifs: Gif[] = response.data.data.map(gif => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.original.url,
            width: Number(gif.images.original.width),
            height: Number(gif.images.original.height)
        }));

        return gifs;
    } catch (error) {
        console.error(error);
        return [];
    }
}