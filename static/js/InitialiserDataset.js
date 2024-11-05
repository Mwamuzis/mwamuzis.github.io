const sampleTasks = [
    {
        name: "Initialize Express App",
        status: "Completed",
        notes: "Ran 'npm run dev' to start development server",
        startTime: "2023-11-01T09:00", // ISO date format for datetime-local input compatibility
        endTime: "2023-11-01T10:00"
    },
    {
        name: "Configure MySQL Connection",
        status: "In Progress",
        notes: "Connected to MySQL using Sequelize ORM",
        startTime: "2023-11-02T11:00",
        endTime: "" // Empty end time since the task is still in progress
    }
];

// Check if local storage is empty before initializing
if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
}

// Load tasks from local storage when page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.status}</td>
            <td>${task.notes}</td>
            <td>${task.startTime || 'N/A'}</td>
            <td>${task.endTime || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);
