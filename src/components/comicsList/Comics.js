import { useRef } from 'react';
import PropTypes from 'prop-types';

const Comics = (props) => {
    const ComicsRefs = useRef([]);

    const onComicsFocus = (id) => {
        ComicsRefs.current.forEach(item => item.classList.remove('comics__item_selected'))
        ComicsRefs.current[id].classList.add('comics__item_selected')
        ComicsRefs.current[id].focus()
    }

    const {comics, onComicsSelected} = props;

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
    }

    const everyComics = comics.map((item, i) => {
        return (
                <li
                    ref={el => ComicsRefs.current[i] = el}   //массив ссылок на DOM элемент
                    tabIndex={0}
                    className="comics__item"
                    key={item.id}
                    onClick={() => {onComicsSelected(item.id);
                                    onComicsFocus(i)}}
                    onKeyPress={(el) => {
                        if (el.key === ' ' || el.key === 'Enter') {
                            onComicsSelected(item.id);
                            onComicsFocus(i)
                        }
                    }}
                >
                    <a href={item.homepage}>
                        <img style={checkThumbnail(item.thumbnail)} src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
        )
    })

    return (
        <ul className="comics__grid">
            {everyComics}
        </ul>
    )
}

Comics.propTypes = {
    onComicsSelected: PropTypes.func.isRequired
}

export default Comics;