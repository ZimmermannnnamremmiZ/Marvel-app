import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { MainPage, ComicsPage } from '../pages';
import AppHeader from "../appHeader/AppHeader";
import SingleComic from '../singleComic/SingleComic';

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/comics" element={<ComicsPage/>} />
                            {/* <SingleComic comicId={selectedComics}/> */}
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;