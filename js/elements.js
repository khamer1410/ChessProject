    "use strict";

//CREATE BOARD
//VER 1
    // function Board() {
    //     const board = document.querySelector('#board');
    //     let fields = [];
    //     for (let i = 1; i <= 8; i++) {
    //         let tr = document.createElement('tr');
    //         let trId = tr.id = i * 10;
    //         fields[i] = [];
    //         for (let j = 1; j <= 8; j++) {
    //             let field = new Field(board);
    //             let td = field.td;
    //             td.id = trId + j;
    //             if (i % 2 === j % 2) {
    //                 td.className = 'field-white';
    //             } else {
    //                 td.className = 'field-black';
    //             }
    //             fields[i][j] = td;
    //             tr.appendChild(td);
    //         }
    //         board.appendChild(tr);
    //     }
    //     return fields;
    // }
    // var board = new Board();
//VER 2
    function Board() {
        const board = document.querySelector('#board');
        this.fields = [];
        let tr;
        let rowNo = 0;
        for (let i = 0; i < 64; i++) {
            if (i % 8 === 0) {
                tr = document.createElement('tr');
                board.appendChild(tr);
                rowNo ++;
            }
            let field = this.fields[i] = new Field();
            let td = field.td;
            if (rowNo % 2) {
                i % 2 ? (td.className = 'field-white') : (td.className = 'field-black');
            } else {
                i % 2 ? (td.className = 'field-black' ) : (td.className = 'field-white');
            }
            tr.appendChild(td);
        }
    }

    var board = new Board();


//CREATE FIELDS 
    function Field(board) {
        this.board = board;
        this.td = document.createElement('td');
        this.td.addEventListener('click', (e)=> {console.log(e.target)});  
    }

//PAWNS LIST
    function Pawn(type, id, color, rowPosition, colPosition) {
        let self = this;
        this.type = type;
        this.id = id;
        this.color = color;
        this.element = createElement(type, color, id, rowPosition, colPosition);
        
        function createElement(shape, color, id, rowPosition, colPosition) {
            let element = document.createElement('img');
            element.src = `${shape}.svg`;
            element.classList.add(color);
            element.id = `p${id}`;

            element.addEventListener('click', function(el) {
                console.log(this);
                console.log(self);
                console.log(el);
                return self;               
            });
            return element;
        }
    }

    function setNewGame() {
        let pawnWhite = 'elements/pawnW';
        let pawnBlack = 'elements/pawnB';
        const fieldsArr = board.fields;

        for (let i = 8; i <= 15; i++) {
            let startPostion = fieldsArr[i];
            let piece = new Pawn(pawnBlack, i, 'black');
            startPostion.pawn = piece;
            startPostion.td.appendChild(piece.element);
        }

        for (let i = 48; i <= 55; i++) {
            let startPostion = fieldsArr[i];
            let piece = new Pawn(pawnWhite, i, 'white');
            startPostion.td.appendChild(piece.element);
        }
    }
    setNewGame();

//RULES
    Pawn.prototype.hello = ()=> {
        console.log('hello');
    }

    Field.prototype = {
        catchMove : (e)=> {
            console.log(e);
            console.log(e.target);
            

        }
    }


//OLD VERSION BACKUP METODOLOGY
        // function setNewGame() {
        //     for (let i = 1; i <= 8; i++) {
        //         let position = fields[7][i];
        //         let piece = new Pawn(pawnWhite, i, 'white', position);
        //         position.appendChild(piece.element);
        //     }

        //     for (let i = 1; i <= 8; i++) {
        //         let position = fields[2][i];
        //         let piece = new Pawn(pawnBlack, i, 'black', position);
        //         position.appendChild(piece.element);
        //     }
        // }    


    // let tablica = [];
    // for (let i = 0; i < 9; i++) {
    //     board[i].map((el) => {
    //         el.push(tablica);
    //     })	
	// };

    // powinieneś mieć strukturę danych reprezentującą szachownicę - dwuwymiarową tablicę obiektów, a w każdym obiekcie referencja do elementu reprezentującego to pole w celu przypinania się na event- y
    // powinieneś mieć także dwie listy (tablice) obiektów pionków, każdy pionek powinien mieć pole przechowujące referencję do elementu IMG, który go reprezentuje także w celu przypięcia do event - ów
>>>>>>> rules
