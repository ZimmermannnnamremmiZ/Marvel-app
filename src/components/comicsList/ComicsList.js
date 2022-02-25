import { useEffect, useState } from 'react';

import Comics from './Comics';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

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

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(16)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
        // eslint-disable-next-line
    }, [])

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true
        }

        setComics(comics => [...comics, ...newComics])
        setNewItemLoading(() => false)
        setOffset(offset => offset + 8)
        setComicsEnded(() => ended)
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="comics__list">
            {setContent(process, Comics, {comics}, newItemLoading)}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;