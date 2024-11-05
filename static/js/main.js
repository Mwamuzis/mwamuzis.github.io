// Load tasks from local storage
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
            <td>${task.duration || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// calculateDuration
function calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end.getTime() - start.getTime();
    return Math.floor(duration / (1000 * 60 * 60 * 24));
}


// Save a new or edited task
function saveTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskNotes = document.getElementById('taskNotes').value;
    const taskStartTime = document.getElementById('taskStartTime').value;
    const taskEndTime = document.getElementById('taskEndTime').value;

    // taskDuration = taskStartTime + taskEndTime
    const taskDuration = calculateDuration(taskStartTime, taskEndTime);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push({
        name: taskName,
        status: taskStatus,
        notes: taskNotes,
        startTime: taskStartTime,
        endTime: taskEndTime,
        duration: taskDuration,
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
    document.getElementById('taskDuration').value = task.duration;

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
$(document).ready(() => {
    loadTasks();
});
