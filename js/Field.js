'use strict';

class Field {
    array = [];
    freeCellsArray = [];
    fieldEl = document.querySelector('.field');

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.createFieldArray(); // is he do something??
    }

    createRandomFruit() {
        const fruitsNameArray = ['apple', 'banana', 'kiwi'];
        const randomFruitName = getRandomElFromArray(fruitsNameArray);
        let fruit;

        switch (randomFruitName) {
            case 'apple':
                fruit = new Apple();
                break;
            case 'banana':
                fruit = new Banana();
                break;
            case 'kiwi':
                fruit = new Kiwi();
                break;
        }

        return fruit;
    }

    addFruits(count) {

        if (this.freeCellsArray.length > 0) {

            while (count >= 1) {
                const randomFruit = this.createRandomFruit();
                const randomFreeCell = getRandomElFromArray(this.freeCellsArray, true);

                this.array[randomFreeCell.element.y][randomFreeCell.element.x] = randomFruit;

                // create a separate function
                // удалить ячейку из freeCellsArray (временно заменил на updateFreeCellsArray)
                // т.к. не обновляются все клетки и иногда фрукты выпадают в змею
                // updateFreeCellsArray - более ресурсозатратный способ
                this.freeCellsArray.splice(randomFreeCell.index, 1);

                count -= 1;
            }
        }

    }

    // addFruits(count) {
    //
    //     if (this.freeCellsArray.length > 0) {
    //
    //         const randomFruit = this.createRandomFruit();
    //         const randomFreeCell = getRandomElFromArray(this.freeCellsArray, true);
    //
    //         this.array[randomFreeCell.element.y][randomFreeCell.element.x] = randomFruit;
    //         // create a separate function
    //         this.freeCellsArray.splice(randomFreeCell.index, 1);
    //     }
    //
    //     if (count === 1) return;
    //
    //     return this.addFruits(count - 1);
    // }

    updateFreeCellsArray() {
        let newFreeCellsArray = [];

        this.array.forEach(
            (column, indexY) => column.forEach(
                (cell, indexX) => {
                    if (cell === null) {
                        newFreeCellsArray.push({
                            y: indexY,
                            x: indexX,
                        });
                    }
                    // (cell === null) ? this.freeCellsArray.push({y: indexY, x: indexX})
                }));
        this.freeCellsArray = newFreeCellsArray;
    }

    createFieldArray() {
        for (let i = 0; i < this.width; i++) {
            let newColumn = [];

            for (let j = 0; j < this.height; j++) {
                newColumn.push(null);
            }
            this.array.push(newColumn);
        }
    }

    returnStartSettings() {
        this.clearFieldArray();
    }

    clearFieldArray() {
        this.array = this.array.map(
            column => column.map(
                cell => cell = null
            ));
    }

    addSnakeInArray(snakeBody) {
        snakeBody.forEach((item, index) => (index === 0) ? this.array[item.y][item.x] = 1 : this.array[item.y][item.x] = 0);
    }

    removeSnakeFromArray() {
        // now i'm delete snake fromm array, but in feature i need write new method,
        // that will be only change head and tail position

        // можно релизовать удаление, по обходу тела змеи
        // (там всего 4 элемента и это будет менее ресурсоемким)
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.array[i][j] === 0 || this.array[i][j] === 1) {
                    this.array[i][j] = null;
                }
            }
        }
        // console.log(this.array);
    }

    updateSnakePosition(snakeBody) {

    }

    createFieldHTMLFromArray() {
        let fieldHTMl = '';

        this.array.forEach(column => {
            let columnHTML = `<div class="column">`;

            column.forEach(cell => {
                switch (cell) {
                    case 0:
                        columnHTML += `<div class="cell body"></div>`;
                        break;
                    case 1:
                        columnHTML += `<div class="cell head"></div>`;
                        break;
                    case null:
                        columnHTML += `<div class="cell"></div>`;
                        break;
                    default:
                        columnHTML += `<div class="cell food ${cell.constructor.name.toLowerCase()}"></div>`;
                        break;
                }
            })

            columnHTML += `</div>`;
            fieldHTMl += columnHTML;
        });

        this.addFieldOnPage(fieldHTMl);
    }

    addFieldOnPage(fieldHTML) {
        this.fieldEl.innerHTML = `${fieldHTML}`;
    }

    showFieldInConsole() {
        let fieldString = '';

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.array[i][j] !== null) {
                    fieldString += `\u00A0${this.array[i][j]}\u00A0\u00A0|`;
                } else {
                    // fieldString += `\u00A0\u00A0\u00A0\u00A0|`;
                    fieldString += `${this.array[i][j]}|`;
                }
            }
            fieldString += "\r\n";
        }

        console.log(fieldString);
    }
}