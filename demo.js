let apiKey = '033af63b8aaafa2bd554e095e2d56780';
let currentLocation = document.getElementById('location');
let temp = document.getElementById('temp');
let icon = document.getElementById('icon');
let windSpan = document.getElementById('wind-space');
let rainSpan = document.getElementById('rain-space');
let timeZone = document.getElementById('timezone');
let foreCast = document.getElementById('forecast');
let humidSpan = document.getElementById('humidity');
let cityImg = document.getElementById('city');
let weatherHolder = document.getElementById('container');



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Your browser does not support Geolocation");
}

function showPosition(position){
    // console.log('My Location is:', position);
    callWeatherAPI(position);
}

function callWeatherAPI(pos){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${apiKey}`)
.then(res => res.json())                                                                        //function promise/method
.then (data => {
    // console.log(data);
    var timezone = data.timezone;
    var humidity = data.current.humidity;
    var newTemp = data.current.temp
    var windSpd = data.current.wind_speed
    var rainSpd = data.current.weather[0].description
    let dateTime = moment().utc(data.dt).format('dddd, MMMM, Do YYYY');
    var newIcon = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    

    timeZone.innerHTML = dateTime;
    temp.innerHTML = newTemp;
    // currentLocation.innerHTML = timezone;
    icon.src = newIcon;
    windSpan.innerHTML = windSpd;
    humidSpan.innerHTML = humidity;
    // weatherHolder.style.backgroundImage = "url('icons/kl-bg.jpg')"
    rainSpan.innerHTML = capitalizeFirstLetter(rainSpd); 


    var dailyDay = data.daily.length
    for(i = 0; i < 6; i++){
        let forecastContainer = document.createElement('div');
        let dayForecast = document.createElement('h3');
        let imgIcon = document.createElement('img');
        let forecastText = document.createElement('div');
        let weatherForecast = document.createElement('p');
        let tmrTemp = document.createElement('p');        

        forecastContainer.classList.add('forecast-container');
        dayForecast.classList.add('day-forecast');
        imgIcon.classList.add('img-icon');
        forecastText.classList.add('forecast-text');
        tmrTemp.classList.add('tmr-temp');
        weatherForecast.classList.add('weather-forecast');


        let dayEle = data.daily[i].dt
        // console.log(dayEle);
        
        let newDateTime = moment(dateTime, 'dddd, MMMM, Do YYYY').add(i+1, 'days').format('dddd');
        dayForecast.innerHTML = newDateTime;
        // console.log(newDateTime)
        let weatherEle = data.daily[i].weather[0].main
        weatherForecast.innerHTML = weatherEle;
        let tempEle = data.daily[i].temp.day;
        tmrTemp.innerHTML = `${tempEle}&#8451`;
        let dayIcon = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
        imgIcon.src = dayIcon;
        


        forecastText.append(weatherForecast);
        forecastText.append(tmrTemp);

        forecastContainer.append(dayForecast);
        forecastContainer.append(imgIcon);
        forecastContainer.append(forecastText);

        foreCast.append(forecastContainer);
    }
});

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
function currentAPI(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

        // console.log('current city:', data);
        var currentTimezone = data.name;
        var newIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        var currentTemp = Math.round(data.main.temp * 10) / 10;
        var windSpd = data.wind.speed;
        var rainSpd = data.weather[0].description;
        console.log(`Timezone: ${currentTimezone}, Temp:${currentTemp}, Rain:${rainSpd}, Wind:${windSpd}`);
        let dateTime = moment().utc(data.dt).format('dddd, MMMM, Do YYYY');
        var weatherMain = data.weather[0].main;
        console.log(weatherMain);
        
        timeZone.innerHTML = dateTime;
        temp.innerHTML = currentTemp;
        currentLocation.innerHTML = currentTimezone;
        icon.src = newIcon;
        windSpan.innerHTML = windSpd;
        rainSpan.innerHTML = capitalizeFirstLetter(rainSpd);

        var lon = data.coord.lon;
        var lat = data.coord.lat;

        var location = {'coords': {'latitude': lat, 'longitude': lon}};

        // console.log(lat, lon);
         while(foreCast.hasChildNodes()){
            foreCast.removeChild(foreCast.firstChild);
        }
        callWeatherAPI(location);
        changeBg(weatherMain)
    })   

}
function changeBg(weather){
    

    console.log(weather)

    switch(weather){
        case 'Clouds': 
            weatherHolder.style.backgroundImage = "url(images/cloudy.jpg)"
            break;
        case 'Clear':
            weatherHolder.style.backgroundImage = "url(images/sunny.jpg)"
            break;
        case 'Rain' :
            weatherHolder.style.backgroundImage = "url(images/rainy.jpg)"
            break;
        case 'Thunderstorm' :
            weatherHolder.style.backgroundImage = "url(images/thunder.jpg)"
            break;
        default:
            weatherHolder.style.backgroundImage = "url(images/default.jpg)"
    }
}





// moment().add(1, 'days').calendar(); 
