import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "49c84fb09bba44af8df173250250507";

  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("❌ Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "";

    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("sunny")) return "sunny";
    if (condition.includes("cloud") || condition.includes("overcast")) return "cloudy";
    if (condition.includes("rain") || condition.includes("drizzle")) return "rainy";
    if (condition.includes("snow") || condition.includes("sleet")) return "snowy";
    if (condition.includes("storm") || condition.includes("thunder")) return "stormy";

    return "";
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <h1>🌤️ Vite Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search Weather</button>
      </div>

      {loading && (
        <div className="spinner">
          <div className="loader"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {weatherData && !loading && (
        <div className="weather-card">
          <h2>📍 {weatherData.location.name}, {weatherData.location.country}</h2>
          <img
            src={`https:${weatherData.current.condition.icon}`}
            alt="weather icon"
          />
          <p>⛅ {weatherData.current.condition.text}</p>
          <p>🌡️ Temperature: {weatherData.current.temp_c}°C</p>
          <p>💨 Wind: {weatherData.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
