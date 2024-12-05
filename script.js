const apiKey = '8a6552895d9dfeaddd4dc5e0134d9ab7';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else if (data.cod === '404') {
            // If city is not found, show this message
            document.getElementById('weather-info').innerHTML = `<p>City not found. Please enter a valid city name.</p>`;
        } else {
            // For other errors (if any)
            alert('An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}
