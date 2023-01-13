var today = dayjs().format('MM/DD/YYYY');


$('#city-search-submit').click(function(event) {
    event.preventDefault();

    var citySearchInput = $('#city-search').val();
    getGeoLocation(citySearchInput);
})



function getGeoLocation(city) {
    
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=dc7b400a7fd4369b06a82b6599dd0826')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            var currentCityLat = data[0].lat;
            var currentCityLon = data[0].lon;

            document.querySelector('.current-day').innerHTML = '';
            getCurrentWeather(currentCityLat, currentCityLon);
            getWeatherForecast(currentCityLat, currentCityLon);
        })
        .catch(err => console.error(err));
}


function getCurrentWeather(lat, lon) {

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=dc7b400a7fd4369b06a82b6599dd0826&units=imperial')
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            
            var currentWeatherIcon = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
            var currentWeatherIconImg = document.createElement('img');
            currentWeatherIconImg.setAttribute('src', currentWeatherIcon);
            currentWeatherIconImg.id = 'current-weather-icon';

            var cityName = document.createElement('div');
            cityName.textContent = response.name + ' - ' + today;
            cityName.id = 'city-name';

            var currentTemp = document.createElement('div');
            currentTemp.textContent = 'Temp: ' + response.main.temp + '\u00b0F';
            currentTemp.id = 'current-temp';

            var currentWindSpeed = document.createElement('div');
            currentWindSpeed.textContent = 'Wind: ' + response.wind.speed + ' MPH';
            currentWindSpeed.id = 'current-wind';

            var currentHumidity = document.createElement('div');
            currentHumidity.textContent = 'Humidity: ' + response.main.humidity + '%';
            currentHumidity.id = 'current-humidity';

            document.querySelector('.current-day').append(cityName, currentTemp, currentWindSpeed, currentHumidity);
            document.querySelector('#city-name').appendChild(currentWeatherIconImg);

            
        })
        .catch(err => console.error(err));
}

function getWeatherForecast(lat, lon) {

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=dc7b400a7fd4369b06a82b6599dd0826&units=imperial')
        .then(response => response.json())
        .then(function(response) {
            console.log(response);
            var counter = 0;
            for (var i = 5; i < response.list.length; i += 8) {
                counter++

                futureDate = dayjs(today).add(counter, 'day').format('MM/DD/YYYY');

                var date = document.createElement('div');
                date.textContent = futureDate;
                date.className = 'date';

                var forecastWeatherIcon = 'http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '@2x.png';
                var forecastWeatherIconImg = document.createElement('img');
                forecastWeatherIconImg.setAttribute('src', forecastWeatherIcon);
                forecastWeatherIconImg.className = 'forecast-weather-icon';

                var forecastTemp = document.createElement('div');
                forecastTemp.textContent = 'Temp: ' + response.list[i].main.temp + '\u00b0F';
                forecastTemp.className = 'forecast-temp';

                var forecastWindSpeed = document.createElement('div');
                forecastWindSpeed.textContent = 'Wind: ' + response.list[i].wind.speed + ' MPH';
                forecastWindSpeed.className = 'forecast-wind';

                var forecastHumidity = document.createElement('div');
                forecastHumidity.textContent = 'Humidity: ' + response.list[i].main.humidity + '%';
                forecastHumidity.className = 'forecast-humidity';

                document.querySelector('.forcast-'+ [i]).append(date, forecastWeatherIconImg, forecastTemp, forecastWindSpeed, forecastHumidity);
            }
        })
        .catch(err => console.error(err))
}