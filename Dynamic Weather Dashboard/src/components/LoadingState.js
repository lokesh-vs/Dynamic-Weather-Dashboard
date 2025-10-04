// Loading state component
const createLoadingState = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center py-12 space-y-4';
  
  container.innerHTML = `
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <p class="text-muted-foreground">Loading weather data...</p>
  `;
  
  return container;
};