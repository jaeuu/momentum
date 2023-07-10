const API_KEY = "a9af3677088b724309cee320f10356a5";

function onGeoOk(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

var options = {
  // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
  // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다.
  enableHighAccuracy: true, // 대략적인 값이라도 상관 없음: 기본값
  // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자,
  // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
  maximumAge: 30000, // 5분이 지나기 전까지는 수정되지 않아도 됨
  // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
  // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
  timeout: 15000, // 15초 이상 기다리지 않는다.
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError, options);
