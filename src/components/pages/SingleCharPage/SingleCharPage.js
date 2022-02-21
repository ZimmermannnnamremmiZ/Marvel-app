import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppBanner from "../../appBanner/AppBanner";
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import useMarvelService from '../../../services/MarvelService';

import './singleCharPage.scss'

const SingleCharPage = () => {
    const {charName} = useParams()
    const [char, setChar] = useState(null);

    const {loading, error, getCharacterBySearch, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charName])

    const updateChar = () => {
        clearError();
        getCharacterBySearch(charName)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
  const {name, description, thumbnail} = char;

  const checkThumbnail = (item) => {
      return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {
          objectFit: "cover", objectPosition: "0"} : {objectFit: 'cover'};
  }

  return (
    <>
        <AppBanner />
        <div className="single-char">
            <img style={checkThumbnail(thumbnail)} src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name.toUpperCase()}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back button button__main">
                <div className="inner">
                    Back to all
                </div>
            </Link>
        </div>
    </>
  )
}

export default SingleCharPage;