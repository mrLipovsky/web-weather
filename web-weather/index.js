const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIkey = '38b16cd667bf83bec7cb04fa3c403734';
    const city = document.querySelector('.search-box input').value;

    if(city === '')
        return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display  = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
            error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.scr = 'images/001-sun.png';
                break;
            case 'Rain':
                image.scr = 'images/002-cloudy.png';
                break;
            case 'Snow':
                image.scr = 'image/004-snow.png';
                break;
            case 'Clouds':
                image.scr = 'image/002-cloudy-1.png';
                break;
            case 'Haze':
                image.scr = 'image/005-haze.png';
                break;
            default:
                image.scr = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity} %`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    })

    
});