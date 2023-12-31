const API_KEY = "a9af3677088b724309cee320f10356a5"; /*  weather api */

function onGeoOk(position) {
  const lat = position.coords.latitude; /* 위도 */
  const lon = position.coords.longitude; /* 경도 */
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
    });
  /* fetch(url).then()을 통해 fetch를 이용해서 url을 요청해서 받아온 후의 동작을 표현한다. */
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
