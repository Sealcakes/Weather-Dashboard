var currentCityLat;
var currentCityLon;


$('#city-search-submit').click(function(event) {
    event.preventDefault();

    var citySearchInput = $('#city-search').val();
    getGeoLocation(citySearchInput);
})



function getGeoLocation(city) {
    
    const options = {
        method: 'GET'
    }
    
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=dc7b400a7fd4369b06a82b6599dd0826', options)
        .then(response => response.json())
        .then(data => {
            var currentCityLat = data[0].lat;
            var currentCityLon = data[0].lon;

            getCurrentWeather(currentCityLat, currentCityLon);
        })
        .catch(err => console.error(err));
}


function getCurrentWeather(lat, lon) {

    const options = {
        method: 'GET'
    }

    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=dc7b400a7fd4369b06a82b6599dd0826', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
}