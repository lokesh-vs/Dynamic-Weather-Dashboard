// Location search component
const createLocationSearch = (onLocationSelect, currentLocation) => {
  const container = document.createElement('div');
  container.className = 'bg-card text-card-foreground rounded-lg border p-6 mb-8';
  
  container.innerHTML = `
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label for="location-input" class="block mb-2">Search Location</label>
        <input 
          type="text" 
          id="location-input" 
          placeholder="Enter city name..." 
          value="${currentLocation || ''}"
          class="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div class="flex gap-2">
        <button id="search-btn" class="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 whitespace-nowrap">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search
        </button>
        <button id="current-location-btn" class="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 whitespace-nowrap" title="Use current location">
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Current Location
        </button>
      </div>
    </div>
  `;
  
  const input = container.querySelector('#location-input');
  const searchBtn = container.querySelector('#search-btn');
  const currentLocationBtn = container.querySelector('#current-location-btn');
  
  const handleSearch = () => {
    const value = input.value.trim();
    if (value) {
      onLocationSelect(value);
    }
  };
  
  const handleCurrentLocation = () => {
    onLocationSelect('current-location');
  };
  
  searchBtn.addEventListener('click', handleSearch);
  currentLocationBtn.addEventListener('click', handleCurrentLocation);
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  
  return container;
};