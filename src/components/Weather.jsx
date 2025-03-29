
import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const allIcons = {
        "01d": clear_icon, "01n": clear_icon,
        "02d": cloud_icon, "02n": cloud_icon,
        "03d": cloud_icon, "03n": cloud_icon,
        "04d": cloud_icon, "04n": cloud_icon,
        "09d": rain_icon, "09n": rain_icon,
        "10d": rain_icon, "10n": rain_icon,
        "11d": rain_icon, "11n": rain_icon,
    };

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) return;

            const icon = allIcons[data.weather?.[0]?.icon] || clear_icon;

            setWeatherData({
                humidity: data.main?.humidity || 0,
                windspeed: data.wind?.speed || 0,
                temperature: Math.floor(data.main?.temp) || 0,
                location: data.name || "Unknown",
                icons: icon,
            });
        } catch (error) {
            console.error("Error fetching weather:", error);
            setWeatherData(null);
        }
    };

    useEffect(() => {
        search('Belgrade');
    }, []);

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData && (
                <div className='weather-data'>
                    <img src={weatherData.icons} alt='' className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>

                    <div className="weather-details">
                        <div className="col">
                            <img src={humidity_icon} alt='' />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt='' />
                            <div>
                                <p>{weatherData.windspeed} m/s</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
