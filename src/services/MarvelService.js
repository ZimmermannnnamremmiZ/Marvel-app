import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3e8f446e17ed96d1cc5066b391e35470';
    const _baseCharOffset = 18;
    const _baseComicOffset = 16;

    const getAllCharacters = async (offset = _baseCharOffset) => {
        const res = await request(`${_apiBase}characters?offset=${offset}&limit=9&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.length > 0 ? _transformSearchedCharacter(res.data.results[0]) : 'nothing'
    }

    const getAllComics = async (offset = _baseComicOffset) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&limit=8&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            homepage: comics.urls[0].url,
            price: comics.prices[0].price ? comics.prices[0].price + '$' : 'Not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description ? comics.description : 'No description',
            pageCount: !comics.pageCount || 0 ? 'No information about page count' : comics.pageCount,
            language: comics.textObjects.language || 'en-us'
        }
    }

    const _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description.length > 175 ? `${character.description.substring(0, 175)} ...`: character.description : character.description = 'No description for this character',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }

    const _transformSearchedCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? character.description : character.description = 'No description for this character',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension
        }
    }

    return {
        clearError,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
        getCharacterByName
    }
}

export default useMarvelService;