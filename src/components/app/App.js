import { useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <AppBanner />
                    <ComicsList onComicsSelected={onComicsSelected}/>
                    {/* <SingleComic comicId={selectedComics}/> */}
                    <Route>
                        <ErrorBoundary>
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
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </Route>
                    <Route>
                        <AppBanner />
                        <ComicsList onComicsSelected={onComicsSelected}/>
                    </Route>
                </main>
            </div>
        </Router>
    )
}

export default App;