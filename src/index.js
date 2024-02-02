import './css/style.css';
import { format } from 'date-fns';

let showTempInCelsius = true;

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

function displayAppLayout() {
    const switchTempBtn = document.createElement('button');
    const cityBtn = document.createElement('button');
    const tempHeading = document.createElement('h1');
    const conditionParagraph = document.createElement('p');
    const dateParagraph = document.createElement('p');

    switchTempBtn.classList.toggle('switch-temp');
    cityBtn.classList.toggle('city');
    tempHeading.classList.toggle('temp');
    conditionParagraph.classList.toggle('condition');
    dateParagraph.classList.toggle('date');

    switchTempBtn.textContent = 'C';

    document.body.appendChild(switchTempBtn);
    document.body.appendChild(cityBtn);
    document.body.appendChild(tempHeading);
    document.body.appendChild(conditionParagraph);
    document.body.appendChild(dateParagraph);

    async function setDefaultWeather() {
        const defaultWeather = await getWeather('garbsen');
        displayWeather(defaultWeather);
    }

    setDefaultWeather();

    switchTempBtn.addEventListener('click', async () => {
        if (showTempInCelsius) {
            showTempInCelsius = false;
        } else {
            showTempInCelsius = true;
        }
        switchTempBtn.textContent = showTempInCelsius ? 'C' : 'F';

        const currentWeather = await getWeather(cityBtn.textContent);

        displayWeather(currentWeather);
    });

    cityBtn.addEventListener('click', () => {
        const dialog = document.createElement('dialog');
        const cityInput = document.createElement('input');
        const confirmBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        confirmBtn.textContent = 'Change City';
        cancelBtn.textContent = 'Cancel';

        confirmBtn.addEventListener('click', async () => {
            const weatherData = await getWeather(cityInput.value);
            displayWeather(weatherData);

            dialog.remove();
        });

        cancelBtn.addEventListener('click', () => {
            dialog.remove();
        });

        dialog.appendChild(cityInput);
        dialog.appendChild(confirmBtn);
        dialog.appendChild(cancelBtn);

        document.body.appendChild(dialog);

        dialog.showModal();
    });
}

displayAppLayout();
