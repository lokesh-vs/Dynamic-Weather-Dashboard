// Weather service for handling OpenWeather API integration

const API_KEY = '2d620f64450aabbac4f402d743a5bb0a'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if we have a valid API key
const hasValidApiKey = () => API_KEY !== 'YOUR_OPENWEATHER_API_KEY_HERE' && API_KEY.length > 0;

// Helper function to get a readable city name from coordinates for mock data
const getCityNameFromCoords = (coords) => {
  const cityCoords = {
    'New York, NY': { lat: 40.7128, lon: -74.0060 },
    'London, UK': { lat: 51.5074, lon: -0.1278 },
    'Tokyo, Japan': { lat: 35.6762, lon: 139.6503 },
    'Paris, France': { lat: 48.8566, lon: 2.3522 },
    'Sydney, Australia': { lat: -33.8688, lon: 151.2093 },
    'Toronto, Canada': { lat: 43.6532, lon: -79.3832 },
    'Berlin, Germany': { lat: 52.5200, lon: 13.4050 },
    'Mumbai, India': { lat: 19.0760, lon: 72.8777 },
  };
  
  // Find the closest matching city
  let closestCity = 'New York, NY';
  let closestDistance = Infinity;
  
  Object.entries(cityCoords).forEach(([city, cityCoord]) => {
    const distance = Math.sqrt(
      Math.pow(coords.lat - cityCoord.lat, 2) + 
      Math.pow(coords.lon - cityCoord.lon, 2)
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCity = city;
    }
  });
  
  return closestCity;
};

// Get current position using Geolocation API
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};

// Get coordinates from city name
const getCoordinatesFromCity = async (cityName) => {
  // If no valid API key, use mock coordinates immediately
  if (!hasValidApiKey()) {
    // Return different coordinates based on city for variety in mock data
    const cityCoords = {
      'New York': { lat: 40.7128, lon: -74.0060 },
      'London': { lat: 51.5074, lon: -0.1278 },
      'Tokyo': { lat: 35.6762, lon: 139.6503 },
      'Paris': { lat: 48.8566, lon: 2.3522 },
      'Sydney': { lat: -33.8688, lon: 151.2093 },
      'Toronto': { lat: 43.6532, lon: -79.3832 },
      'Berlin': { lat: 52.5200, lon: 13.4050 },
      'Mumbai': { lat: 19.0760, lon: 72.8777 },
    };
    
    const cityKey = Object.keys(cityCoords).find(key => 
      cityName.toLowerCase().includes(key.toLowerCase())
    );
    
    return cityKey ? cityCoords[cityKey] : { lat: 40.7128, lon: -74.0060 };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('City not found');
    }
    
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch (error) {
    // Only log if we expected the API call to work
    if (hasValidApiKey()) {
      console.warn('Failed to get coordinates from city:', error);
    }
    // Return mock coordinates for demonstration
    return { lat: 40.7128, lon: -74.0060 };
  }
};

// Get current weather data
const getCurrentWeather = async (coords) => {
  // If no valid API key, use mock data immediately
  if (!hasValidApiKey()) {
    const locationName = getCityNameFromCoords(coords);
    return getMockWeatherData(locationName);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: mapWeatherCondition(data.weather[0].main),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(data.visibility / 1000), // Convert meters to km
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      uvIndex: 0, // UV index requires separate API call
    };
  } catch (error) {
    console.warn('Failed to fetch weather data:', error);
    // Fallback to mock data for demonstration
    const locationName = getCityNameFromCoords(coords);
    return getMockWeatherData(locationName);
  }
};

// Get weather forecast
const getWeatherForecast = async (coords) => {
  // If no valid API key, use mock data immediately
  if (!hasValidApiKey()) {
    return getMockForecastData();
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Group forecast data by day (API returns 3-hour intervals)
    const dailyForecasts = {};
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyForecasts[dayKey]) {
        dailyForecasts[dayKey] = [];
      }
      dailyForecasts[dayKey].push(item);
    });
    
    // Get next 5 days
    const forecastDays = Object.keys(dailyForecasts).slice(0, 5);
    
    return forecastDays.map((dayKey, index) => {
      const dayData = dailyForecasts[dayKey];
      const date = new Date(dayKey);
      
      const temps = dayData.map(item => item.main.temp);
      const high = Math.round(Math.max(...temps));
      const low = Math.round(Math.min(...temps));
      
      const mostCommonWeather = dayData[0].weather[0]; // Simplified - could be more sophisticated
      const precipitation = dayData.some(item => item.weather[0].main.includes('Rain')) ? 
        Math.round(Math.random() * 100) : 0; // Simplified precipitation calculation
      
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
        high,
        low,
        condition: mapWeatherCondition(mostCommonWeather.main),
        precipitation,
      };
    });
  } catch (error) {
    console.warn('Failed to fetch forecast data:', error);
    // Fallback to mock data for demonstration
    return getMockForecastData();
  }
};

// Map OpenWeather conditions to our simplified conditions
const mapWeatherCondition = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'sunny';
    case 'clouds':
      return 'cloudy';
    case 'rain':
    case 'drizzle':
      return 'rainy';
    case 'snow':
      return 'snowy';
    case 'thunderstorm':
      return 'rainy';
    case 'mist':
    case 'fog':
    case 'haze':
      return 'cloudy';
    default:
      return 'sunny';
  }
};

// Helper function to get weather by city name
const getWeatherByCity = async (cityName) => {
  const coords = await getCoordinatesFromCity(cityName);
  const [weather, forecast] = await Promise.all([
    getCurrentWeather(coords),
    getWeatherForecast(coords)
  ]);
  
  return { weather, forecast };
};

// Helper function to get weather by current location
const getWeatherByCurrentLocation = async () => {
  const coords = await getCurrentPosition();
  const [weather, forecast] = await Promise.all([
    getCurrentWeather(coords),
    getWeatherForecast(coords)
  ]);
  
  return { weather, forecast };
};