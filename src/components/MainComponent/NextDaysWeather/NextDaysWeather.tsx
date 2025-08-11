import type { FunctionComponent } from "react";
import ItemForNextDaysWeather from "./ItemForNextDaysWeather";


interface DailyWeather {
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weathercode: number[];
    windspeed_10m_max: number[];
}

interface NextDaysWeatherProps {
    daily: DailyWeather
}

const NextDaysWeather: FunctionComponent<NextDaysWeatherProps> = ({ daily }) => {
    return (
        <div>
            <h2 className="text-amber-50 font-bold text-2xl">Wettervorhersage für die nächsten Tage</h2>
            <div className="h-5"></div>
            <div className="flex flex-col gap-5">
                {daily.time.map((el, ind) => {
                    return (<ItemForNextDaysWeather
                        key={el}
                        temperature_2m_max={daily.temperature_2m_max[ind]}
                        temperature_2m_min={daily.temperature_2m_min[ind]}
                        time={daily.time[ind]}
                        weathercode={daily.weathercode[ind]}
                        windspeed_10m_max={daily.windspeed_10m_max[ind]}
                    />)
                })}
            </div>
        </div>
    );
}

export default NextDaysWeather;