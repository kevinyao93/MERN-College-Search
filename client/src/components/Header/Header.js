
import './Header.css';

import logo from '../../logo.svg';

function Header() {
    return (
        <header className="Header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>School Search: Massachusetts</h1>
        </header>
    );
}

export default Header;
