//HW 4 feature 1
let currentTime = new Date();
let loadDay = document.querySelector(".current-day");
let daysF = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = daysF[currentTime.getDay()];
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
loadDay.innerHTML = `${day} ${date}, ${hour}:${minutes}`;



function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#city-input");
  let dataCity = document.querySelector("#city");
  if (enterCity.value) {
    dataCity.innerHTML = enterCity.value;
   //let apiKey = `acfa3d9add7c7b0dbbb8af556ed317bf`; 
   let apiKey= `f4cdbc9ef55eeb50f9d9349e9065d15a`;
    let city = enterCity.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    dataCity.innerHTML = null;
    alert(`Please enter a city!`);
  }
}
let search = document.querySelector("#search-city");
search.addEventListener("submit", searchCity);

function showWeather(response) {
  console.log(response);

  let city = response.data.name;
  let country = response.data.sys.country;
  let dataCity = document.querySelector("#city");
  dataCity.innerHTML = `${city}, ${country}`;

  let dataDegrees = document.querySelector("#tempr");
  let temperature = Math.round(response.data.main.temp);
  dataDegrees.innerHTML = `${temperature}`;

  let celsiusTempr = document.querySelector("#celcius-link");
  let fahrenheitTempr = document.querySelector("#fahrenheit-link");
  let celciusToFahrenheit = Math.round((temperature * 9) / 5 + 32);

  fahrenheitTempr.addEventListener("click", function () {
    dataDegrees.innerHTML = celciusToFahrenheit;
  });

  celsiusTempr.addEventListener("click", function () {
    dataDegrees.innerHTML = temperature;
  });

  let dataHumidity = document.querySelector("#data-humidity");
  let humidity = Math.round(response.data.main.humidity);
  dataHumidity.innerHTML = `${humidity}`;

  let dataWind = document.querySelector("#data-wind");
  let wind = Math.round(response.data.wind.speed);
  dataWind.innerHTML = `${wind}`;

}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
 // let apiKey = "acfa3d9add7c7b0dbbb8af556ed317bf";
  let apiKey= "f4cdbc9ef55eeb50f9d9349e9065d15a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function navigatorLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCity = document.querySelector("#current-location-button");
currentCity.addEventListener("click", navigatorLoc);
