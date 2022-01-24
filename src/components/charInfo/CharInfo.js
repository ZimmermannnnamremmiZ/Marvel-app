import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

const  CharInfo = (props) => {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    


    useEffect(() => {
        const marvelService = new MarvelService();
        const updateCharacter = () => {
        if (!props.characterId) {
            return;
        }

        onCharacterLoading()
        marvelService
            .getCharacter(props.characterId)
            .then(onCharacterLoaded)
            .catch(onError)
        }
    updateCharacter()
    }, [props.characterId])
    // function componentDidMount() {
    //     updateCharacter();
    // }

    // function componentDidUpdate(prevProps, prevState) {
    //     if (props.characterId !== prevProps.characterId) {
    //         updateCharacter();
    //     }
    // }



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


        const skeleton = character || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !character) ? <View character={character}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
}

const View = (props) => {
    const {name, description, thumbnail, homepage, wiki, comics} = props.character;
    const checkThumbnail = () => {
        return thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
    }

    return (
        <>
            <div className="char__basics">
                <img style={checkThumbnail()} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">thor</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {!comics.length ? <ErrorMessage /> : null}
                { comics.map((item, i) => {
                        return  (i < 9) ? (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        ) : null
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;