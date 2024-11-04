// chartManager.js
import { getTasks } from './taskManager.js';

export function setupProgressChart() {
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
