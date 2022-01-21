import { Component } from 'react';
import PropTypes from 'prop-types';

class Characters extends Component {
    charRefs = [];

    setRef = elem => {
        this.charRefs.push(elem)
    }

    onCharacterFocus = (id) => {
        this.charRefs.forEach(item => item.classList.remove('char__item_selected'))
        this.charRefs[id].classList.add('char__item_selected')
        this.charRefs[id].focus()
    }


    render() {
        const {characters, onCharacterSelected} = this.props;

        const checkThumbnail = (item) => {
            return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
        }

        const everyChar= characters.map((item, i) => {

            return (
                <li
                    ref={this.setRef}
                    tabIndex={0}
                    className="char__item"
                    key={item.id}
                    onClick={() => {onCharacterSelected(item.id);
                                    this.onCharacterFocus(i)}}
                    onKeyPress={(el) => {
                        if (el.key === ' ' || el.key === 'Enter') {
                            onCharacterSelected(item.id);
                            this.onCharacterFocus(i)
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
}

Characters.propTypes = {
    onCharacterSelected: PropTypes.func.isRequired
}

export default Characters;


// <li className="char__item char__item_selected">
// <img src={abyss} alt="abyss"/>
// <div className="char__name">Abyss</div>
// </li>