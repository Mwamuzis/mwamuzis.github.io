function updateChart() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;

    const ctx = document.getElementById('progressChart').getContext('2d');
    document.getElementById('progressPercentage').innerText = `Progress: ${progress.toFixed(2)}%`;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Incomplete'],
            datasets: [{
                data: [completedTasks, totalTasks - completedTasks],
                backgroundColor: ['#4CAF50', '#f44336'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}
