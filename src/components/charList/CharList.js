import { Component } from 'react';
import Characters from './Characters'
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false, 
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true
        }

        this.setState(({offset, characters}) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    getAllCharacters = (offset) => {
        this.onCharactersLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }

    onCharactersLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    componentDidMount() {
        this.getAllCharacters();
    }

    render() {
        const {characters, loading, error, offset, newItemLoading, charEnded} = this.state;
        const errorMessage = error ? "Sorry, error :(" : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <Characters onCharacterSelected={this.props.onCharacterSelected} characters={characters}/> : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.getAllCharacters(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {                                                        // https://ru.reactjs.org/docs/typechecking-with-proptypes.html
    onCharacterSelected: PropTypes.func.isRequired
}

export default CharList;