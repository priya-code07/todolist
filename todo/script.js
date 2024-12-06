document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const pendingTasks = document.getElementById('pending-tasks');
  
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    const renderTodos = (filter = 'all') => {
      todoList.innerHTML = '';
      let filteredTodos = todos;
  
      if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
      } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
      }
  
      filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
          <span class="todo-text" onclick="toggleComplete(${index})">${todo.text}</span>
          <button class="delete-button" onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
      });
  
      updateStatistics();
    };
  
    const updateStatistics = () => {
      const total = todos.length;
      const completed = todos.filter(todo => todo.completed).length;
      const pending = total - completed;
  
      totalTasks.textContent = total;
      completedTasks.textContent = completed;
      pendingTasks.textContent = pending;
    };
  
    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
    window.toggleComplete = (index) => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    };
  
    window.deleteTodo = (index) => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };
  
    addButton.addEventListener('click', () => {
      const text = todoInput.value.trim();
      if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
      } else 
      {
        alert('Please enter a task.');
      }
    });
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTodos(button.getAttribute('data-filter'));
      });
    });
  
    renderTodos();
  });
  