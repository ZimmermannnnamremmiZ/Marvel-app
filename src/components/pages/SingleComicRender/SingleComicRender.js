import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import './singleComicRender.scss';

const SingleComicRender = ({data}) => {
    const {title, description, thumbnail,  pageCount, language, price} = data;

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {
            objectFit: "cover", objectPosition: "0"} : {objectFit: 'cover'};
    }

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img style={checkThumbnail(thumbnail)} src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Page count: {pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back button button__main">
                <div className="inner">
                    Back to all
                </div>
            </Link>
        </div>
    )
}

export default SingleComicRender;