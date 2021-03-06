import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../charSearch/charSearch";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

    const MainPage = () => {
        const onCharacterSelected = (id) => {
            setSelectedCharacter(id)
        }

        const [selectedCharacter, setSelectedCharacter] = useState(null)
        console.log('main page')
        return (
            <>
                <Helmet>
                    <meta
                        name="description"
                        content="Marvel information portal"
                    />
                    <title>Marvel information portal</title>
                </Helmet>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <CharInfo characterId={selectedCharacter} />
                            <CharSearch />
                        </div>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </>
        )
    }

    export default MainPage;