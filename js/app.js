'use strict';

const FIELD_WIDTH = 12; // Default: 12
const FIELD_HEIGHT = 12; // Default: 12
const START_FRUIT_AMOUNT = 3; // Default: 2
const START_SNAKE_LENGTH = 3; // Default: 3

let modalTitle = 'Crazy snake game',
    modalBodyText = 'Are you ready to start the game?',
    modalGameStatus = 'start';

modal.createNew(modalTitle, modalBodyText, modalGameStatus);

window.addEventListener('keydown', keyboardControlHandler);


function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns a random array element and its index
 *
 * @param  {array} array Array to select element
 * @param  {boolean} isReturnIndex Return the index of the selected element or not (true/false)
 * @return {object} Returns random element or random element & its index
 */
function getRandomElFromArray(array, isReturnIndex = false) {
    const randomArrayIndex = getRandomNumberBetween(0, array.length - 1);

    if (isReturnIndex === true) {
        return {
            index: randomArrayIndex,
            element: array[randomArrayIndex],
        };
    } else {
        return array[randomArrayIndex];
    }
}

function keyboardControlHandler(event) {
    // event.preventDefault();

    if (!game.isStarted && event.key === 'Enter') {
        game.start();

    } else if (game.isEnded && event.key === 'Enter') {
        game.restart();
    } else if (game.isStarted && !game.isEnded && game.isPressDelay === false) {
        switch (event.key) {
            case 'ArrowUp':
                if (game.previousMoveDirection === 'left' || game.previousMoveDirection === 'right') {
                    game.isPressDelay = true;
                    game.move('up')
                    game.updateTimer('up')
                    game.previousMoveDirection = "up";
                }
                break;
            case 'ArrowRight':
                if (game.previousMoveDirection === 'up' || game.previousMoveDirection === 'down') {
                    game.isPressDelay = true;
                    game.move('right')
                    game.updateTimer('right')
                    game.previousMoveDirection = "right";
                }
                break;
            case 'ArrowDown':
                if (game.previousMoveDirection === 'left' || game.previousMoveDirection === 'right') {
                    game.isPressDelay = true;
                    game.move('down')
                    game.updateTimer('down')
                    game.previousMoveDirection = "down";
                }
                break;
            case 'ArrowLeft':
                if (game.previousMoveDirection === 'up' || game.previousMoveDirection === 'down') {
                    game.isPressDelay = true;
                    game.move('left')
                    game.updateTimer('left')
                    game.previousMoveDirection = "left";
                }
                break;
        }
    }
}