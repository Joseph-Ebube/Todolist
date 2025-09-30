// This function runs when the page finishes loading
window.addEventListener('DOMContentLoaded', () => {
  // Get saved tasks from localStorage (or start with an empty list)
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Show each saved task on the page
  savedTasks.forEach(task => {
    showTask(task.text, task.completed);
  });
});

// When the "Add" button is clicked
document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim(); // Remove extra spaces

  // Only add if the input is not empty
  if (taskText !== '') {
    showTask(taskText, false); // Show task on the page
    saveTask(taskText, false); // Save task to localStorage
    input.value = ''; // Clear the input box
  }
});

// This function shows a task on the page
function showTask(taskText, isCompleted) {
  const list = document.getElementById('task-list');

  // Create list item
  const listItem = document.createElement('li');

  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isCompleted;

  // Create task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  if (isCompleted) taskSpan.classList.add('completed');

  // Create "Completed" label
  const statusLabel = document.createElement('span');
  statusLabel.textContent = isCompleted ? 'Completed' : '';
  statusLabel.classList.add('status-label');

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✕';
  deleteButton.addEventListener('click', () => {
    listItem.remove();
    deleteTask(taskText);
  });

  // Handle checkbox toggle
  checkbox.addEventListener('change', () => {
    const nowCompleted = checkbox.checked;
    taskSpan.classList.toggle('completed', nowCompleted);
    statusLabel.textContent = nowCompleted ? 'Completed' : '';
    updateTask(taskText, nowCompleted);
  });

  // Add elements to list item
  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(statusLabel);
  listItem.appendChild(deleteButton);
  list.appendChild(listItem);
}
// Save a new task to localStorage
function saveTask(text, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: text, completed: isCompleted });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete a task from localStorage
function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update a task's completed status in localStorage
function updateTask(text, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
    if (task.text === text) {
      return { text: task.text, completed: isCompleted };
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}