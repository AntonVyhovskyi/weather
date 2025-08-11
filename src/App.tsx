import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';
import type { NominatimResponse, WeatherResponse } from './types/weather';
import WeatherContainerComponent from './components/MainComponent/WeatherContainerComponent';


function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [city, setCity] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------------------- axios functionen ------------------------------------------------------------------


  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<WeatherResponse>(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: lat,
            longitude: lon,
            current_weather: true,
            hourly: "temperature_2m,precipitation,windspeed_10m,weathercode",
            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode",
            forecast_days: 7,
            timezone: "Europe/Berlin",
          },
        }
      );
      setWeatherData(response.data)
      console.log("weather:", response.data);
    } catch (error) {
      setError("Fehler beim Laden der Daten");
      console.error(error);
    } finally {
      setLoading(false);
    }

  }


  const fetchCityName = async (lat: number, lon: number) => {
    try {
      const res = await axios.get<NominatimResponse>(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: { format: "json", lat, lon, "accept-language": "de" },
        }
      );
      if (res.data.address.city) {
        setCity(res.data.address.city)
        console.log(res.data.address.city);

      } else {
        setCity(null)
      }


    } catch (error) {
      setCity(null)
      console.log(error);

    }
  }

  // ------------------------------------------------------------------------------------------------------

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log("Широта:", lat, "Долгота:", lon);
        fetchWeather(lat, lon);
        fetchCityName(lat, lon)
      },
      (err) => {
        console.error("Ошибка получения местоположения", err);
        // Можно вызвать fetchWeather с дефолтными координатами или показать ошибку
      }
    );

  }, [])

  return (
    <div className='w-full min-h-screen'>
    { weatherData? <WeatherContainerComponent weatherResponse={weatherData} city={city} /> : ''}
      
    </div>


  )
}

export default App
