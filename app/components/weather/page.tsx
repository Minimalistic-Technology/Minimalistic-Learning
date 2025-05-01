"use client";

import React, { useEffect, useState } from "react";

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true")
      .then((response) => response.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        } else {
          setError("Weather data not available.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Weather Data</h2>
      {weather ? (
        <p>Temperature: {weather.temperature}°C</p>
      ) : (
        <p className="text-red-500">Weather data not available.</p>
      )}
    </div>
  );
};

export default Weather;