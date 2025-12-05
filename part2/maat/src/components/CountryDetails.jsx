import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country, onBack }) => {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchWeather = async () => {
      setWeather(null);
      setWeatherError(null);
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        setWeatherError('Missing VITE_WEATHER_API_KEY');
        return;
      }
      const lat = country.latlng?.[0];
      const lon = country.latlng?.[1];
      if (lat == null || lon == null) {
        setWeatherError('No coordinates available');
        return;
      }

      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        setWeatherError(err.message || 'Failed to fetch weather');
      }
    };

    fetchWeather();
  }, [country]);

  const name = country?.name?.common || country?.name;
  const capital = country?.capital ? country.capital.join(', ') : 'N/A';
  const area = country?.area || 'N/A';
  const flag = country?.flags?.png || country?.flags?.svg || '';
  const languages = country?.languages ? Object.values(country.languages) : [];

  const kelvinToCelsius = (k) => (k ? (k - 273.15).toFixed(1) : null);

  if (!country) return null;

  return (
    <div>
      {onBack && (
        <button onClick={() => onBack()} style={{ marginBottom: '8px' }}>
          Back
        </button>
      )}
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      {flag && (
        <div>
          <img src={flag} alt={`flag of ${name}`} style={{ width: '150px' }} />
        </div>
      )}

      <h3>Languages:</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <h3>Weather:</h3>
      {weatherError && <p>Error loading weather: {weatherError}</p>}
      {!weather && !weatherError && <p>Loading weather...</p>}
      {weather && (
        <div>
          <p>Temperature: {kelvinToCelsius(weather.main?.temp)} °C</p>
          <p>Wind: {weather.wind?.speed} m/s</p>
          {weather.weather && weather.weather[0] && (
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
