async function getWeather(cityName) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=71cbb440aad5415f836161300242901&q=${cityName}`
    );

    const weatherData = await response.json();
    return weatherData;
}
