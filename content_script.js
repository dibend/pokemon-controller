function triggerClick(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.click();
    }
}

function handleGamepadInput() {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad) return;

    // Define your button mappings and associated actions here
    const buttonMappings = {
        0: () => triggerClick('button[name="chooseMove"][value="2"]'), // A for Attack 1
        1: () => triggerClick('button[name="chooseMove"][value="1"]'), // B for Attack 2
        3: () => triggerClick('button[name="chooseMove"][value="3"]'), // X for Attack 3
        2: () => triggerClick('button[name="chooseMove"][value="4"]'), // Y for Attack 4
        4: () => triggerClick('button[data-tooltip="switchpokemon|0"]'), // L for Switch 1
        5: () => triggerClick('button[data-tooltip="switchpokemon|1"]'), // R for Switch 2
        6: () => triggerClick('button[data-tooltip="switchpokemon|2"]'), // ZL for Switch 3
        7: () => triggerClick('button[data-tooltip="switchpokemon|3"]'), // ZR for Switch 4
        12: () => triggerClick('button[data-tooltip="switchpokemon|4"]'), // D-Pad Up for Switch 5
        13: () => triggerClick('button[data-tooltip="switchpokemon|5"]'), // D-Pad Down for Switch 6
    };
    

    gamepad.buttons.forEach((button, index) => {
        if (button.pressed) {
            const action = buttonMappings[index];
            if (action) {
                action();
            }
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
