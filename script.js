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

function ND() {
	let nd1 = new Date();
	nd1.setDate(nd1.getDate() + 1);
	let date1 = nd1.getDate();
	let month1 = String(nd1.getMonth() + 1).padStart(2, "0");
	let year1 = nd1.getFullYear();

	let nd2 = new Date();
	nd2.setDate(nd2.getDate() + 2);
	let date2 = nd2.getDate();
	let month2 = String(nd2.getMonth() + 1).padStart(2, "0");
	let year2 = nd2.getFullYear();

	let nd3 = new Date();
	nd3.setDate(nd3.getDate() + 3);
	let date3 = nd3.getDate();
	let month3 = String(nd3.getMonth() + 1).padStart(2, "0");
	let year3 = nd3.getFullYear();

	let nd4 = new Date();
	nd4.setDate(nd4.getDate() + 4);
	let date4 = nd4.getDate();
	let month4 = String(nd4.getMonth() + 1).padStart(2, "0");
	let year4 = nd4.getFullYear();

	let nd5 = new Date();
	nd5.setDate(nd5.getDate() + 5);
	let date5 = nd5.getDate();
	let month5 = String(nd5.getMonth() + 1).padStart(2, "0");
	let year5 = nd5.getFullYear();

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	document.querySelector("#day1").innerHTML = days[nd1.getDay()];
	document.querySelector("#day2").innerHTML = days[nd2.getDay()];
	document.querySelector("#day3").innerHTML = days[nd3.getDay()];
	document.querySelector("#day4").innerHTML = days[nd4.getDay()];
	document.querySelector("#day5").innerHTML = days[nd5.getDay()];

	document.querySelector("#date1").innerHTML = `${date1}.${month1}.${year1}`;
	document.querySelector("#date2").innerHTML = `${date2}.${month2}.${year2}`;
	document.querySelector("#date3").innerHTML = `${date3}.${month3}.${year3}`;
	document.querySelector("#date4").innerHTML = `${date4}.${month4}.${year4}`;
	document.querySelector("#date5").innerHTML = `${date5}.${month5}.${year5}`;
}
ND();

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
	console.log(apiURL);
	axios.get(apiURL).then(SR);
}

function SR(response) {
	console.log(response.data.daily);
}

function ShowResult(response) {
	console.log(response.data);
	document.querySelector("#local_city").innerHTML = `${response.data.name},`;
	document.querySelector("#country").innerHTML = response.data.sys.country;
	document.querySelector("#wind").innerHTML = Math.round(
		response.data.wind.speed
	);
	document.querySelector("#hum").innerHTML = response.data.main.humidity;
	document.querySelector("#weather").innerHTML =
		response.data.weather[0].main;
	let temperatureElement = document.querySelector("#celsius");
	celsiusTemperature = response.data.main.temp;
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
	document.querySelector("#degree").innerHTML = `&deg;`;
	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`GIF/Linear/${response.data.weather[0].icon}.gif`
	);
	getForecast(response.data.coord);
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
	CLink.classList.remove("active");
	FLink.classList.add("active");
	let temperatureElement = document.querySelector("#celsius");
	let fahrenheiTemp = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheiTemp);
}

function convertToC(event) {
	event.preventDefault();
	CLink.classList.add("active");
	FLink.classList.remove("active");
	let temperatureElement = document.querySelector("#celsius");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;
let FLink = document.querySelector("#F-link");
FLink.addEventListener("click", convertToF);

let CLink = document.querySelector("#C-link");
CLink.addEventListener("click", convertToC);
