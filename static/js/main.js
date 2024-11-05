// Load tasks from local storage
const sampleTasks = [
    {
        name: "Initialize Express App",
        status: "Completed",
        notes: "Ran 'npm run dev' to start development server",
        startTime: "2023-11-01T09:00", 
    },
    {
        name: "Configure MySQL Connection",
        status: "In Progress",
        notes: "Connected to MySQL using Sequelize ORM",
        startTime: "2023-11-02T11:00",
        endTime: "" 
    }
];




// set localStorage
if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
}


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
            ${task.taskDuration || "N/A" }
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Save a new or edited task
function saveTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskNotes = document.getElementById('taskNotes').value;
    const taskStartTime = document.getElementById('taskStartTime').value;
    const taskEndTime = document.getElementById('taskEndTime').value;
    const taskDuration = taskEndTime && taskStartTime? new Date(taskEndTime) - new Date(taskStartTime) : "N/A";

    const tasks = JSON.parse(localStorage.getItem('tasks')) || sampleTasks;

    tasks.push({
        name: taskName,
        status: taskStatus,
        notes: taskNotes,
        startTime: taskStartTime,
        endTime: taskEndTime,
        taskDuration
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    $('#taskModal').modal('hide');
}

// Edit an existing task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];

    document.getElementById('taskName').value = task.name;
    document.getElementById('taskStatus').value = task.status;
    document.getElementById('taskNotes').value = task.notes;
    document.getElementById('taskStartTime').value = task.startTime;
    document.getElementById('taskEndTime').value = task.endTime;
    document.getElementById('taskDuration').innerText = task.taskDuration;

    $('#taskModal').modal('show');
}

// Delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Initialize
$(document).ready(function () {
    loadTasks();
});
