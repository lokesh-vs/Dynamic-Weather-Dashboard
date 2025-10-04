// Main application logic
class WeatherApp {
  constructor() {
    this.weather = null;
    this.forecast = [];
    this.location = '';
    this.loading = false;
    this.error = '';
    this.isDarkMode = false;
    
    this.root = document.getElementById('root');
    this.init();
  }
  
  init() {
    this.render();
    this.loadCurrentLocationWeather();
  }
  
  async loadCurrentLocationWeather() {
    this.setLoading(true);
    this.setError('');
    
    try {
      const data = await getWeatherByCurrentLocation();
      this.setWeather(data.weather);
      this.setForecast(data.forecast);
      this.setLocation(data.weather.location);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Failed to load current location weather');
      // Try to load default city as fallback
      await this.loadCityWeather('New York, NY');
    } finally {
      this.setLoading(false);
    }
  }
  
  async loadCityWeather(cityName) {
    this.setLoading(true);
    this.setError('');
    
    try {
      const data = await getWeatherByCity(cityName);
      this.setWeather(data.weather);
      this.setForecast(data.forecast);
      this.setLocation(data.weather.location);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Failed to load weather data');
    } finally {
      this.setLoading(false);
    }
  }
  
  handleLocationSelect = (selectedLocation) => {
    if (selectedLocation === 'current-location') {
      this.loadCurrentLocationWeather();
    } else {
      this.loadCityWeather(selectedLocation);
    }
  }
  
  handleRetry = () => {
    if (this.location) {
      this.loadCityWeather(this.location);
    } else {
      this.loadCurrentLocationWeather();
    }
  }
  
  toggleDarkMode = () => {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.render();
  }
  
  setWeather(weather) {
    this.weather = weather;
    this.render();
  }
  
  setForecast(forecast) {
    this.forecast = forecast;
    this.render();
  }
  
  setLocation(location) {
    this.location = location;
    this.render();
  }
  
  setLoading(loading) {
    this.loading = loading;
    this.render();
  }
  
  setError(error) {
    this.error = error;
    this.render();
  }
  
  render() {
    this.root.innerHTML = '';
    
    // Create main container
    const app = document.createElement('div');
    app.className = 'min-h-screen bg-background';
    
    // Header
    const header = document.createElement('header');
    header.className = 'border-b';
    header.innerHTML = `
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-primary text-primary-foreground rounded-lg">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl">Dynamic Weather Dashboard</h1>
              <p class="text-sm text-muted-foreground">Real-time weather information and forecasts</p>
            </div>
          </div>
          
          <button id="dark-mode-toggle" class="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0">
            ${this.isDarkMode ? `
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ` : `
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            `}
          </button>
        </div>
      </div>
    `;
    
    // Main content
    const main = document.createElement('main');
    main.className = 'container mx-auto px-4 py-8';
    
    // Location Search
    const locationSearch = createLocationSearch(this.handleLocationSelect, this.location);
    main.appendChild(locationSearch);
    
    // Popular Cities
    const popularCitiesCard = document.createElement('div');
    popularCitiesCard.className = 'bg-card text-card-foreground rounded-lg border p-4 mb-8';
    popularCitiesCard.innerHTML = `
      <h3 class="font-medium mb-3 text-muted-foreground">Popular Cities</h3>
      <div class="flex flex-wrap gap-2" id="popular-cities"></div>
    `;
    
    const popularCitiesContainer = popularCitiesCard.querySelector('#popular-cities');
    popularCities.forEach(city => {
      const button = document.createElement('button');
      button.className = 'inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-3 text-xs';
      button.innerHTML = `
        <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        ${city.split(',')[0]}
      `;
      button.disabled = this.loading;
      button.addEventListener('click', () => this.loadCityWeather(city));
      popularCitiesContainer.appendChild(button);
    });
    
    main.appendChild(popularCitiesCard);
    
    // Weather Content
    if (this.loading) {
      main.appendChild(createLoadingState());
    } else if (this.error && !this.weather) {
      main.appendChild(createErrorState(this.error, this.handleRetry));
    } else if (this.weather) {
      const weatherContainer = document.createElement('div');
      weatherContainer.className = 'space-y-8';
      
      weatherContainer.appendChild(createCurrentWeather(this.weather));
      weatherContainer.appendChild(createWeatherForecast(this.forecast));
      
      main.appendChild(weatherContainer);
    }
    
    // Footer
    const footer = document.createElement('footer');
    footer.className = 'border-t mt-16';
    footer.innerHTML = `
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-muted-foreground">
            Dynamic Weather Dashboard - Built with OpenWeather API
          </p>
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated: ${new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    `;
    
    app.appendChild(header);
    app.appendChild(main);
    app.appendChild(footer);
    this.root.appendChild(app);
    
    // Add event listeners
    const darkModeToggle = app.querySelector('#dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', this.toggleDarkMode);
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WeatherApp();
});