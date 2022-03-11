
import './Header.css';

import logo from '../../logo.svg';

function Header() {
    //const successHandler = position => console.log("success", position.coords);

    //const errorHandler = error => console.error("error ",error.message);

    //navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    return (
        <header className="Header">
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="Nav">
                <a href="/"> Home </a>
                <a href="/"> Schools </a>
            </nav>
        </header>
    );
}

export default Header;
