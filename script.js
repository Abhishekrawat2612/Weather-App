const form = document.querySelector('form');
const input = document.querySelector('#city');
const weatherInfo = document.querySelector('#weather-info');

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiKey = `13ff2658a2275f2271aa11397254157f`;
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const description = data.weather[0].description;

      weatherInfo.innerHTML = `
        <p>Temperature: ${temp} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${windSpeed} m/s</p>
        <p>Description: ${description}</p>
      `;
    })
    .catch(error => {
      console.error(error);
      weatherInfo.innerHTML = '<p>An error occurred while fetching weather data</p>';
    });
}
