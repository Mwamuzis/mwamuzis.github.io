// main.js

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

// Chart.js setup for task progress, with check for empty data
function setupProgressChart() {
  const tasks = getTasks();
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  const ctx = document.getElementById('progressChart').getContext('2d');
  new Chart(ctx, {
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

// Initialize chart after loading tasks
initializeTasks();
loadTasks();
setupProgressChart();
updateCodingTimeDisplay();
