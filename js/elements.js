    "use strict";

//CREATE BOARD
    function createBoard() {
        const board = document.querySelector('#board');
        let fields = [];
        for (let i = 1; i <= 8; i++) {
            let tr = document.createElement('tr');
            let trId = tr.id = i * 10;
            fields[i] = [];
            for (let j = 1; j <= 8; j++) {
                let td = document.createElement('td');
                td.id = trId + j;
                if (i % 2 === j % 2) {
                    td.className = 'field-white';
                } else {
                    td.className = 'field-black';
                }
                fields[i][j] = td;
                tr.appendChild(td);
            }
            board.appendChild(tr);
        }
        return fields;
    }
    var fields = createBoard();

//PAWNS LIST
    function Pawn(type, id, color, rowPosition, colPosition) {
        let self = this;
        this.type = type;
        this.id = id;
        this.color = color;
        this.startPosition = [rowPosition][colPosition];
        this.element = createElement(type, color, id, rowPosition, colPosition);
        
        function createElement(shape, color, id, rowPosition, colPosition) {
            let element = document.createElement('img');
            element.src = `${shape}.svg`;
            element.classList.add(color);
            element.id = `p${id}`;
            element.setAttribute('data-rowposition', rowPosition);
            element.setAttribute('data-colposition', colPosition);
            element.setAttribute('data-color', color);
            return element;
        }
    }

    function setNewGame() {
        let pawnWhite = 'elements/pawnW';
        let pawnBlack = 'elements/pawnB';

        for (let i = 1; i <= 8; i++) {
            let startRow = [7];
            let startColumn = [i];
            let piece = new Pawn(pawnWhite, i, 'white', startRow, startColumn);
            fields[startRow][startColumn].appendChild(piece.element);
        }
        for (let i = 1; i <= 8; i++) {
            let startRow = [2];
            let startColumn = [i];
            let piece = new Pawn(pawnBlack, i, 'black', startRow, startColumn);
            fields[startRow][startColumn].appendChild(piece.element);
        }
    }

    setNewGame();
