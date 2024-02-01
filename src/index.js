function formatWeather(weatherObject) {
    return {
        condition: { ...weatherObject.current.condition },
        isDay: weatherObject.current.is_day,
        tempC: weatherObject.current.temp_c,
        tempF: weatherObject.current.temp_f,
        country: weatherObject.location.country,
        city: weatherObject.location.name,
        time: weatherObject.location.localtime,
    };
}

async function getWeather(cityName) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=71cbb440aad5415f836161300242901&q=${cityName}`
    );

    const weatherData = await response.json();
    const formattedWeather = formatWeather(weatherData);
    return formattedWeather;
}
