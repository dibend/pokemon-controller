let buttonPressStates = {};

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

    // Define your button mappings and associated actions here
    const buttonMappings = {
        1: () => triggerClick('button[name="chooseMove"][value="1"]'), // A for Attack 1
        0: () => triggerClick('button[name="chooseMove"][value="2"]'), // B for Attack 2
        3: () => triggerClick('button[name="chooseMove"][value="3"]'), // X for Attack 3
        2: () => triggerClick('button[name="chooseMove"][value="4"]'), // Y for Attack 4
        4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'), // L for Switch 1
        5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'), // R for Switch 2
        6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'), // ZL for Switch 3
        7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'), // ZR for Switch 4
        8: () => triggerClick('button[data-tooltip="switchpokemon|4"]'), // - for Switch 5
        9: () => triggerClick('button[data-tooltip="switchpokemon|5"]'), // + for Switch 6
        12: () => triggerClick('div.battle-controls > div > div.movecontrols > div.movemenu > label.megaevo'), // Home to check/uncheck mega evo
    };
    
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

window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad connected:", event.gamepad.id);
    startGamepadLoop();
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad disconnected:", event.gamepad.id);
});
