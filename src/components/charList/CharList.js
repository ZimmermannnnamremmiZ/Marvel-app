import { useEffect, useMemo, useState } from 'react';

import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Characters from './Characters';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const setContent = (process, Component, props, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component {...props}/> : <Spinner />;
        case 'confirmed':
            return <Component {...props}/>;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = ({onCharacterSelected}) => {
    const [characters, setCharacters] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(110)
    const [charEnded, setCharEnded] = useState(false)

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
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
            .then(() => setProcess('confirmed'))
    }

    const data = {onCharacterSelected, characters}

    const elements = useMemo(() => {
        return setContent(process, Characters, data, newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
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

CharList.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;