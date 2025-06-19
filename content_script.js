let buttonPressStates = {};
let currentControllerType = 'auto';

// Retrieve stored controller preference
if (chrome && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['controllerType'], (result) => {
        if (result.controllerType) {
            currentControllerType = result.controllerType;
        }
    });

    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.controllerType) {
            currentControllerType = changes.controllerType.newValue || 'auto';
        }
    });
}

function triggerClick(selector) {
    const element = document.querySelector(selector);
    console.log(element);
    if (element) {
        element.click();
    }
}

function handleGamepadInput() {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;

    // Define button mappings for supported controllers
    const mappings = {
        switch: {
            1: () => triggerClick('button[name="chooseMove"][value="1"]'), // B
            0: () => triggerClick('button[name="chooseMove"][value="2"]'), // A
            3: () => triggerClick('button[name="chooseMove"][value="3"]'), // Y
            2: () => triggerClick('button[name="chooseMove"][value="4"]'), // X
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'), // L
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'), // R
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'), // ZL
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'), // ZR
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'), // -
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'), // +
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // Left Stick
        },
        ps4: {
            0: () => triggerClick('button[name="chooseMove"][value="1"]'), // X
            1: () => triggerClick('button[name="chooseMove"][value="2"]'), // Circle
            3: () => triggerClick('button[name="chooseMove"][value="3"]'), // Triangle
            2: () => triggerClick('button[name="chooseMove"][value="4"]'), // Square
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'), // L1
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'), // R1
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'), // L2
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'), // R2
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'), // Share
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'), // Options
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // L3
        },
        ps5: {
            0: () => triggerClick('button[name="chooseMove"][value="1"]'),
            1: () => triggerClick('button[name="chooseMove"][value="2"]'),
            3: () => triggerClick('button[name="chooseMove"][value="3"]'),
            2: () => triggerClick('button[name="chooseMove"][value="4"]'),
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'),
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'),
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'),
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'),
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'),
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'),
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // L3
        },
        xbox360: {
            0: () => triggerClick('button[name="chooseMove"][value="1"]'), // A
            1: () => triggerClick('button[name="chooseMove"][value="2"]'), // B
            3: () => triggerClick('button[name="chooseMove"][value="3"]'), // Y
            2: () => triggerClick('button[name="chooseMove"][value="4"]'), // X
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'), // LB
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'), // RB
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'), // LT
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'), // RT
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'), // Back
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'), // Start
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // Left Stick
        },
        xboxone: {
            0: () => triggerClick('button[name="chooseMove"][value="1"]'),
            1: () => triggerClick('button[name="chooseMove"][value="2"]'),
            3: () => triggerClick('button[name="chooseMove"][value="3"]'),
            2: () => triggerClick('button[name="chooseMove"][value="4"]'),
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'),
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'),
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'),
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'),
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'),
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'),
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // Left Stick
        },
        xboxseries: {
            0: () => triggerClick('button[name="chooseMove"][value="1"]'),
            1: () => triggerClick('button[name="chooseMove"][value="2"]'),
            3: () => triggerClick('button[name="chooseMove"][value="3"]'),
            2: () => triggerClick('button[name="chooseMove"][value="4"]'),
            4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'),
            5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'),
            6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'),
            7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'),
            8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'),
            9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'),
            10: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // Left Stick
        }
    };

    const controllerType = detectControllerType(gamepad);
    const buttonMappings = mappings[controllerType] || mappings['switch'];
    
    gamepad.buttons.forEach((button, index) => {
        if (button.pressed) {
            if (!buttonPressStates[index]) { // Check if the button was not previously pressed
                const action = buttonMappings[index];
                if (action) {
                    action(); // Execute the action
                    buttonPressStates[index] = true; // Mark the button as pressed
                }
            }
        } else {
            buttonPressStates[index] = false; // Reset the state when the button is released
        }
    });
}

function startGamepadLoop() {
    const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    function loop() {
        handleGamepadInput();
        requestAnimationFrame(loop);
    }
    loop();
}

function detectControllerType(gamepad) {
    if (currentControllerType && currentControllerType !== 'auto') {
        return currentControllerType;
    }
    const id = gamepad.id.toLowerCase();
    if (id.includes('playstation') || id.includes('ps5')) {
        return 'ps5';
    }
    if (id.includes('ps4')) {
        return 'ps4';
    }
    if (id.includes('xbox') && id.includes('360')) {
        return 'xbox360';
    }
    if (id.includes('xbox') && id.includes('one')) {
        return 'xboxone';
    }
    if (id.includes('xbox') && id.includes('series')) {
        return 'xboxseries';
    }
    if (id.includes('xbox')) {
        return 'xboxone';
    }
    if (id.includes('switch')) {
        return 'switch';
    }
    return 'switch';
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad.id);
    startGamepadLoop();
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected:", event.gamepad.id);
});
