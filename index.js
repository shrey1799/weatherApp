let loc = document.querySelector("#location");
let temperature = document.querySelector("#temperature");
let desc = document.querySelector("#Desc");
let icon = document.querySelector("#Icon");
let long, latt;
window.addEventListener("load", getUserPosition);

function getUserPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latt = position.coords.latitude;
      long = position.coords.longitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}http://api.openweathermap.org/data/2.5/find?lat=${latt}&lon=${long}&cnt=10&appid=674bc8f22a7a9d9fbc5ff7f43e620b91`;
      
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          temperature.textContent = Math.round(
            data.list[0]["main"]["temp"] - 273
          );
          loc.textContent = data.list[0]["name"];
          desc.textContent = data.list[0]["weather"][0]["description"];
          console.log(data.cod);
          let code = data.cod;
          if (code < 300) {
            icon.src = "images/storm.svg";
          } else if (code >= 300 && code < 500) {
            icon.src = "images/drizzle.svg";
          } else if (code >= 500 && code < 600) {
            icon.src = "images/rain.svg";
          } else if (code >= 600 && code < 700) {
            icon.src = "images/snowflake.svg";
          } else if (code > 700 && code < 800) {
            icon.src = "images/atmosphere.svg";
          } else if (code == 800) {
            icon.src = "images/clear.svg";
          } else if (code > 800) {
            icon.src = "images/cloud.svg";
          }
        });
    });
  }
}
