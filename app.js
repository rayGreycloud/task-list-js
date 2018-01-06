// UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call event listener loader 
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event 
  form.addEventListener('submit', addTask);
  // Remove task event 
  taskList.addEventListener('click', removeTask);
  // Clear task events 
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event 
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from localStorage
function getTasks() {
  // Initialize 
  let tasks;
  
  // check if tasks already stored
  if (localStorage.getItem('tasks') === null) {
    // if not set to empty array
    tasks = [];
  } else {
    // set to contents of localStorage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task) {
    // Create li 
    const li = document.createElement('li');
    // Add class 
    li.className = 'collection-item';
    // Create text node and append 
    li.appendChild(document.createTextNode(task));
    // Create new link element 
    const link = document.createElement('a');
    // Add classes 
    link.className = 'delete-item secondary-content';
    // Add icon html 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li 
    li.appendChild(link);
    // Append li to ul 
    taskList.appendChild(li);
    
  });  
}

// Add task 
function addTask(e) {
  // Check for input value
  if (taskInput.value === '') {
    alert('Add a task');
  }
  // Create li 
  const li = document.createElement('li');
  // Add class 
  li.className = 'collection-item';
  // Create text node and append 
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element 
  const link = document.createElement('a');
  // Add classes 
  link.className = 'delete-item secondary-content';
  // Add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li 
  li.appendChild(link);
  // Append li to ul 
  taskList.appendChild(li);
  
  // Store task 
  storeTaskLocalStorage(taskInput.value);
  
  // Clear input 
  taskInput.value = '';
  
  e.preventDefault();  
}

// Store task in localSorage 
function storeTaskLocalStorage(task) {
  // Initialize 
  let tasks;
  
  // check if tasks already stored
  if (localStorage.getItem('tasks') === null) {
    // if not set to empty array
    tasks = [];
  } else {
    // set to contents of localStorage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // Push new task onto array
  tasks.push(task);
  // Store new array in localStorage 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task 
function removeTask(e) {
  // Click on remove icon removes li element
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Confirm deletion of task')) {
      e.target.parentElement.parentElement.remove();
      
      // Remove from localStorage 
      removeTaskLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from localStorage 
function removeTaskLocalStorage(taskItem) {
  // Retrieve tasks from localStorage
  tasks = JSON.parse(localStorage.getItem('tasks'));
  // Iterate over tasks
  tasks.forEach(function(task, index) {
    // if stored item matches, remove it from array
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  
  // Store new array in localStorage 
  localStorage.setItem('tasks', JSON.stringify(tasks));  
}

// Clear all tasks 
function clearTasks() {
  if (confirm('Confirm deletion of all tasks')){
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  
  // Clear all tasks from localStorage 
  clearTasksLocalStorage();
}

// Clear tasks from localStorage 
function clearTasksLocalStorage() {
  localStorage.clear();
}

// Filter tasks 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}

