// passwordManager.js

const ADMIN_PASSWORD = "StrongAdminPass123";

// Function to show the password modal for admin actions
export function requestPassword(callback) {
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
export function clearLocalStorage() {
  requestPassword(() => {
    localStorage.clear();
    alert("All data has been cleared.");
    initializeTasks();  // Reset sample tasks in local storage
    loadTasks();  // Reload the tasks to reset the view
    setupProgressChart();  // Reinitialize the progress chart with fresh data
    updateCodingTimeDisplay();  // Reset coding time display
  });
}


// done