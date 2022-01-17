import { Component } from 'react';
import Characters from './Characters'

import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: {},
        loading: true,
    }

    onCharacterLoaded = (characters) => {
        this.setState({
            characters,
            loading: false
        })
    }

    renderChars = (characters) => {
        return console.log(characters)
    }

    marvelService = new MarvelService();

    getCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharacterLoaded)
    }

    componentDidMount() {
        console.log('mount')
        this.getCharacters();
    }

    render() {
        const {characters} = this.state

        return (
            <div className="char__list">
                <ul className="char__grid">
                    <Characters characters={characters}/>
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;


// <li className="char__item char__item_selected">
// <img src={abyss} alt="abyss"/>
// <div className="char__name">Abyss</div>
// </li>