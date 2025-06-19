document.addEventListener('DOMContentLoaded', () => {
  updateControllerStatus();
  initControllerSelect();
  updateGuideDisplay();
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

function initControllerSelect() {
  const select = document.getElementById('controllerSelect');
  if (!select) return;

  chrome.storage.local.get(['controllerType'], (result) => {
    select.value = result.controllerType || 'auto';
    updateGuideDisplay();
  });

  select.addEventListener('change', () => {
    chrome.storage.local.set({ controllerType: select.value });
    updateGuideDisplay();
  });
}

function updateGuideDisplay() {
  const type = document.getElementById('controllerSelect').value;
  const guideSwitch = document.getElementById('guideSwitch');
  const guidePS = document.getElementById('guidePS');
  const guideXbox = document.getElementById('guideXbox');

  guideSwitch.style.display = 'none';
  guidePS.style.display = 'none';
  guideXbox.style.display = 'none';

  if (type === 'switch') {
    guideSwitch.style.display = 'block';
  } else if (type === 'ps4' || type === 'ps5') {
    guidePS.style.display = 'block';
  } else if (type === 'xbox360' || type === 'xboxone' || type === 'xboxseries') {
    guideXbox.style.display = 'block';
  } else { // auto
    guideSwitch.style.display = 'block';
    guidePS.style.display = 'block';
    guideXbox.style.display = 'block';
  }
}
