import { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Characters = (props) => {
    const charRefs = useRef([]);

    const onCharacterFocus = (id) => {
        charRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        charRefs.current[id].classList.add('char__item_selected')
        charRefs.current[id].focus()
    }


    const {characters, onCharacterSelected} = props;

    const checkThumbnail = (item) => {
        return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
    }

    const everyChar = characters.map((item, i) => {

        return (
            <li
                ref={el => charRefs.current[i] = el} //массив ссылок на DOM элемент
                tabIndex={0}
                className="char__item"
                key={uuidv4()}
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
            </li>
        )
    })


    return (
        <ul className="char__grid">
            {everyChar}
        </ul>
    )
}

Characters.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default Characters;