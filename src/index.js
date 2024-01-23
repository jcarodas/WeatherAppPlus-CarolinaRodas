function updateWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let newTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#dateAndTime");
  let currentDate = new Date(response.data.time * 1000);
  console.log(response);

  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  timeElement.innerHTML = formatDate(currentDate);
  temperatureElement.innerHTML = Math.round(newTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2f841tfa2a2f0faob14b1085393c7be0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function SearchSubmit(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");

  searchCity(searchFormInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", SearchSubmit);

searchCity("Berlin");
