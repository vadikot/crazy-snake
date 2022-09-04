'use strict';

const modal = {
    modalEl: document.querySelector(".modal"),
    modalBodyHTML: '',

    createNew(title, bodyText, gameStatus) {

        switch (gameStatus) {
            case 'start':
                this.modalBodyHTML = this.getStartGameTemplate(title, bodyText);
                break;
            case 'end':
                this.modalBodyHTML = this.getEndGameTemplate(title, bodyText);
                break;
        }

        this.modalEl.innerHTML = `${this.modalBodyHTML}`;
    },

    close() {
        this.modalEl.classList.add('close');
    },

    show() {
        this.modalEl.classList.remove('close');

        return this;
    },

    getStartGameTemplate(title, bodyText) {
        return `<div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                    </div>
                    <div class="modal-body start">
                        <div class="container">
                            <p>${bodyText}</p>
                            <div class="modal-btn start" onclick="game.isStarted = true; game.start()">Start</div>
                        </div>
                        <div class="container">
                            <p>Control buttons</p>
                            <img class="control-buttons" src="img/arrows.png" alt="arrows">
                        </div>
                    </div>
                    <div class="modal-footer">Game developed by Vadi_kot</div>
                </div>`;
    },

    getEndGameTemplate(title, bodyText) {
        return `<div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                    </div>
                    <div class="modal-body">
                        <p>${bodyText}</p>
                        <div class="modal-btn start" onclick="game.restart()">Try again</div>
                    </div>
                    <div class="modal-footer">
                        <h3>Game developed by Vadi_kot</h3>
                    </div>
                </div>`;
    },
};
