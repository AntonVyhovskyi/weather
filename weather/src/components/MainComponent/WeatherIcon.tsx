import { Sun, Cloud, CloudRain, CloudSnow, Zap, Moon } from 'lucide-react';
import type React from 'react';

interface WeatherIconAnimatedProps {
  weatherCode: number;
  size?: number;
  isDaytime: boolean;
}

const WeatherIconAnimated: React.FC<WeatherIconAnimatedProps> = ({ weatherCode, size = 160, isDaytime }) => {
  if (weatherCode < 2) {
    return isDaytime ? (
      <div className="animate-[spin_20s_linear_infinite] w-fit">
        <Sun color="white" size={size} />
      </div>
    ) : (
      <Moon color="white" size={size} />
    );
  }

  if (weatherCode < 45) {
    return <Cloud color="white" size={size} />;
  }

  if (weatherCode < 61) {
    return <CloudRain color="white" size={size} />;
  }

  if (weatherCode < 80) {
    return <CloudSnow color="white" size={size} />;
  }

  if (weatherCode >= 95) {
    return <Zap color="white" size={size} />;
  }

  // По умолчанию:
  return <Cloud color="white" size={size} />;
};

export default WeatherIconAnimated;