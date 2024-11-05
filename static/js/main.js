// main.js

import { initializeTasks, loadTasks, addTask } from './taskManager.js';
import { setupProgressChart } from './chartManager.js';
import { startCoding, stopCoding, updateCodingTimeDisplay } from './timeTracker.js';
import { clearLocalStorage } from './passwordManager.js';

document.addEventListener("DOMContentLoaded", () => {
  // Initialize tasks, set up progress chart, and coding time display
  initializeTasks();
  loadTasks();
  setupProgressChart();
  updateCodingTimeDisplay();

  // Event listener for "Add Task" button
  document.getElementById('addTaskButton').onclick = () => {
    const taskName = document.getElementById('newTaskInput').value.trim();
    if (taskName) {
      addTask(taskName);
      document.getElementById('newTaskInput').value = ""; // Clear the input field after adding
    }
    // print the function name
    console.log("addTaskButton")
  };

  // Attach start and stop timer functions to buttons
  document.getElementById('startTimer').onclick = startCoding;
  document.getElementById('stopTimer').onclick = stopCoding;

  // Attach the clearLocalStorage function to the clear button
  document.getElementById('clearDataButton').onclick = clearLocalStorage;
});
