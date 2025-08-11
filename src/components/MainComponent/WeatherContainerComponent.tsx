import { useEffect, useState, type FunctionComponent } from "react";
import type { WeatherResponse } from "../../types/weather";
import { MapPin, Wind } from 'lucide-react';
import WeatherIconAnimated from "./WeatherIcon";
import HourlyWeatherComponent from "./HourlyWeather/HourlyWeatherComponent";
import NextDaysWeather from "./NextDaysWeather/NextDaysWeather";


interface WeatherContainerComponenttProps {
    weatherResponse: WeatherResponse,
    city: string | null
}

const WeatherContainerComponent: FunctionComponent<WeatherContainerComponenttProps> = ({ weatherResponse, city }) => {

    const [wetherCode, setwetherCode] = useState<number>(0);
    const [isDaytime, setIsDaytime] = useState(true);

    const [backgroundColor, setbackgroundColor] = useState<string>('bg-gradient-to-r from-blue-300 to-blue-500');

    const [date, setdate] = useState<number>(0);
    const [month, setmonth] = useState<string>('');
    const [weekDay, setweekDay] = useState<string>('');


    const getWeatherColor = (code: number): string => {
        const weatherColor: { [key: number]: string } = {
            0: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500",
            1: "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400",
            2: "bg-gradient-to-r from-yellow-200 via-blue-300 to-blue-500",
            3: "bg-gradient-to-r from-blue-500 to-blue-700",
            45: "bg-gradient-to-r from-gray-400 to-gray-600",
            48: "bg-gradient-to-r from-gray-400 to-gray-600",
            51: "bg-gradient-to-r from-blue-200 to-blue-400",
            53: "bg-gradient-to-r from-blue-300 to-blue-500",
            55: "bg-gradient-to-r from-blue-600 to-blue-800",
            56: "bg-gradient-to-r from-blue-200 to-blue-400",
            57: "bg-gradient-to-r from-blue-600 to-blue-800",
            61: "bg-gradient-to-r from-blue-700 to-blue-900",
            63: "bg-gradient-to-r from-blue-800 to-blue-900",
            65: "bg-gradient-to-r from-blue-900 to-blue-950",
            66: "bg-gradient-to-r from-cyan-600 to-cyan-800",
            67: "bg-gradient-to-r from-gray-700 to-gray-900",
            71: "bg-gradient-to-r from-white to-cyan-100",
            73: "bg-gradient-to-r from-cyan-100 to-cyan-300",
            75: "bg-gradient-to-r from-blue-400 to-blue-600",
            77: "bg-gradient-to-r from-cyan-200 to-cyan-400",
            80: "bg-gradient-to-r from-blue-600 to-blue-800",
            81: "bg-gradient-to-r from-blue-700 to-blue-900",
            82: "bg-gradient-to-r from-blue-900 to-blue-950",
            85: "bg-gradient-to-r from-blue-200 to-blue-400",
            86: "bg-gradient-to-r from-blue-300 to-blue-500",
            95: "bg-gradient-to-r from-orange-400 to-orange-600",
            96: "bg-gradient-to-r from-orange-600 to-orange-800",
            99: "bg-gradient-to-r from-orange-700 to-orange-900",
        };
        console.log(weatherColor[code]);

        return weatherColor[code] || "#FFFFFF";
    }
    function formatDateDayWeek(dateTimeStr: string) {
        const date = new Date(dateTimeStr);

        const day = date.getDate(); // число месяца
        const month = date.toLocaleString('en-US', { month: 'long' }); // August
        const dayName = date.toLocaleDateString('de-DE', { weekday: 'long' }); // Samstag
        setdate(day)
        setmonth(month)
        setweekDay(dayName)
    }


    useEffect(() => {
        if (weatherResponse) {

            setwetherCode(Number(weatherResponse.current_weather.weathercode))
            formatDateDayWeek(weatherResponse.current_weather.time)
            const hour = new Date(weatherResponse.current_weather.time).getHours();
            setIsDaytime(hour >= 6 && hour < 18);
            if (!isDaytime) {
                setbackgroundColor('bg-gradient-to-r from-gray-400 to-gray-600')
            } else {
                setbackgroundColor(getWeatherColor(Number(weatherResponse.current_weather.weathercode)))
            }

        }

    }, [weatherResponse])




    return (
        <div className={`${backgroundColor} flex flex-col w-full min-h-screen items-center pb-10`}>
            <div className="w-full max-w-[1200px] px-4 sm:px-6 md:px-0 mx-auto">
                <div className="flex justify-center items-center h-screen">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex justify-center items-center gap-2 text-amber-50 font-bold text-3xl mb-10"><MapPin size={30} />{city ? city : 'wo bist du?'}</div>
                        <div className="flex justify-center items-center gap-2 text-amber-50 font-bold text-2xl">{weekDay}, {date} {month}</div>
                        <WeatherIconAnimated weatherCode={wetherCode} isDaytime={isDaytime} />

                        <div className="flex justify-center items-center gap-2 text-amber-50 font-bold text-6xl" >{weatherResponse.current_weather.temperature.toFixed(0)}°C </div>
                        <div className="flex justify-center items-center gap-2 text-amber-50 font-bold text-4xl"> <Wind color="white" size={60} /> {weatherResponse.current_weather.windspeed}km/h</div>


                    </div>


                </div>

                <HourlyWeatherComponent hourly={weatherResponse.hourly} />
                <div className="h-20"></div>
                <NextDaysWeather daily={weatherResponse.daily} />
            </div>




        </div>
    );
}

export default WeatherContainerComponent;