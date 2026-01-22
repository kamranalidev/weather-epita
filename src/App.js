import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [unit, setUnit] = useState("C");

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(cityName);
        setWeatherData(data);
        if (!recentSearches.includes(cityName)) {
          setRecentSearches([...recentSearches, cityName]);
        }
        setCityName("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
  };

  const handleRecentSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Switch to °{unit === "C" ? "F" : "C"}
      </button>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}> {error}</div>}

      {recentSearches.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recent Searches:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {recentSearches.map((city, index) => (
              <li
                key={index}
                onClick={() => handleRecentSearch(city)}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  background: "#f0f0f0",
                  margin: "5px 0",
                  borderRadius: "5px",
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}

      {weatherData?.location && (
        <div>
          <h2>
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <p>
            Temperature:{" "}
            {unit === "C"
              ? weatherData.current.temp_c
              : weatherData.current.temp_f}{" "}
            °{unit}
          </p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity}</p>
          <p>Pressure: {weatherData.current.pressure_mb}</p>
          <p>Visibility: {weatherData.current.vis_km}</p>
        </div>
      )}
    </div>
  );
};

export default App;
