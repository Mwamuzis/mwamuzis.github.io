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
  