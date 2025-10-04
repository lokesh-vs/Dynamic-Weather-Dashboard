import React, { useState, useEffect } from "react";
import { LocationSearch } from "./components/LocationSearch";
import { CurrentWeather } from "./components/CurrentWeather";
import { WeatherForecast } from "./components/WeatherForecast";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Moon, Sun, MapPin } from "lucide-react";
import {
  getWeatherByCity,
  getWeatherByCurrentLocation,
  WeatherData,
  ForecastDay,
} from "./utils/weatherService";
import { popularCities } from "./utils/mockWeatherData";

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(
    null,
  );
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize with current location on first load
  useEffect(() => {
    loadCurrentLocationWeather();
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const loadCurrentLocationWeather = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCurrentLocation();
      setWeather(data.weather);
      setForecast(data.forecast);
      setLocation(data.weather.location);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load current location weather",
      );
      // Try to load default city as fallback
      await loadCityWeather("New York, NY");
    } finally {
      setLoading(false);
    }
  };

  const loadCityWeather = async (cityName: string) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCity(cityName);
      setWeather(data.weather);
      setForecast(data.forecast);
      setLocation(data.weather.location);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load weather data",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    if (
      selectedLocation.includes(",") &&
      selectedLocation.match(/[-+]?\d*\.?\d+/g)
    ) {
      // Handle coordinate format
      loadCurrentLocationWeather();
    } else {
      // Handle city name
      loadCityWeather(selectedLocation);
    }
  };

  const handleRetry = () => {
    if (location) {
      loadCityWeather(location);
    } else {
      loadCurrentLocationWeather();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl">
                  Dynamic Weather Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time weather information and forecasts
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="shrink-0"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Location Search */}
        <LocationSearch
          onLocationSelect={handleLocationSelect}
          currentLocation={location}
        />

        {/* Quick Location Buttons */}
        <Card className="p-4 mb-8">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">
            Popular Cities
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <Button
                key={city}
                variant="secondary"
                size="sm"
                onClick={() => loadCityWeather(city)}
                className="text-xs"
                disabled={loading}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {city.split(",")[0]}
              </Button>
            ))}
          </div>
        </Card>

        {/* Weather Content */}
        {loading && <LoadingState />}

        {error && !loading && (
          <ErrorState error={error} onRetry={handleRetry} />
        )}

        {weather && !loading && !error && (
          <div className="space-y-8">
            <CurrentWeather weather={weather} />
            <WeatherForecast forecast={forecast} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Dynamic Weather Dashboard - Built with OpenWeather
              API
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}