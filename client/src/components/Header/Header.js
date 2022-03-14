
import './Header.css';

import logo from '../../logo.svg';

// Simple header for now, if more details are added a nav bar could be added.
function Header() {
    return (
        <header className="Header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>College Search: Massachusetts</h1>
        </header>
    );
}

export default Header;
