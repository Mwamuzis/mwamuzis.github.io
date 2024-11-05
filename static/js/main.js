// Sample tasks to initialize local storage
const sampleTasks = [
    {
        name: "Initialize Express App",
        status: "Completed",
        notes: "Ran 'npm run dev' to start development server",
        startTime: "2023-11-01T09:00",
        endTime: "2023-11-01T10:00"
    },
    {
        name: "Configure MySQL Connection",
        status: "In Progress",
        notes: "Connected to MySQL using Sequelize ORM",
        startTime: "2023-11-02T11:00",
        endTime: ""
    }
];

// Initialize local storage with sample tasks if empty
if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
}

// Load tasks from local storage and display them in the table
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td><span class="status-badge ${getStatusClass(task.status)}">${task.status}</span></td>
            <td>${task.notes}</td>
            <td>${task.startTime || 'N/A'}</td>
            <td>${task.endTime || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    updateChart();
}

// Function to get CSS class based on task status
function getStatusClass(status) {
    switch (status) {
        case 'Not Started':
            return 'status-not-started';
        case 'In Progress':
            return 'status-in-progress';
        case 'Completed':
            return 'status-completed';
        default:
            return '';
    }
}

// Open modal to add a new task or edit an existing one
function openModal() {
    document.getElementById('taskForm').reset(); // Clear form
    $('#taskModal').modal('show');
}

// Save a new or edited task
function saveTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskNotes = document.getElementById('taskNotes').value;
    const taskStartTime = document.getElementById('taskStartTime').value;
    const taskEndTime = document.getElementById('taskEndTime').value;

    if (!taskName) {
        alert("Task name is required.");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({
        name: taskName,
        status: taskStatus,
        notes: taskNotes,
        startTime: taskStartTime,
        endTime: taskEndTime,
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    $('#taskModal').modal('hide');
}

// Edit an existing task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];

    // Populate form fields with task data
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskStatus').value = task.status;
    document.getElementById('taskNotes').value = task.notes;
    document.getElementById('taskStartTime').value = task.startTime;
    document.getElementById('taskEndTime').value = task.endTime;

    // Save changes
    $('#taskModal').modal('show');

    // Override saveTask function temporarily for updating
    document.querySelector('.btn-custom').onclick = function() {
        updateTask(index);
    };
}

// Update task in local storage after editing
function updateTask(index) {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskNotes = document.getElementById('taskNotes').value;
    const taskStartTime = document.getElementById('taskStartTime').value;
    const taskEndTime = document.getElementById('taskEndTime').value;

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[index] = {
        name: taskName,
        status: taskStatus,
        notes: taskNotes,
        startTime: taskStartTime,
        endTime: taskEndTime,
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    $('#taskModal').modal('hide');

    // Reset save button function
    document.querySelector('.btn-custom').onclick = saveTask;
}

// Delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Update the progress chart
function updateChart() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    const notStartedTasks = totalTasks - completedTasks - inProgressTasks;

    const ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [completedTasks, inProgressTasks, notStartedTasks],
                backgroundColor: ['#4CAF50', '#ff9800', '#f44336'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Load tasks and initialize chart on page load
document.addEventListener("DOMContentLoaded", loadTasks);
