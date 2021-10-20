// catching the dom
const inputValue = document.querySelector(".input-search");
const inputButton = document.querySelector(".search-button");
const ipDisplay = document.querySelector(".ip-data");
const locationDisplay = document.querySelector(".location-data");
const timezoneDisplay = document.querySelector(".timezone-data");
const ispDisplay = document.querySelector(".isp-data");
// map
var mymap = L.map("mapid").setView([51.505, -0.09], 13);

// marker
var customIcons = L.icon({
  iconUrl: "../images/icon-location.svg",
  iconSize: [40, 50],
});
var markerOptions = {
  title: "MyLocation",
  clickable: true,
  draggable: true,
  icon: customIcons,
};

// tile
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 10,
}).addTo(mymap);
var marker = L.marker([51.505, -0.09], markerOptions);
marker.addTo(mymap);

// declaring variables
let data = {};
let val;

//api url
const url =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_BTAtH98gCdAcwqI1pswvGAqYemous&ipAddress=";

// fetching data
const getData = async () => {
  val = inputValue.value;
  const response = await fetch(`${url}${val}`);
  data = await response.json();
  return data;
};

async function displayMap() {
  const data = await getData();
  console.log(data);
  const { location } = data;
  mymap.setView([location.lat, location.lng], 13);
  marker.setLatLng([location.lat, location.lng]);
}

async function displayData() {
  const data = await getData();
  const { location, ip, isp } = data;
  console.log(data);
  ipDisplay.textContent = ip;
  locationDisplay.textContent = location.city;
  timezoneDisplay.textContent = `UTC ${location.timezone}`;
  ispDisplay.textContent = isp;
}
inputButton.addEventListener("click", displayData);

// function displayInfo() {

// }
