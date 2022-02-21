import { useState } from "react";
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

        return (
            <>
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
                            <CharSearch ></CharSearch>
                        </div>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </>
        )
    }

    export default MainPage;