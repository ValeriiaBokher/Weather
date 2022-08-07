let today = new Date();
let thisDay = document.querySelector("#this_day");
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let thisday = days[today.getDay()];
thisDay.innerHTML = `${thisday}`;

let thisDate = document.querySelector("#date_today");
let date = today.getDate();
let month = String(today.getMonth() + 1).padStart(2, "0");

let year = today.getFullYear();
thisDate.innerHTML = `${date}.${month}.${year}`;

let Time = document.querySelector("#time");
let hour = today.getHours();
let minutes = String(today.getMinutes()).padStart(2, "0");
Time.innerHTML = `${hour}:${minutes}`;

function search(event) {
	event.preventDefault();
	let writecity = document.querySelector("#city");
	let apiKey = "72f3b615abb8588c7d1dd2bab8c25a14";
	let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${writecity.value}&appid=${apiKey}&units=metric`;
	axios.get(apiURL).then(ShowResult);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function getForecast(coordinates) {
	let apiKey = "72f3b615abb8588c7d1dd2bab8c25a14";
	let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	//console.log(apiURL);
	axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return days[day];
}

function formatDate(timestamp) {
	let date = new Date(timestamp * 1000);
	//console.log(date);
	let data = date.getDate();
	let month = String(date.getMonth() + 1).padStart(2, "0");
	let year = date.getFullYear();
	return `${data}.${month}.${year}`;
}

function displayForecast(response) {
	console.log(response.data.daily);

	let forecast = response.data.daily;
	let temperatureElement2 = document.querySelector("#celsius_night");
	celsiusTemperature2 = response.data.daily[0].temp.night;
	temperatureElement2.innerHTML = Math.round(celsiusTemperature2);
	let temperatureElement = document.querySelector("#celsius");
	celsiusTemperature = response.data.daily[0].temp.day;
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
	document.querySelector("#degree").innerHTML = `&deg;`;

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`GIF/Linear/${response.data.daily[0].weather[0].icon}.gif`
	);

	document.querySelector("#weather").innerHTML =
		response.data.daily[0].weather[0].main;

	let f2 = '<div class="next-days">';
	forecast.forEach(function (forecastDay, index) {
		if (index < 6 && index > 0) {
			``;
			f2 =
				f2 +
				`<div class="row n">
			<div class="col-md-2 week">
				<span id="day4">${formatDay(forecastDay.dt)}</span><br /><span
					id="date4"
					>${formatDate(forecastDay.dt)}</span
				>
			</div>
			<div class="col-md-6">
				<img
					class="image-next"
					src="GIF/Linear/${forecastDay.weather[0].icon}.gif"
				/>
			</div>
			<div class="col-md-2 day">
				<span class="celsius next-temp-day">${Math.round(
					forecastDay.temp.day
				)}</span>&deg;
			</div>
			<div class="col-md-1 night">
				<span class="celsius next-temp-night">${Math.round(
					forecastDay.temp.night
				)}</span>&deg;
			</div>
		</div>`;
		}
	});
	f2 = f2 + "</div>";
	document.querySelector("#forecast").innerHTML = f2;
}

function ShowResult(response) {
	//console.log(response.data);
	document.querySelector("#local_city").innerHTML = `${response.data.name},`;
	document.querySelector("#country").innerHTML = response.data.sys.country;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#hum").innerHTML = response.data.main.humidity;
	getForecast(response.data.coord);
	let First = document.querySelector("#First");
	First.classList.remove("first-active");
}

function ShowPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "72f3b615abb8588c7d1dd2bab8c25a14";
	let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	axios.get(apiURL).then(ShowResult);
}
function Local(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(ShowPosition);
}
document.querySelector("#Position").addEventListener("click", Local);

function convertToF(event) {
	event.preventDefault();
	let buttonF = document.querySelector(".button-F");
	buttonF.disabled = true;
	let buttonC = document.querySelector(".button-C");
	buttonC.disabled = false;
	CLink.classList.remove("active");
	FLink.classList.add("active");

	let temperatureElement = document.querySelector("#celsius");
	let fahrenheiTemp = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheiTemp);

	let temperatureElement2 = document.querySelector("#celsius_night");
	let fahrenheiTemp2 = (celsiusTemperature2 * 9) / 5 + 32;
	temperatureElement2.innerHTML = Math.round(fahrenheiTemp2);

	let tempDays = document.querySelectorAll(".next-temp-day");
	let tempNights = document.querySelectorAll(".next-temp-night");
	tempDays.forEach(function (day) {
		day.innerText = C2F(day.innerText);
	});
	tempNights.forEach(function (night) {
		night.innerText = C2F(night.innerText);
	});
}

function C2F(degree) {
	return Math.round((degree * 9) / 5 + 32);
}

function convertToC(event) {
	event.preventDefault();
	CLink.classList.add("active");
	FLink.classList.remove("active");
	let buttonF = document.querySelector(".button-F");
	buttonF.disabled = false;
	let buttonC = document.querySelector(".button-C");
	buttonC.disabled = true;

	let temperatureElement = document.querySelector("#celsius");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);

	let temperatureElement2 = document.querySelector("#celsius_night");
	temperatureElement2.innerHTML = Math.round(celsiusTemperature2);

	let tempDays = document.querySelectorAll(".next-temp-day");
	let tempNights = document.querySelectorAll(".next-temp-night");
	tempDays.forEach(function (day) {
		day.innerText = F2C(day.innerText);
	});
	tempNights.forEach(function (night) {
		night.innerText = F2C(night.innerText);
	});
}
function F2C(degree) {
	return Math.round((degree - 32) / 1.8);
}
celsiusTemperature = null;
celsiusTemperature2 = null;
let FLink = document.querySelector("#F-link");
FLink.addEventListener("click", convertToF);

let CLink = document.querySelector("#C-link");
CLink.addEventListener("click", convertToC);
