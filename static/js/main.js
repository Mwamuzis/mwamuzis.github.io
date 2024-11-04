// main.js

// Define a password for admin actions (for demonstration, hardcoded here)
const ADMIN_PASSWORD = "StrongAdminPass123";

// Load tasks into checklist UI
function loadTasks() {
  const tasks = getTasks();
  const checklist = document.getElementById('projectChecklist');
  checklist.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = `list-group-item ${task.status === "Done" ? "list-group-item-success" : ""}`;
    taskItem.textContent = `${task.task} - ${task.status}`;
    taskItem.onclick = () => toggleTaskStatus(index);
    checklist.appendChild(taskItem);
  });
}

// Toggle task status between "Done" and "Not Started" and save to localStorage
function toggleTaskStatus(index) {
  const tasks = getTasks();
  tasks[index].status = tasks[index].status === "Done" ? "Not Started" : "Done";
  updateTask(index, tasks[index].status);
  loadTasks(); // Reload the UI after update
  setupProgressChart(); // Update the progress chart
}

// Retrieve tasks from local storage, return empty array if none found
function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Update task status in local storage
function updateTask(index, status) {
  const tasks = getTasks();
  tasks[index].status = status;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize tasks in local storage if not present
function initializeTasks() {
  if (!localStorage.getItem('tasks')) {
    const sampleTasks = [
      { task: "Initialize Express App", status: "Not Started" },
      { task: "Setup MySQL Connection", status: "Not Started" },
      { task: "Configure Sequelize", status: "Not Started" },
      { task: "Create User model", status: "Not Started" },
      { task: "Create Product model", status: "Not Started" },
      { task: "Deploy project", status: "Not Started" },
    ];
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
  }
}

// Chart.js setup for task progress, with check for empty data
function setupProgressChart() {
  const tasks = getTasks();
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  const ctx = document.getElementById('progressChart').getContext('2d');
  if (window.progressChart) {
    window.progressChart.destroy(); // Destroy previous chart if exists
  }

  window.progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        data: [completedTasks, tasks.length - completedTasks],
        backgroundColor: ['#28a745', '#dc3545']
      }]
    },
    options: {
      responsive: true
    }
  });
}

// Coding time tracker variables
let codingStartTime;
let codingInterval;

// Function to start coding time tracking
function startCoding() {
  codingStartTime = Date.now();
  localStorage.setItem('codingStartTime', codingStartTime);
  codingInterval = setInterval(updateCodingTimeDisplay, 60000); // Update every minute
}

// Function to stop coding time tracking
function stopCoding() {
  if (codingStartTime) {
    const codingTime = Date.now() - codingStartTime;
    let totalCodingTime = parseInt(localStorage.getItem('totalCodingTime') || '0', 10);
    totalCodingTime += codingTime;
    localStorage.setItem('totalCodingTime', totalCodingTime);
    clearInterval(codingInterval);
    updateCodingTimeDisplay();
    codingStartTime = null;
    localStorage.removeItem('codingStartTime');
  }
}

// Function to update coding time display
function updateCodingTimeDisplay() {
  const totalCodingTime = parseInt(localStorage.getItem('totalCodingTime') || '0', 10);
  const hours = Math.floor(totalCodingTime / (1000 * 60 * 60));
  document.getElementById('codingTime').querySelector('span').textContent = hours;
}

// Function to show the password modal for admin actions
function requestPassword(callback) {
  $('#passwordModal').modal('show');

  document.getElementById('confirmPassword').onclick = () => {
    const enteredPassword = document.getElementById('adminPassword').value;
    if (enteredPassword === ADMIN_PASSWORD) {
      $('#passwordModal').modal('hide');
      document.getElementById('passwordError').style.display = 'none';
      callback();
    } else {
      document.getElementById('passwordError').style.display = 'block';
    }
  };
}

// Protected function to clear all local storage data
function clearLocalStorage() {
  requestPassword(() => {
    localStorage.clear();
    alert("All data has been cleared.");
    initializeTasks();  // Reset sample tasks in local storage
    loadTasks();  // Reloads the tasks to reset the view
    setupProgressChart();  // Reinitialize the progress chart with fresh data
    updateCodingTimeDisplay();  // Reset coding time display
  });
}

// Initialize tasks, set up progress chart, and coding time display
initializeTasks();
loadTasks();
setupProgressChart();
updateCodingTimeDisplay();

// Attach start and stop timer functions to buttons
document.getElementById('startTimer').onclick = startCoding;
document.getElementById('stopTimer').onclick = stopCoding;

// Attach the clearLocalStorage function to the clear button
document.getElementById('clearDataButton').onclick = clearLocalStorage;
