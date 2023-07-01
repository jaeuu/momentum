const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  //form을 submit할때 입력값을 받아내는것이다.
  console.log(username);
}

loginForm.addEventListener("submit", onLoginSubmit);
