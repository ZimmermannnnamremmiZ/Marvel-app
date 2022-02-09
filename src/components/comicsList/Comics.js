import { useRef } from 'react';
import { Link } from 'react-router-dom';


const Comics = (props) => {
    const ComicsRefs = useRef([]);

    const onComicsFocus = (id) => {
        ComicsRefs.current.forEach(item => item.classList.remove('comics__item_selected'))
        ComicsRefs.current[id].classList.add('comics__item_selected')
        ComicsRefs.current[id].focus()
    }

    const {comics} = props;

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {
            objectFit: "cover", objectPosition: "0"
        } : {objectFit: 'cover'};
    }

    const everyComics = comics.map((item, i) => {
        return (
                <li
                    ref={el => ComicsRefs.current[i] = el}   //массив ссылок на DOM элемент
                    tabIndex={0}
                    className="comics__item"
                    key={item.id}
                    onClick={() => {onComicsFocus(i)}}
                    onKeyPress={(el) => {
                        if (el.key === ' ' || el.key === 'Enter') {onComicsFocus(i)}
                    }}
                >
                    <Link to={`/comics/${item.id}`} href={item.homepage}>
                        <img style={checkThumbnail(item.thumbnail)} src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
        )
    })

    return (
        <ul className="comics__grid">
            {everyComics}
        </ul>
    )
}

export default Comics;