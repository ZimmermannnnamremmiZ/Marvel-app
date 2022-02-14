import { useEffect, useState } from 'react';
import Comics from './Comics';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState()
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
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
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <Comics comics={comics} />
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