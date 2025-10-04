// Mock weather data for demonstration
export const getMockWeatherData = (location: string) => {
  const conditions = ['sunny', 'cloudy', 'rainy', 'overcast'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    location: location,
    temperature: Math.floor(Math.random() * 30) + 5, // 5-35°C
    condition: randomCondition,
    description: getDescription(randomCondition),
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    visibility: Math.floor(Math.random() * 10) + 5, // 5-15 km
    feelsLike: Math.floor(Math.random() * 30) + 5,
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    uvIndex: Math.floor(Math.random() * 11), // 0-10
  };
};

export const getMockForecastData = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dates = [
    'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9'
  ];
  const conditions = ['sunny', 'cloudy', 'rainy', 'overcast'];
  
  return days.map((day, index) => ({
    date: dates[index],
    day: day,
    high: Math.floor(Math.random() * 15) + 15, // 15-30°C
    low: Math.floor(Math.random() * 10) + 5, // 5-15°C
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    precipitation: Math.floor(Math.random() * 100), // 0-100%
  }));
};

const getDescription = (condition: string) => {
  switch (condition) {
    case 'sunny':
      return 'bright and sunny';
    case 'cloudy':
      return 'partly cloudy';
    case 'rainy':
      return 'light rain showers';
    case 'overcast':
      return 'overcast skies';
    default:
      return 'pleasant weather';
  }
};

// Mock popular cities for quick selection
export const popularCities = [
  'New York, NY',
  'London, UK',
  'Tokyo, Japan',
  'Paris, France',
  'Sydney, Australia',
  'Toronto, Canada',
  'Berlin, Germany',
  'Mumbai, India'
];