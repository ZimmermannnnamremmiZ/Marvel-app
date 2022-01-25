import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = () => {
        
    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const onCharacterLoading = () => {
        setLoading(true)
    }

    const onCharacterLoaded = (character) => {
        setCharacter(character)
        setLoading(false)
    }

    const marvelService = new MarvelService();

    const updateCharacter = () => {
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
        onCharacterLoading();
        marvelService
            .getCharacter(id)
            .then(onCharacterLoaded)
            .catch(onError)
    }

    useEffect(() => {
        updateCharacter()
    }, [])

    // componentDidMount() {
    //     this.updateCharacter();
    //     // this.timerId = setInterval(this.updateCharacter, 4000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerId)
    // }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View character={character}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = (props) => {

    const {name, description, thumbnail, homepage, wiki} = props.character;
    const checkThumbnail = () => {
        return thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
    }

    return (
        <div className="randomchar__block">
        <img style={checkThumbnail()} src={thumbnail} alt="Random character" className="randomchar__img"  />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
               {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;