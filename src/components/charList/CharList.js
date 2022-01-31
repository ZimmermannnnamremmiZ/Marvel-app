import { useEffect, useState } from 'react';
import Characters from './Characters';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import './charList.scss';

const CharList = (props) => {
    const [characters, setCharacters] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true
        }

        setCharacters(characters => [...characters, ...newCharacters])
        setNewItemLoading(() => false)
        setOffset(offset => offset + 9)
        setCharEnded(() => ended)
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharactersLoaded)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
  
    return (
        <div className="char__list">
                {errorMessage}
                {spinner}
                <Characters onCharacterSelected={props.onCharacterSelected} characters={characters} />
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {                                        // https://ru.reactjs.org/docs/typechecking-with-proptypes.html
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;