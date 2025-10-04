// Weather forecast component
const createWeatherForecast = (forecast) => {
  const container = document.createElement('div');
  container.className = 'bg-card text-card-foreground rounded-lg border p-6';
  
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return `<svg class="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        return `<svg class="h-8 w-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`;
      case 'rainy':
        return `<svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="16" y1="13" x2="16" y2="21"></line>
          <line x1="8" y1="13" x2="8" y2="21"></line>
          <line x1="12" y1="15" x2="12" y2="23"></line>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>`;
      case 'snowy':
        return `<svg class="h-8 w-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L10 9L3 12L10 15L12 22L14 15L21 12L14 9L12 2Z"></path>
        </svg>`;
      default:
        return `<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>`;
    }
  };
  
  const forecastItems = forecast.map(day => `
    <div class="bg-muted rounded-lg p-4 text-center space-y-3">
      <div>
        <div class="font-medium">${day.day}</div>
        <div class="text-sm text-muted-foreground">${day.date}</div>
      </div>
      
      <div class="flex justify-center">
        ${getWeatherIcon(day.condition)}
      </div>
      
      <div class="space-y-1">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">${day.high}°</span>
          <span class="text-muted-foreground">${day.low}°</span>
        </div>
        <div class="text-xs text-muted-foreground">
          ${day.precipitation}% chance of rain
        </div>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = `
    <div class="space-y-6">
      <h3 class="text-xl font-semibold">5-Day Forecast</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        ${forecastItems}
      </div>
    </div>
  `;
  
  return container;
};