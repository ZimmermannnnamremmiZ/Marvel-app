import { useEffect, useState, useRef } from 'react';
import Characters from './Characters'
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import './charList.scss';

const CharList = (props) => {

    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const marvelService = new MarvelService();

    useEffect(() => {
        getAllCharacters()
    }, [])

    const onError = () => {
        setLoading(() => false);
        setError(true)
    }

    const onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true
        }

        setCharacters(characters => [...characters, ...newCharacters])
        setLoading(() => false)
        setNewItemLoading(() => false)
        setOffset(offset => offset + 9)
        setCharEnded(() => ended)
    }

    const onCharactersLoading = () => {
        setNewItemLoading(true)
    }

    const getAllCharacters = (offset) => {
        onCharactersLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharactersLoaded)
            .catch(onError)
    }



    const errorMessage = error ? "Sorry, error :(" : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <Characters onCharacterSelected={props.onCharacterSelected} characters={characters}/> : null;

    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => getAllCharacters(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {                                                        // https://ru.reactjs.org/docs/typechecking-with-proptypes.html
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;