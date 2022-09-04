'use strict';

function Snake(fieldWidth, fieldHeight, length) {
    this.color = 'none';
    this.length = length;
    this.bodyArray = []; // bodyArray[0] - snake's head, rest elements is the body

    this.setBody = function () {

        if (this.length > Math.ceil(fieldWidth / 2)) {
            this.length = Math.ceil(fieldWidth / 2) + 1;
        } else if (this.length < 3) {
            this.length = 3;
        }

        const headPositionY = Math.ceil(fieldHeight / 2);
        const headPositionX = Math.ceil(fieldWidth / 2);
        let newBodyArray = [{
            y: headPositionY,
            x: headPositionX,
        }];

        for (let i = 1; i < this.length; i++) {
            const snakeCell = {
                y: headPositionY,
                x: headPositionX - i,
            };

            newBodyArray.push(snakeCell);
        }

        this.bodyArray = newBodyArray;

        return this;
    }

    this.returnStartSettings = function () {
        this.length = START_SNAKE_LENGTH;
        this.color = 'none';
        this.setBody();
    }

    this.move = function (direction) {
        this.deleteTail();
        this.addNewCell(direction);
    }

    this.eat = function (direction, fruit) {
        this.length += 1;
        this.addNewCell(direction);
    }

    this.deleteTail = function () {
        let tailIndex = this.bodyArray.length - 1;

        this.bodyArray.splice(tailIndex, 1);
    }

    this.addNewCell = function (direction) {
        let newHeadPosition;

        switch (direction) {
            case 'up':
                newHeadPosition = {
                    y: this.bodyArray[0].y - 1,
                    x: this.bodyArray[0].x,
                };
                break;
            case 'right':
                newHeadPosition = {
                    y: this.bodyArray[0].y,
                    x: this.bodyArray[0].x + 1,
                };
                break;
            case 'down':
                newHeadPosition = {
                    y: this.bodyArray[0].y + 1,
                    x: this.bodyArray[0].x,
                };
                break;
            case 'left':
                newHeadPosition = {
                    y: this.bodyArray[0].y,
                    x: this.bodyArray[0].x - 1,
                };
                break;
        }

        this.bodyArray.unshift(newHeadPosition);
    }

    this.showColor = function () {
        console.log(`Snake color is ${this.color}`);
    }
}