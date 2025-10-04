// Current weather component
const createCurrentWeather = (weather) => {
  const container = document.createElement('div');
  container.className = 'bg-card text-card-foreground rounded-lg border p-6';
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return `<svg class="h-16 w-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      case 'cloudy':
        return `<svg class="h-16 w-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`;
      case 'rainy':
        return `<svg class="h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="16" y1="13" x2="16" y2="21"></line>
          <line x1="8" y1="13" x2="8" y2="21"></line>
          <line x1="12" y1="15" x2="12" y2="23"></line>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`;
      case 'snowy':
        return `<svg class="h-16 w-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L10 9L3 12L10 15L12 22L14 15L21 12L14 9L12 2Z"></path>
        </svg>`;
      default:
        return `<svg class="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`;
    }
  };
  
  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold">${weather.location}</h2>
          <p class="text-muted-foreground capitalize">${weather.description}</p>
        </div>
        <div class="text-right">
          <div class="text-5xl font-bold">${weather.temperature}°C</div>
          <div class="text-sm text-muted-foreground">Feels like ${weather.feelsLike}°C</div>
        </div>
      </div>
      
      <div class="flex items-center justify-center">
        ${getWeatherIcon(weather.condition)}
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-muted rounded-lg p-4 text-center">
          <div class="flex items-center justify-center mb-2">
            <svg class="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"></path>
            </svg>
          </div>
          <div class="font-semibold">${weather.humidity}%</div>
          <div class="text-sm text-muted-foreground">Humidity</div>
        </div>
        
        <div class="bg-muted rounded-lg p-4 text-center">
          <div class="flex items-center justify-center mb-2">
            <svg class="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
          </div>
          <div class="font-semibold">${weather.windSpeed} km/h</div>
          <div class="text-sm text-muted-foreground">Wind Speed</div>
        </div>
        
        <div class="bg-muted rounded-lg p-4 text-center">
          <div class="flex items-center justify-center mb-2">
            <svg class="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
          <div class="font-semibold">${weather.visibility} km</div>
          <div class="text-sm text-muted-foreground">Visibility</div>
        </div>
        
        <div class="bg-muted rounded-lg p-4 text-center">
          <div class="flex items-center justify-center mb-2">
            <svg class="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="font-semibold">${weather.pressure} hPa</div>
          <div class="text-sm text-muted-foreground">Pressure</div>
        </div>
      </div>
    </div>
  `;
  
  return container;
};