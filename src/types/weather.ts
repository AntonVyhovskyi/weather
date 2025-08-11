
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };

  hourly_units: {
    time: string;
    temperature_2m: string;
    precipitation: string;
    windspeed_10m: string;
    weathercode:number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    windspeed_10m: number[];
    weathercode:number[];
  };

  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    windspeed_10m_max: string;
    weathercode: string;
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    windspeed_10m_max: number[];
    weathercode: number[];
  };
}

export interface NominatimResponse {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}