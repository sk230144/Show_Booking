import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; // Import the WeatherApp.css file

const WeatherApp = () => {
    const [cityName, setCityName] = useState('Delhi'); // Default city name
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = 'aa1785703e181f538daa4cb0d28d73e3';

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!cityName) return; // Prevent API call if cityName is empty

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error('City not found'); // Handle 404 error
                }

                const data = await response.json();
                setWeatherData(data);
                setError(null); // Clear error if request succeeds
            } catch (error) {
                console.error('Error fetching weather data:', error.message);
                setWeatherData(null); // Clear weather data on error
                setError('City not found'); // Set error message
            }
        };

        fetchWeatherData();
    }, [cityName]);

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <div className="city-input">
                <label htmlFor="city">Enter City:</label>
                <input type="text" id="city" value={cityName} onChange={handleInputChange} />
            </div>
            {error && <div className="error">{error}</div>}
            {weatherData && !error ? (
                <div className="weather-info">
                    <h2>Weather in {cityName}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Visibility: {weatherData.visibility / 1000} km</p>
                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                </div>
            ) : (
                <div className="spinner"></div>
            )}
        </div>
    );
};

export default WeatherApp;
