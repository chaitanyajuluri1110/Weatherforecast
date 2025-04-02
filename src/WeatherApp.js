import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const locationResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );

      if (locationResponse.data.length === 0) {
        setError("City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      const { lat, lon } = locationResponse.data[0];

      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );

      setWeather(weatherResponse.data.current_weather);
    } catch (err) {
      setError("Something went wrong!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🌍 Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {loading && <p className="loading">⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>🌡 {weather.temperature}°C</h3>
          <p>💨 Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
