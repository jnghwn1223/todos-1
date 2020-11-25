// status (상태정보 담고있는 변수)
let todos = []; // 서버에서 데이터를 받아와서 저장할 배열
let status = 'all'; // 리스트 보기 기본상태 all 저장,
let _todos = [];

// DOM
const $todos = document.querySelector('.todos'); // ul요소, dom api 이용해서 변수에 저장
const $inputTodos = document.querySelector('.input-todos');
const $btnTodos = document.querySelector('.btn-todos');
const $statusContainer = document.querySelector('.status-container');

// Functions
const fetchTodos = () => [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const changeStatusTodos = () => {
  if (status === 'all') _todos = todos;
  else if (status === 'active') _todos = todos.filter(todo => !todo.completed);
  else _todos = todos.filter(todo => todo.completed);
};

const render = () => _todos.map(todo => `<li class="todos-item">
    <input id ="${todo.id}" type="checkbox" class="todos-completed" ${todo.completed ? 'checked' : ''}/>
    <label for="${todo.id}" class="todos-content">${todo.content}</label>
    <button class="todos-remove ${todo.id}">x</button>
  </li>`).join('');

const generateNewId = () => { // 새로운 id값을 생성해주는 함수
  const todosId = todos.map(todo => todo.id);
  return todos.length ? Math.max(...todosId) + 1 : 0;  //math.max안에 ...todosId를 하면 배열의 대괄호를 빼줌
};

const updateTodos = () => {
  const newTodo = { id: generateNewId(), content: $inputTodos.value, completed: false };
  todos = [newTodo, ...todos]; // todos 배열에 새로운 todo 요소 추가 , todos 업데이트
};

// Events
document.addEventListener('DOMContentLoaded', () => {
  todos = fetchTodos(); // 서버에 있는 todos 데이터를 todos행렬에 담아주는 함수 실행
  changeStatusTodos();
  $todos.innerHTML = render(); // todos 배열에 있는 데이터를 토대로 렌더링을 해주는 함수를 실행
});

$inputTodos.onkeyup = e => {
  if (e.key !== 'Enter' || !$inputTodos.value) return;

  updateTodos();
  changeStatusTodos();
  $todos.innerHTML = render(); // 새롭게 추가된 todos를 토대로 render 다시 하기.
  $inputTodos.value = '';
};

$btnTodos.onclick = () => {  //새로운 todo 추가하기
  if (!$inputTodos.value) return;

  updateTodos();
  changeStatusTodos();
  $todos.innerHTML = render(); // 새롭게 추가된 todos를 토대로 render 다시 하기.
  $inputTodos.value = '';
};

$todos.onclick = e => { // 삭제 버튼 누르면 삭제 시키는 이벤트
  if (!e.target.matches('.todos-remove')) return;

  // todo.id와 e.target의 클래스 중에서 두 번째 클래스의 값을 비교해서
  // 현재 눌린 e.target이 todos의 어떤 요소인지 확인후, 일치하는 값만 제외시켜서
  // todos 배열에 재할당 한다.
  todos = todos.filter(todo => +todo.id !== +e.target.classList[1]);
  changeStatusTodos();
  $todos.innerHTML = render();
};

$todos.oninput = e => {
  console.log(e.target);
  todos.forEach(todo => {
    if (+e.target.id === +todo.id) todo.completed = e.target.checked;
  });
  changeStatusTodos();
  $todos.innerHTML = render();
};

$statusContainer.onclick = e => {
  if (!e.target.matches('.status-item')) return;

  status = e.target.classList[1];

  document.querySelector('.selected').classList.remove('selected');
  e.target.classList.add('selected');

  changeStatusTodos();
  $todos.innerHTML = render();
};
