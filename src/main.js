import React, {Component} from 'react';
import './index.css'
import clear from './images/clear.png';
import clouds from './images/clouds.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import thunderstorm from './images/thunderstorm.png'
import mist from './images/mist.png'
import snow_and_rain from './images/snow_and_rain.png'

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            temperature: 0,
            cityName: null,
            isCelsius: true,
            main: 0,
            countryName: null,
            weatherCondition: null,
            error: null
        }
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: 'Error Gettig Weather Condtions'
                });
            }
        );

    }


    fetchWeather(lat, lon) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    temperature: json.main.temp,
                    main: json.weather[0].main,
                    cityName: json.name,
                    countryName: json.sys.country,
                    weatherCondition: json.weather[0].description,
                    isLoading: true,
                })

            });
    }

    handleClick() {
        this.setState(function (prevState) {
            return {isCelsius: !prevState.isCelsius};

        });
        if (this.state.isCelsius) {
            this.setState({temperature: Math.round((this.state.temperature * (9 / 5)) + 32 * 100 / 100)})
        } else {
            this.setState({temperature: Math.round((this.state.temperature - 32) * 5 / 9 * 100) / 100})
        }
    }

    render() {
        var {isLoading, weatherCondition, cityName, countryName, temperature} = this.state;
        var load = {textAlign: 'center'};
        let weatherImage;

        if (!isLoading) {
            return <div style={load}>Loading...</div>;
        }

        console.log(weatherCondition)

        if (weatherCondition === 'clear sky') {
            weatherImage = <img src={clear} alt="clear" />
        }
        if ((weatherCondition === "few clouds") || (weatherCondition === "scattered clouds") || (weatherCondition === "broken clouds")) {
            weatherImage = <img src={clouds} alt="clouds" />
        }
        if ((weatherCondition === 'shower rain') || (weatherCondition === 'rain') || (weatherCondition === 'light rain')
            || (weatherCondition === 'light intensity drizzle') || (weatherCondition === 'moderate rain')) {
            weatherImage = <img src={rain} alt="rain" />
        }
        if (weatherCondition === 'thunderstorm') {
            weatherImage = <img src={thunderstorm} alt="thunderstorm"/>
        }
        if ((weatherCondition === 'light snow') || (weatherCondition === 'snow')) {
            weatherImage = <img src={snow} alt="snow" />
        }
        if ((weatherCondition === 'mist') || (weatherCondition === 'fog')) {
            weatherImage = <img src={mist}  alt="mist" />
        }
        if (weatherCondition === 'rain and snow') {
            weatherImage = <img src={snow_and_rain} alt="snow_and_rain" />
        }

        return (

            <div className="container">
                <h3>{cityName}, {countryName}</h3>
                {weatherImage}
                <div className="temp">
                    {temperature} {this.state.isCelsius ? '°C' : '°F'}
                    <button onClick={this.handleClick}>
                        Click to convert temperature to Fahrenheit
                    </button>
                </div>
            </div>

        );

    }
}

