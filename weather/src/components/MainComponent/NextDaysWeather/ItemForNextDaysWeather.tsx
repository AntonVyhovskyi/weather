import type { FunctionComponent } from "react";
import WeatherIconAnimated from "../WeatherIcon";
import { Wind } from 'lucide-react';

interface ItemForNextDaysWeatherProps {
  temperature_2m_max: number;
  temperature_2m_min: number;
  time: string;
  weathercode: number;
  windspeed_10m_max: number;
}

const ItemForNextDaysWeather: FunctionComponent<ItemForNextDaysWeatherProps> = ({
  temperature_2m_max,
  temperature_2m_min,
  time,
  weathercode,
  windspeed_10m_max,
}) => {
  const day = new Date(time);

  // Форматування: День тижня, дата місяць
  const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = day.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border border-white rounded-xl bg-white/10 text-white w-full p-4 sm:p-6 md:p-7 gap-4 overflow-hidden">
      <div className="font-bold mb-0 text-xl sm:text-2xl flex-shrink-0">
        {formattedDate}
      </div>
      <WeatherIconAnimated weatherCode={weathercode} size={50} isDaytime={true} />
      <div className="text-2xl font-semibold whitespace-nowrap flex-shrink-0">
        {temperature_2m_max.toFixed(0)}° / {temperature_2m_min.toFixed(0)}°
      </div>
      <div className="text-2xl mt-1 flex items-center gap-4 whitespace-nowrap flex-shrink-0">
        <Wind />
        {windspeed_10m_max.toFixed(1)} m/s
      </div>
    </div>
  );
};

export default ItemForNextDaysWeather;