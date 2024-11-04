// chartManager.js
import { getTasks } from './taskManager.js';

export function setupProgressChart() {
  const tasks = getTasks();
  const completedTasks = tasks.filter(task => task.status === 'Done').length;

  const ctx = document.getElementById('progressChart').getContext('2d');

  // Check if window.progressChart exists and is an instance of Chart before destroying it
  if (window.progressChart instanceof Chart) {
    window.progressChart.destroy();
  }

  // Create a new Chart instance and assign it to window.progressChart
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
