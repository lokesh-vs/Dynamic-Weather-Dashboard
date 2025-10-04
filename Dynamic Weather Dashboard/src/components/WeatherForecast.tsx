import React from 'react';
import { Card } from './ui/card';
import { Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';

interface ForecastDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: string, size = "h-8 w-8") => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun className={`${size} text-yellow-500`} />;
    case 'cloudy':
    case 'overcast':
      return <Cloud className={`${size} text-gray-500`} />;
    case 'rainy':
    case 'rain':
      return <CloudRain className={`${size} text-blue-500`} />;
    case 'snowy':
    case 'snow':
      return <Snowflake className={`${size} text-blue-200`} />;
    default:
      return <Sun className={`${size} text-yellow-500`} />;
  }
};

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl mb-4">5-Day Forecast</h3>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4 flex-1">
              {getWeatherIcon(day.condition)}
              <div>
                <p className="font-medium">{day.day}</p>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Precipitation</p>
                <p className="text-sm">{day.precipitation}%</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-medium">{day.high}°</p>
                <p className="text-sm text-muted-foreground">{day.low}°</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}