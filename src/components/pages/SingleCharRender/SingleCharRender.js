import { Link } from 'react-router-dom';

import AppBanner from "../../appBanner/AppBanner";

import './singleCharRender.scss'

const SingleCharRender = ({data}) => {
 
  const {name, description, thumbnail} = data;

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

export default SingleCharRender;