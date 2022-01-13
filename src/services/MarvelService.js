class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=3e8f446e17ed96d1cc5066b391e35470'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Can't fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=222&${this._apiKey}`)
    }

    getCharacters = (id) => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService;