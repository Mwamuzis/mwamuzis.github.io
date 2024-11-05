// timeTracker.js

let codingStartTime;
let codingInterval;

// Function to update coding time display
export function updateCodingTimeDisplay() {
  const totalCodingTime = parseInt(localStorage.getItem('totalCodingTime') || '0', 10);
  const hours = Math.floor(totalCodingTime / (1000 * 60 * 60));
  document.getElementById('codingTime').querySelector('span').textContent = hours;
}

// Function to start coding time tracking
export function startCoding() {
  codingStartTime = Date.now();
  localStorage.setItem('codingStartTime', codingStartTime);
  codingInterval = setInterval(updateCodingTimeDisplay, 60000); // Update every minute
}

// Function to stop coding time tracking
export function stopCoding() {
  if (codingStartTime) {
    const codingTime = Date.now() - codingStartTime;
    let totalCodingTime = parseInt(localStorage.getItem('totalCodingTime') || '0', 10);
    totalCodingTime += codingTime;
    localStorage.setItem('totalCodingTime', totalCodingTime);
    clearInterval(codingInterval);
    updateCodingTimeDisplay();
    codingStartTime = null;
    localStorage.removeItem('codingStartTime');
  }
  // print the function name 
  console.log("stopCoding");
}
