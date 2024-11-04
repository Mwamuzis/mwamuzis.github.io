// main.js

// Define a password for admin actions (for demonstration, hardcoded here)
const ADMIN_PASSWORD = "StrongAdminPass123";

// Function to show the password modal
function requestPassword(callback) {
  $('#passwordModal').modal('show');

  document.getElementById('confirmPassword').onclick = () => {
    const enteredPassword = document.getElementById('adminPassword').value;
    if (enteredPassword === ADMIN_PASSWORD) {
      $('#passwordModal').modal('hide');
      document.getElementById('passwordError').style.display = 'none';
      callback();
    } else {
      document.getElementById('passwordError').style.display = 'block';
    }
  };
}

// Protected function to clear all local storage data
function clearLocalStorage() {
  requestPassword(() => {
    localStorage.clear();
    alert("All data has been cleared.");
    loadTasks();  // Reloads the tasks to reset the view
    setupProgressChart();  // Reinitialize the progress chart with fresh data
  });
}

// Attach the clearLocalStorage function to the clear button
document.getElementById('clearDataButton').onclick = clearLocalStorage;
