'use strict';

const game = {
    score: 0,
    isStarted: false,
    isEnded: false,
    previousMoveDirection: 'right',
    scoreEl: document.querySelector('.score'),
    snake: new Snake(FIELD_WIDTH, FIELD_HEIGHT, START_SNAKE_LENGTH).setBody(),
    field: new Field(FIELD_WIDTH, FIELD_HEIGHT),

    start() {
        this.isStarted = true;
        modal.close();

        this.field.addSnakeInArray(this.snake.bodyArray);
        this.field.updateFreeCellsArray();
        this.field.addFruits(START_FRUIT_AMOUNT);

        this.field.createFieldHTMLFromArray();
    },

    restart() {
        this.field.returnStartSettings();
        this.snake.returnStartSettings();

        this.isEnded = false;
        this.score = 0;
        this.updateScoreInHTML();
        this.previousMoveDirection = 'right';
        this.start();
    },

    gameOver(status) {
        this.isEnded = true;
        modalTitle = (status = 'lose') ? 'Oops... Game over.' : 'You WIN!!!';
        modalBodyText = (status = 'lose') ? `Not bad. Your score is: ${this.score}. Try again!` : `Incredible game! Your score is: ${this.score}. Try do mo score!`;
        modalGameStatus = 'end';

        modal.show().createNew(modalTitle, modalBodyText, modalGameStatus);
    },

    updateScoreInHTML() {
        this.scoreEl.innerHTML = this.score;
    },

    move(direction) {
        let isFieldEnded;
        let nextCell;

        this.field.updateFreeCellsArray();

        switch (direction) {
            case 'up':
                isFieldEnded = this.snake.bodyArray[0].y - 1 < 0;

                if (isFieldEnded) {
                    this.gameOver('lose');
                } else {
                    nextCell = this.field.array[this.snake.bodyArray[0].y - 1][this.snake.bodyArray[0].x];

                    // isNextCellSnakeBody можно потом попробовать вынести, чтобы два раза this.gameOver('lose') не было
                    // вдруг получится оптимизировать это
                    let isNextCellSnakeBody = nextCell === 0;
                    let isNextCellNull = nextCell === null;

                    if (isNextCellSnakeBody) {
                        this.gameOver('lose');
                    } else if (isNextCellNull) {
                        this.snake.move(direction);
                    } else {
                        let fruit = nextCell;

                        this.snake.eat(direction, fruit);
                        this.score += fruit.value;
                        this.updateScoreInHTML();
                        this.field.addFruits(1);
                    }

                }

                break;
            case 'right':
                isFieldEnded = this.snake.bodyArray[0].x + 1 === FIELD_WIDTH;

                if (isFieldEnded) {
                    this.gameOver('lose');
                } else {
                    nextCell = this.field.array[this.snake.bodyArray[0].y][this.snake.bodyArray[0].x + 1];

                    // isNextCellSnakeBody можно потом попробовать вынести, чтобы два раза this.gameOver('lose') не было
                    // вдруг получится оптимизировать это
                    let isNextCellSnakeBody = nextCell === 0;
                    let isNextCellNull = nextCell === null;

                    if (isNextCellSnakeBody) {
                        this.gameOver('lose');
                    } else if (isNextCellNull) {
                        this.snake.move(direction);
                    } else {
                        let fruit = nextCell;

                        this.snake.eat(direction, fruit);
                        this.score += fruit.value;
                        this.updateScoreInHTML();
                        this.field.addFruits(1);
                    }

                }

                // console.log(`score: ${this.score}`);

                break;
            case 'down':
                isFieldEnded = this.snake.bodyArray[0].y + 1 === FIELD_HEIGHT;

                if (isFieldEnded) {
                    this.gameOver('lose');
                } else {
                    nextCell = this.field.array[this.snake.bodyArray[0].y + 1][this.snake.bodyArray[0].x];

                    // isNextCellSnakeBody можно потом попробовать вынести, чтобы два раза this.gameOver('lose') не было
                    // вдруг получится оптимизировать это
                    let isNextCellSnakeBody = nextCell === 0;
                    let isNextCellNull = nextCell === null;

                    if (isNextCellSnakeBody) {
                        this.gameOver('lose');
                    } else if (isNextCellNull) {
                        this.snake.move(direction);
                    } else {
                        let fruit = nextCell;

                        this.snake.eat(direction, fruit);
                        this.score += fruit.value;
                        this.updateScoreInHTML();
                        this.field.addFruits(1);
                    }

                }

                // console.log(`score: ${this.score}`);

                break;
            case 'left':
                isFieldEnded = this.snake.bodyArray[0].x - 1 < 0;

                if (isFieldEnded) {
                    this.gameOver('lose');
                } else {
                    nextCell = this.field.array[this.snake.bodyArray[0].y][this.snake.bodyArray[0].x - 1];

                    // isNextCellSnakeBody можно потом попробовать вынести, чтобы два раза this.gameOver('lose') не было
                    // вдруг получится оптимизировать это
                    let isNextCellSnakeBody = nextCell === 0;
                    let isNextCellNull = nextCell === null;

                    if (isNextCellSnakeBody) {
                        this.gameOver('lose');
                    } else if (isNextCellNull) {
                        this.snake.move(direction);
                    } else {
                        let fruit = nextCell;

                        this.snake.eat(direction, fruit);
                        this.score += fruit.value;
                        this.updateScoreInHTML();

                        // может надо после съедания обновлятьс вободные ячейки сразу проходясь по всему полю
                        // а не удаляя по 1 элементу как у меня сейчас (съел и удалил ячейку с таким индексом)
                        // !!!!!!!!
                        // обновлять свободыне ячейки после перемещения змеи
                        // !!!!!!!!
                        this.field.addFruits(1);
                    }
                }
                break;
        }

        // update method, by обход массива по телу змеи (передавать this.snake.bodyArray)
        // к примеру всего 4 элемента, менее ресурсоемко
        this.field.removeSnakeFromArray();

        // можно создать общую функцию UpdateSnakePositionOnFiled
        this.field.addSnakeInArray(this.snake.bodyArray);

        this.field.createFieldHTMLFromArray();

        if (this.snake.length === (FIELD_WIDTH * FIELD_HEIGHT)) {
            this.isEnded = true;
            this.gameOver('win');
        }
    },
}