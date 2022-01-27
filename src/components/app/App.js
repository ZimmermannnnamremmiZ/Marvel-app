import { useState } from 'react';
import AppHeader from "../appHeader/AppHeader";
import AppBanner  from '../appBanner/AppBanner';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';
import ComicsList from '../comicsList/ComicsList';
import SingleComic from '../singleComic/SingleComic';

const App = () => {

    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [selectedComics, setSelectedComics] = useState(null)

    const onCharacterSelected = (id) => {
        setSelectedCharacter(id)
    }

    const onComicsSelected = (id) => {
        setSelectedComics(id)
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <AppBanner />
                <ComicsList onComicsSelected={onComicsSelected}/>
                <SingleComic comicId={selectedComics}/>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
            </main>
        </div>
    )
}

export default App;