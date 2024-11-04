// localStorageHandler.js

// Sample Task List
const sampleTasks = [
    { task: "Initialize Express App", status: "Not Started" },
    { task: "Setup MySQL Connection", status: "In Progress" },
    // Add more tasks here...
  ];
  
  // Initialize tasks in local storage if not present
  function initializeTasks() {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }
  

// Retrieve tasks from local storage, return empty array if none found
function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
  
  
  // Update task status in local storage
  function updateTask(index, status) {
    const tasks = getTasks();
    tasks[index].status = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  