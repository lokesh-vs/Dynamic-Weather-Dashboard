import React from 'react';
import { Card } from './ui/card';
import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  pressure: number;
  uvIndex: number;
}

interface CurrentWeatherProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun className="h-16 w-16 text-yellow-500" />;
    case 'cloudy':
    case 'overcast':
      return <Cloud className="h-16 w-16 text-gray-500" />;
    case 'rainy':
    case 'rain':
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    case 'snowy':
    case 'snow':
      return <Snowflake className="h-16 w-16 text-blue-200" />;
    default:
      return <Sun className="h-16 w-16 text-yellow-500" />;
  }
};

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 lg:mb-0">
          {getWeatherIcon(weather.condition)}
          <div>
            <h2 className="text-3xl mb-1">{weather.temperature}°C</h2>
            <p className="text-muted-foreground capitalize">{weather.description}</p>
            <p className="text-sm text-muted-foreground">{weather.location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Feels like</p>
          <p className="text-xl">{weather.feelsLike}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Wind className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p>{weather.windSpeed} km/h</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p>{weather.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Eye className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-muted-foreground">Visibility</p>
            <p>{weather.visibility} km</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
          <Thermometer className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-sm text-muted-foreground">Pressure</p>
            <p>{weather.pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
}