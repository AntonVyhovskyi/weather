import type { FunctionComponent } from "react";
import WeatherIconAnimated from "../WeatherIcon";

interface HourlyWeatherItemProps {
    ind: number,
    weathercode: number,
    time: string,
    temperature_2m: number,
    nowAM: number
}

const HourlyWeatherItem: FunctionComponent<HourlyWeatherItemProps> = ({ weathercode, time, temperature_2m, nowAM}) => {
    const am = new Date(time).getHours()
    return (
        <div className={`flex flex-col items-center gap-3 border border-white rounded-xl  text-white p-6 min-w-[100px]
          ${am===nowAM ? 'bg-white/30' : 'bg-white/10'}`}>
            <div>{am} AM</div>
            <WeatherIconAnimated weatherCode={weathercode} size={50} isDaytime={am >5 && am< 20}/>
            <div>{temperature_2m.toFixed(0)}°C </div>
            
        </div>
    );
}

export default HourlyWeatherItem;