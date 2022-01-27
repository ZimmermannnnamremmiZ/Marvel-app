import { useEffect, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = (props) => {

    const [comic, setComic] = useState(null)

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        const updateComic = () => {
            if (!props.comicId) {
                return;
            };
            clearError();
            getComic(props.comicId)
                .then(onComicLoaded)
        }
    updateComic()
    }, [props.comicId])

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = (props) => {
    const {name, description, thumbnail,  pageCount, language, price} = props.comic;

    const checkThumbnail = () => {
        return thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
    }

    return (
        <>
                <img style={checkThumbnail()} src={thumbnail} alt={name} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <a href="#" className="single-comic__back">Back to all</a>
        </>
    )
}

export default SingleComic;