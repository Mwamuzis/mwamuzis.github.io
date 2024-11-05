// Global variable to track the index of the task being edited
let currentTaskIndex = null;

// Calculate task duration in a human-readable format
function taskDurationTime(startTime, endTime) {
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);

    // Calculate the difference in milliseconds
    const durationMs = endTimeDate - startTimeDate;

    // Check if duration is negative (endTime is before startTime)
    if (durationMs < 0) return "Invalid time range";

    // Convert milliseconds to time components
    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    // Format the result as a string
    let durationString = "";
    if (days > 0) durationString += `${days}d `;
    if (hours > 0 || days > 0) durationString += `${hours}h `;
    durationString += `${minutes}m`;

    return durationString.trim(); // Remove any trailing spaces
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
            <td>${task.taskDuration || "N/A" }</td>
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
    currentTaskIndex = null; // Reset currentTaskIndex for adding a new task
    $('#taskModal').modal('show');
}

// Save a new or edited task
function saveTask() {
    const taskName = document.getElementById('taskName').value;
    const taskStatus = document.getElementById('taskStatus').value;
    const taskNotes = document.getElementById('taskNotes').value;
    const taskStartTime = document.getElementById('taskStartTime').value;
    const taskEndTime = document.getElementById('taskEndTime').value;
    const taskDuration = document.getElementById("taskDuration").value;

    if (!taskName) {
        alert("Task name is required.");
        return;
    }


    // calculate taskDuratio


    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (currentTaskIndex === null) {
        // Add a new task
        tasks.push({
            name: taskName,
            status: taskStatus,
            notes: taskNotes,
            startTime: taskStartTime,
            endTime: taskEndTime,
            duration: taskDurationTime()
        });
    } else {
        // Update the existing task
        tasks[currentTaskIndex] = {
            name: taskName,
            status: taskStatus,
            notes: taskNotes,
            startTime: taskStartTime,
            endTime: taskEndTime,
            duration: taskDurationTime()
        };
    }

    // Save updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    $('#taskModal').modal('hide');
    currentTaskIndex = null; // Reset currentTaskIndex after saving
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

    // Set the current task index and open the modal
    currentTaskIndex = index;
    $('#taskModal').modal('show');
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
