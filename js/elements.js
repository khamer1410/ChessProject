    "use strict";

    let activePawn = {};
    let activeField = {};
    let fieldWithFigure = {};
    let fieldWithoutFigure = {};


//CREATE BOARD

    function Board() {
        this.fields = [];
        const board = document.querySelector('#board');
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

//CLASES
    //CREATE FIELDS 
    function Field(board) {
        this.board = board;
        this.td = document.createElement('td');
        this.td.addEventListener('click', (e)=> {  
            console.log(this);
            if (this.pawn) {
                fieldWithFigure = this;
            } else {
                fieldWithoutFigure = this;
            }            

            if (activePawn && (this == fieldWithoutFigure)) {
                this.pawn = activePawn;
                delete fieldWithFigure.pawn;
            }
           updateView();
        });  
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

            element.addEventListener('click', function(e) {
                activePawn = self;
                console.log(self);
                console.log(e);              
            });
            return element;
        }
    }

//PAWNS POSITION AND VIEW UPDATE
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
            startPostion.pawn = piece;
            startPostion.td.appendChild(piece.element);
        }
    }
    setNewGame();

    function updateView() {
        const boardFields = board.fields;
        boardFields.forEach((el, i) => {          
            if (el.pawn) {
                const pawnElement = el.pawn.element;
                el.td.appendChild(pawnElement);        
            }
        });
    }

    function updateView2() {
        const boardFields = board.fields;
        for (let i = 0; i < board.fields.length; i++) {
            const field = board.fields[i];
            if (field.pawn) {
                field.td.appendChild(field.pawn.element);
            }       
        }
    }


//RULES AND TEST PLAYGROUND
    Pawn.prototype = {
        sayHello: ()=> {
            console.log('hello');
        }
    }

    Field.prototype = {
        catchMove : (e)=> {
            console.log(e);
            console.log(e.target);      

        }
    }

    // function sayHello() {
    //     console.log('hello');
    // }

// var test = board.fields.forEach(function (el, i) {
//         if (el.pawn) { console.log(i);}
//         el.addEventListener
//     });



//TODO: tablica pionków
//TODO: funkcja umieszcająca pionki na ich pozycjach

function getField() {
    const index = self.y * 8 + self.x;
    return index;
}   

function getPosition(index) {
    let x = index % 8;
    let y = Math.floor(index / 8);
    // this.x = x;
    // this.y = y;
}
