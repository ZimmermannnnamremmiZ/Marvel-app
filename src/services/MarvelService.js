class MarvelService {
    

    getResource = async (url) => {
        let res = await fetch(url)
    
        if (!res.ok) {
            throw new Error(`Can't fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=222&apikey=3e8f446e17ed96d1cc5066b391e35470')
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=222&apikey=3e8f446e17ed96d1cc5066b391e35470')
    }
}

export default MarvelService;