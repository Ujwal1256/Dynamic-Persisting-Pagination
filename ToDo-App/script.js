const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const todosPerPage = 10;

const todoContainer = document.getElementById('todo-container');
const paginationContainer = document.getElementById('pagination-container');

// Function to fetch todos with pagination logic
async function fetchTodos(page = 1) {
  try {
    const response = await fetch(TODOS_API);
    const todos = await response.json();

    const start = (page - 1) * todosPerPage;
    const paginatedTodos = todos.slice(start, start + todosPerPage);

    displayTodos(paginatedTodos);
    createPaginationButtons(todos.length, page);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
}

// Function to display todos in the DOM
function displayTodos(todos) {
  todoContainer.innerHTML = ''; // Clear previous todos
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.textContent = `${todo.id}. ${todo.title} - ${todo.completed ? '✅' : '❌'}`;
    todoContainer.appendChild(div);
  });
}

// Function to create and display pagination buttons
function createPaginationButtons(totalItems, currentPage) {
  paginationContainer.innerHTML = ''; // Clear previous buttons
  const pageCount = Math.ceil(totalItems / todosPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;

    btn.addEventListener('click', () => fetchTodos(i));
    paginationContainer.appendChild(btn);
  }
}

// Initial fetch
fetchTodos();
