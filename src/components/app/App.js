import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SinglePage = lazy(() => import('../pages/singlePage/singlePage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicRender/SingleComicRender'))
const SingleCharPage = lazy(() => import('../pages/SingleCharRender/SingleCharRender'))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage/>} />
                            <Route path="/comics" element={<ComicsPage/>} />
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComicPage} dataType={'comic'}/>} />
                            <Route path="*" element={<Page404 />} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharPage} dataType={'character'}/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;