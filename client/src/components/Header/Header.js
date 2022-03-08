
import './Header.css';

import logo from '../../logo.svg';

function Header() {
    //const successHandler = position => console.log("success", position.coords);

    //const errorHandler = error => console.error("error ",error.message);

    //navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    return (
        <div className="Header">
            <table className="header_table">
                <tbody>
                    <tr className="label_row">
                            <th><img src={logo} className="App-logo" alt="logo" /></th>
                            <th>Site Name</th>
                        </tr>
                    <tr className="nav_row">
                        <th>Home</th>
                        <th>Schools</th>
                        <th>Locations</th> 
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Header;
