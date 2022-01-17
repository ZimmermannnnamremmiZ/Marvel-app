import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';


class Characters extends Component {
    state = {
        chars: this.props.characters
    }

    // onCharacterLoaded = (characters) => {
    //     this.setState({
    //         characters,
    //         loading: false
    //     })
    // }

    // renderChars = (characters) => {
    //     return console.log(characters)
    // }

    // marvelService = new MarvelService();

    // getCharacters = () => {
    //     this.marvelService
    //         .getAllCharacters()
    //         .then(this.onCharacterLoaded)
    // }

    test = () => {
        console.log(this.state.characters)
    }

    componentDidMount() {
        // console.log('mount')
        // this.getCharacters();
        
    }
    
    render() {
        return (
            <>
                <button onClick={this.test}></button>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
            </>
        )
    }
}

export default Characters;