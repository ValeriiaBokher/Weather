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

function convertToF(event) {
	event.preventDefault();
	temperature = temperatureElement.innerHTML;
	temperature = Number(temperature);
	temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let temperatureElement = document.querySelector("#celsius");
let FLink = document.querySelector("#F-link");
FLink.addEventListener("click", convertToF);

function ShowResult(response) {
	document.querySelector("#local_city").innerHTML = `${response.data.name},`;
	document.querySelector("#country").innerHTML = response.data.sys.country;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#hum").innerHTML = response.data.main.humidity;
	document.querySelector("#weather").innerHTML =
		response.data.weather[0].main;
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	document.querySelector("#degree").innerHTML = `&deg;`;
}

function ShowPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let apiKey = "72f3b615abb8588c7d1dd2bab8c25a14";
	let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
	console.log(apiURL);
	axios.get(apiURL).then(ShowResult);
}
function Local(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(ShowPosition);
}
document.querySelector("#Position").addEventListener("click", Local);
