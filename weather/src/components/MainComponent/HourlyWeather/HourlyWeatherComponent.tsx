import { useEffect, useRef, useState, type FunctionComponent } from "react";
import HourlyWeatherItem from "./HourlyWeatherItem";

interface HourlyWeatherComponentProps {
    hourly: {
        precipitation: number[];
        temperature_2m: number[];
        time: string[];
        weathercode: number[];
        windspeed_10m: number[];
    }
}

const HourlyWeatherComponent: FunctionComponent<HourlyWeatherComponentProps> = ({ hourly }) => {
    const { weathercode, time, temperature_2m } = hourly;

    const [nowAM, setNowAM] = useState<number>(0)

    const todayDateStr = new Date().toISOString().slice(0, 10);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        setNowAM(currentHour)

        const currentIndex = todayIndices.findIndex(ind => {
            const hour = new Date(time[ind]).getHours();
            return hour === currentHour;
        });

        if (containerRef.current && currentIndex !== -1) {
            const el = containerRef.current.children[currentIndex] as HTMLElement;
            if (el) {
                el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    }, [time]);

    const todayIndices = time
        .map((t, i) => (t.startsWith(todayDateStr) ? i : -1))
        .filter(i => i !== -1);

    return (
        <div className="relative w-full max-w-full flex flex-col gap-2">

            <h2 className="text-amber-50 font-bold text-2xl mb-2">Stündliche Vorhersage</h2>
            <div ref={containerRef} className="flex gap-2 overflow-x-auto no-scrollbar">
                {todayIndices.map((ind) => (
                    <HourlyWeatherItem
                        key={time[ind]}
                        ind={ind}
                        weathercode={weathercode[ind]}
                        temperature_2m={temperature_2m[ind]}
                        time={time[ind]}
                        nowAM={nowAM}
                    />
                ))}
            </div>


        </div>
    );
}

export default HourlyWeatherComponent;