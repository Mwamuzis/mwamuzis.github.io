// taskManager.js

// Retrieve tasks from local storage, return empty array if none found
export function getTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Initialize tasks in local storage if not present
export function initializeTasks() {
  if (!localStorage.getItem('tasks')) {
    const sampleTasks = [
      { task: "Initialize Express App", status: "Not Started", note: "" },
      { task: "Setup MySQL Connection", status: "Not Started", note: "" },
      { task: "Configure Sequelize", status: "Not Started", note: "" },
      { task: "Create User model", status: "Not Started", note: "" },
      { task: "Create Product model", status: "Not Started", note: "" },
      { task: "Deploy project", status: "Not Started", note: "" },
    ];
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
  }
}

// Load tasks into checklist UI
export function loadTasks() {
  const tasks = getTasks();
  const checklist = document.getElementById('projectChecklist');
  checklist.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = `list-group-item ${task.status === "Done" ? "list-group-item-success" : ""}`;
    
    // Task title and note input field
    taskItem.innerHTML = `
      <div>
        <strong>${task.task}</strong> - ${task.status}
        <button class="btn btn-sm btn-secondary float-right" onclick="toggleTaskStatus(${index})">Toggle Status</button>
      </div>
      <textarea class="form-control mt-2" placeholder="Add note..." onchange="updateTaskNote(${index}, this.value)">${task.note || ""}</textarea>
    `;
    
    checklist.appendChild(taskItem);
  });
}

// Toggle task status between "Done" and "Not Started" and save to localStorage
export function toggleTaskStatus(index) {
  const tasks = getTasks();
  tasks[index].status = tasks[index].status === "Done" ? "Not Started" : "Done";
  updateTask(index, tasks[index]);
  loadTasks();
  setupProgressChart(); // Update the progress chart after modifying tasks
}

// Update task note in local storage
export function updateTaskNote(index, note) {
  const tasks = getTasks();
  tasks[index].note = note;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
export function addTask(taskName) {
  const tasks = getTasks();
  tasks.push({ task: taskName, status: "Not Started", note: "" });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

// Update task status in local storage
function updateTask(index, updatedTask) {
  const tasks = getTasks();
  tasks[index] = updatedTask;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
