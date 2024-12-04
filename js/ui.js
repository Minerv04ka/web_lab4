import { TaskManager } from './logic.js';

const taskInput = document.getElementById('new-task');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');
const stats = {
  total: document.getElementById('total-tasks'),
  completed: document.getElementById('completed-tasks'),
  pending: document.getElementById('pending-tasks'),
};

const renderTasks = (filter = 'all') => {
  taskList.innerHTML = '';
  const tasks = TaskManager.filterTasks(filter);

  tasks.forEach((taskObj, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = `task ${taskObj.completed ? 'completed' : ''}`;
    taskItem.draggable = true;

    taskItem.innerHTML = `
      <span>${taskObj.task} <small>(${taskObj.category}, ${taskObj.priority})</small></span>
      <div>
        <button class="edit-btn">Edit</button>
        <button class="complete-btn">${taskObj.completed ? 'Undo' : 'Done'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Event Listeners for buttons
    taskItem.querySelector('.edit-btn').addEventListener('click', () => {
      const newTask = prompt('Edit Task', taskObj.task);
      if (newTask) TaskManager.editTask(index, newTask);
      renderTasks(filter);
    });

    taskItem.querySelector('.complete-btn').addEventListener('click', () => {
      TaskManager.toggleTask(index);
      renderTasks(filter);
    });

    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
      TaskManager.deleteTask(index);
      renderTasks(filter);
    });

    taskList.appendChild(taskItem);
  });

  updateStats();
};

const updateStats = () => {
  const tasks = TaskManager.getTasks();
  stats.total.textContent = tasks.length;
  stats.completed.textContent = tasks.filter((t) => t.completed).length;
  stats.pending.textContent = tasks.filter((t) => !t.completed).length;
};

// Filter Buttons
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    renderTasks(btn.id.replace('filter-', ''));
  });
});

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;

  if (!taskText) {
    alert('Task cannot be empty!');
    return;
  }

  TaskManager.addTask(taskText, category, priority);
  taskInput.value = '';
  renderTasks();
});

// Initial Render
window.addEventListener('load', () => renderTasks());
