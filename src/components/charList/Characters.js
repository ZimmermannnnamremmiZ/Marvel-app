import { useRef } from 'react';
import PropTypes from 'prop-types';

const Characters = ({characters, onCharacterSelected}) => {
    const charRefs = useRef([]);
    const onCharacterFocus = (id) => {
        charRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        charRefs.current[id].classList.add('char__item_selected')
        charRefs.current[id].focus()
    }

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {
            objectFit: "cover", objectPosition: "0"} : {objectFit: 'cover'};
    }

    return (
        <div className="char__grid">
                {characters.map((item, i) => (
                        <div
                            ref={el => charRefs.current[i] = el} //массив ссылок на DOM элемент
                            tabIndex={0}
                            className="char__item"
                            onClick={() => {onCharacterSelected(item.id);
                                            onCharacterFocus(i)}}
                            onKeyPress={(el) => {
                                if (el.key === ' ' || el.key === 'Enter') {
                                    onCharacterSelected(item.id);
                                    onCharacterFocus(i)
                                }
                            }}
                        >
                            <img style={checkThumbnail(item.thumbnail)} src={item.thumbnail} alt={item.name}/>
                            <div className="char__name">{item.name}</div>
                        </div>
                ))}
        </div>
    )
}

Characters.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default Characters;