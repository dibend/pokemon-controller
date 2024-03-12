document.addEventListener('DOMContentLoaded', () => {
  updateControllerStatus();
});

function updateControllerStatus() {
  const statusText = document.getElementById('statusText');

  // Gamepad API logic
  const gamepadConnected = navigator.getGamepads()[0] !== null;

  if (gamepadConnected) {
    statusText.textContent = 'Controller connected.'; 
  } else {
    statusText.textContent = 'Awaiting controller connection...';
  }
}

// Optional: Set an interval to continuously check the connection
setInterval(updateControllerStatus, 1000); // Check every second
