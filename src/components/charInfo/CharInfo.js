import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

const  CharInfo = ({characterId}) => {

    const [character, setCharacter] = useState(null)
    const [visibility, setVisibility] = useState()

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        const updateCharacter = () => {
            if (!characterId) {
                return;
            };
            clearError();
            getCharacter(characterId)
                .then(onCharacterLoaded)
                .then(() => setProcess('confirmed'))
        }
        updateCharacter()
    }, [characterId])

    const onCharacterLoaded = (character) => {
        setCharacter(character)
        setVisibility({display: "block"})
    }

    const onClose = () => {
        setVisibility({display: "none"})
    }

    const data = {character, onClose}

    return (
        <div className="char__info" style={visibility}>
            {setContent(process, View, data)}
        </div>
    )
}

const View = ({character, onClose}) => {
    const {id, name, description, thumbnail, wiki, comics} = character;
    const maxW1090px = useMediaQuery({ query: '(max-width: 1090px)' })

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {
            objectFit: "cover", objectPosition: "0"} : {objectFit: 'cover'};
    }

    const valOfComics = () => {
         if (maxW1090px) {return comics.map((item, i) => {
            return (
                <li className="char__comics-item" key={i}>
                    {item.name}
                </li>
            )
        })};

        return comics.map((item, i) => {
            return  i < 9 ? (
                <li className="char__comics-item" key={i}>
                    {item.name}
                </li>
            ) : null
        })
    }



    return (
        <>
            <div className="char__basics">
                <img style={checkThumbnail(thumbnail)} src={thumbnail} alt={name}/>
                <div className='char__basics-midBox'>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <Link to={`/characters/${id}`} >
                            <button className='button button__main'>
                                <div className="inner">homepage</div>
                            </button>
                        </Link>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
                <button onClick={() => onClose()} className='char__closeButton'></button>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {!comics.length ? <ErrorMessage /> : null}
                {valOfComics()}
            </ul>
        </>
    )
}

export default CharInfo;