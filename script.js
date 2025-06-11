const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent toggling complete
    li.remove();
    updateStorage();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = getStoredTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getStoredTasks();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateStorage() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getStoredTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
