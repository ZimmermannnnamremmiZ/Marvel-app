class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=3e8f446e17ed96d1cc5066b391e35470';

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Can't fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
        return res.data.results.map(this._transformCharacters);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
        return {
            name: character.name,
            description: character.description ? character.description.length > 190 ? `${character.description.substring(0, 190)} ...`: character.description : character.description = 'No description for this character',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url
        }
    }

    _transformCharacters = (character) => {
        return {
            name: character.name,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension
        }
    }
}

export default MarvelService;