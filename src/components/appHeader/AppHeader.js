import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';
import logo from '../../resources/img/Marvel-Comics-Logo.svg'

const AppHeader = () => {
    return (
        <header className="app__header">
            <div className="app__title">
                <Link to="/">
                    <img className='app__title-logo' src={logo} alt='logo'></img>
                    <h1 className='app__title-text'><span>Marvel</span> information portal</h1>
                </Link>
            </div>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                        to="/">Characters</NavLink></li>
                    /
                    <li><NavLink 
                    style={({ isActive }) => ({color: isActive ? '#9f0013' : 'inherit'})}
                    to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;