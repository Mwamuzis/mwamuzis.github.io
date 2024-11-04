// main.js
// main.js (continued)

// Chart.js setup for task progress
const ctx = document.getElementById('progressChart').getContext('2d');
const tasks = getTasks();
const completedTasks = tasks.filter(task => task.status === 'Done').length;
const progressChart = new Chart(ctx, {
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
