import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3e8f446e17ed96d1cc5066b391e35470';
    const _baseOffset = 0

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?offset=${offset}&limit=9&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description.length > 190 ? `${character.description.substring(0, 190)} ...`: character.description : character.description = 'No description for this character',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter}
}

export default useMarvelService;