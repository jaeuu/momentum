const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  /* 클릭한 li의 id를 가지고 있는 todo를 지운다 */
  /* li.id는 string타입이고 toDo.id는 number타입이므로 형 변환을 해준다. */
  saveToDos();
  /* localStorage에 있는 toDos를 업데이트 */
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id; /* 각각의 todo를 구별하기 위한 id */
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "⛔";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    /* 각각의 todo를 구별하기 위한 id */
  };
  toDos.push(newTodoObj); /* array에 item을 추가 */
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  /* 화면을 새로고침하더라도 localStorage에 있는 기존의 값을 불러올수있다. */
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
