import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "f4a84dce793432f2df171ece248115d9";

function getBackground(condition) {
  if (!condition) return "";
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("cloud")) return "cloudy";
  if (conditionLower.includes("rain")) return "rainy";
  if (conditionLower.includes("clear")) return "sunny";
  if (conditionLower.includes("snow")) return "snowy";
  return "default";
}

function App() {
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState("New York");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: location,
            units: "metric",
            appid: API_KEY
          }
        });
        setForecast(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className={`weather-container ${getBackground(forecast?.weather[0]?.main)}`}>
      <h1>{location}</h1>
      {error && <p>{error}</p>}
      {!forecast ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Current: {forecast.main.temp}°C</h2>
          <h3>{forecast.weather[0].main}</h3>
        </div>
      )}
    </div>
  );
}

export default App;