import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './main'

class WeatherApp extends Component {
    render() {
        return (
            <div>
                <header className="header">React Weather App</header>

                <Main />

                <footer className="footer"><p>Handmade by me.</p></footer>
            </div>
        );
    }
}


ReactDOM.render(<WeatherApp/>, document.getElementById("root"))
