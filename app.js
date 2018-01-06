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
  // Add task event 
  form.addEventListener('submit', addTask);
  // Remove task event 
  taskList.addEventListener('click', removeTask);
  
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
  // Clear input 
  taskInput.value = '';
  
  e.preventDefault();  
}

// Remove task 
function removeTask(e) {
  // Click on remove icon removes li element
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

