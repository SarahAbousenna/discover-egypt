/* -------------------------- WEATHER  ------------------------------- */

//*****---- ⚠️ FUNCTION: Display Current Date and Time ----*****//

function dateTime(currDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = currDate.getDate();
  let month = months[currDate.getMonth()];
  let day = days[currDate.getDay()];
  let hours = currDate.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = currDate.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  return `<i class="fa-solid fa-calendar-days"></i>  ${day}, ${month} ${date}  <i class="fas fa-clock"></i> ${hours}:${minutes}`;
}

// ➡️ Changes the date (day) format of the API to an actual day of the week for weekly forcast function

function formateDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

//*****---- ⚠️ FUNCTION: Display Current City Temprature + Weather Details ----*****//

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-weather");
  let cityElement = document.querySelector("#currentcity");
  let countryElement = document.querySelector("#currentcountry");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#curr-weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  iconElement.setAttribute(
    "src",
    `./src/icons/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//*****---- ⚠️ FUNCTION: Convert Celsius to Fahrenheite ----*****//

function displayFahrenhiteDegree(event) {
  event.preventDefault();
  let fahrenhiteTemp = (celsiusTemperature * 9) / 5 + 32;
  // remove active class from celcuis
  celsiusLink.classList.remove("active");
  // add active class to fahrenhite
  fahrenhiteLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-weather");
  temperatureElement.innerHTML = Math.round(fahrenhiteTemp);
}

function displaycelsiusDegree(event) {
  event.preventDefault;
  // add active class to celcuis
  celsiusLink.classList.add("active");
  // remove active class from fahrenhite
  fahrenhiteLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-weather");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function callApi() {
  let apiKey = "e2111c640cdd9740bb6b7a385ddbde05";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  console.log(apiUrl);
}

// 🌎 GLOBAL VARIABLES 🌎 //

let existingDate = document.querySelector("#curr-date");
let currDate = new Date();
existingDate.innerHTML = dateTime(currDate);

let celsiusTemperature = null;

let fahrenhiteLink = document.querySelector("#fahrenheit-degree");
fahrenhiteLink.addEventListener("click", displayFahrenhiteDegree);

let celsiusLink = document.querySelector("#celsius-degree");
celsiusLink.addEventListener("click", displaycelsiusDegree);

// ☎️ FUNCTION CALLING ☎️ //

callApi();
