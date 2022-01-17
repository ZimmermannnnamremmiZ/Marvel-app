import { Component } from 'react';
import Characters from './Characters'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharacterLoaded = (characters) => {
        this.setState({
            characters,
            loading: false
        })
    }

    marvelService = new MarvelService();

    getCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.getCharacters();
    }

    render() {
        const {characters, loading, error} = this.state;
        const errorMessage = error ? "Sorry, error :(" : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <Characters characters={characters}/> : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
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