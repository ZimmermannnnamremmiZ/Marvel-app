import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class Characters extends Component {
    myRef = []  
    
    setRef = elem => {
        this.myRef.push(elem)
    }

    test = (id) => {
        this.myRef.forEach(() => {})
    }


    render() {
        const {characters, onCharacterSelected} = this.props;

        const checkThumbnail = (item) => {
            return item === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'initial'} : {objectFit: 'cover'};
        }

        const everyChar= characters.map(item => {

            return (
                <li 
                    ref={this.setRef}
                    className="char__item"
                    key={uuidv4()}
                    onClick={() => {onCharacterSelected(item.id);
                                    this.test(item.id)}}
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

export default Characters;


// <li className="char__item char__item_selected">
// <img src={abyss} alt="abyss"/>
// <div className="char__name">Abyss</div>
// </li>