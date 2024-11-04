// main.js

import { initializeTasks, loadTasks } from './taskManager.js';
import { setupProgressChart } from './chartManager.js';
import { startCoding, stopCoding, updateCodingTimeDisplay } from './timeTracker.js';
import { clearLocalStorage } from './passwordManager.js';

// Initialize tasks, set up progress chart, and coding time display
initializeTasks();
loadTasks();
setupProgressChart();
updateCodingTimeDisplay();

// Attach start and stop timer functions to buttons
document.getElementById('startTimer').onclick = startCoding;
document.getElementById('stopTimer').onclick = stopCoding;

// Attach the clearLocalStorage function to the clear button
document.getElementById('clearDataButton').onclick = clearLocalStorage;
