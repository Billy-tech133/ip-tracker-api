// catching the dom
const inputValue = document.querySelector(".input-search");
const inputButton = document.querySelector(".search-button");
const ipDisplay = document.querySelector(".ip-data");
const locationDisplay = document.querySelector(".location-data");
const timezoneDisplay = document.querySelector(".timezone-data");
const ispDisplay = document.querySelector(".isp-data");
// map
var mymap = L.map("mapid").setView([34.04915, -118.09462], 13);

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
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
}).addTo(mymap);
var marker = L.marker([34.04915, -118.09462], markerOptions);
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

// map functionality
async function displayMap() {
  const data = await getData();
  console.log(data);
  const { location } = data;
  mymap.setView([location.lat, location.lng], 13);
  marker.setLatLng([location.lat, location.lng]);
}

// displaying data
async function displayData() {
  const data = await getData();
  const { location, ip, isp } = data;
  console.log(data);
  ipDisplay.textContent = ip;
  locationDisplay.textContent = `${location.city}, ${location.region}`;
  timezoneDisplay.textContent = `UTC ${location.timezone}`;
  ispDisplay.textContent = isp;
}

// execute function
function execute() {
  displayData();
  displayMap();
}
inputButton.addEventListener("click", execute);
