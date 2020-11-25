// status (상태정보 담고있는 변수)
let todos = []; // 서버에서 데이터를 받아와서 저장할 배열

// DOM
const $todos = document.querySelector('.todos');

// Functions
const fetchTodos = () => [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const render = () => todos.map(todo => `<li class="todos-item">
      <input id ="${todo.id}" type="checkbox" class="todos-completed" ${todo.completed ? 'checked' : ''}/>
      <label for="${todo.id}" class="todos-content">${todo.content}</label>
      <button class="todos-remove">x</button>
    </li>`).join('');

// Events
document.addEventListener('DOMContentLoaded', () => {
  todos = fetchTodos(); // 서버에 있는 todos 데이터를 todos행렬에 담아주는 함수 실행
  $todos.innerHTML = render(); // todos 배열에 있는 데이터를 토대로 렌더링을 해주는 함수를 실행
});
