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
        { task: "Initialize Express App", status: "Not Started" },
        { task: "Setup MySQL Connection", status: "Not Started" },
        { task: "Configure Sequelize", status: "Not Started" },
        { task: "Create User model", status: "Not Started" },
        { task: "Create Product model", status: "Not Started" },
        { task: "Deploy project", status: "Not Started" },
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
      taskItem.textContent = `${task.task} - ${task.status}`;
      taskItem.onclick = () => toggleTaskStatus(index);
      checklist.appendChild(taskItem);
    });
  }
  
  // Toggle task status between "Done" and "Not Started" and save to localStorage
  export function toggleTaskStatus(index) {
    const tasks = getTasks();
    tasks[index].status = tasks[index].status === "Done" ? "Not Started" : "Done";
    updateTask(index, tasks[index].status);
    loadTasks();
    setupProgressChart(); // Update the progress chart after modifying tasks
  }
  
  // Update task status in local storage
  function updateTask(index, status) {
    const tasks = getTasks();
    tasks[index].status = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  