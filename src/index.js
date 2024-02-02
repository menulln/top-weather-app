import './css/style.css';
import { format } from 'date-fns';

function formatWeather(weatherObject) {
    return {
        condition: { ...weatherObject.current.condition },
        isDay: weatherObject.current.is_day,
        tempC: weatherObject.current.temp_c,
        tempF: weatherObject.current.temp_f,
        country: weatherObject.location.country,
        city: weatherObject.location.name,
        date: weatherObject.location.localtime,
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

function displayWeather(weatherObject) {
    const cityBtn = document.querySelector('.city');
    const tempHeading = document.querySelector('.temp');
    const conditionParagraph = document.querySelector('.condition');
    const dateParagraph = document.querySelector('.date');

    const formattedDate = format(
        new Date(weatherObject.date),
        'EEEE, io MMM yyyy | HH:mm'
    );

    cityBtn.textContent = weatherObject.city;
    tempHeading.textContent = showTempInCelsius
        ? weatherObject.tempC
        : weatherObject.tempF;
    conditionParagraph.textContent = weatherObject.condition.text;
    dateParagraph.textContent = formattedDate;

    tempHeading.classList.add(showTempInCelsius ? 'celsius' : 'fahrenheit');
    tempHeading.classList.remove(showTempInCelsius ? 'fahrenheit' : 'celsius');

    document.body.style.backgroundImage = weatherObject.isDay
        ? `url('../src/images/day.png')`
        : `url('../src/images/night.png')`;
}
