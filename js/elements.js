    "use strict";

    let activePawn = {};
    let activeField = {};
    let fieldWithFigure = {};
    let fieldWithoutFigure = {};

    const clickedFields = [];


//CREATE BOARD
    var board = new Board();

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
            let field = this.fields[i] = new Field(this, i);
            let td = field.td;
            if (rowNo % 2) {
                i % 2 ? (td.className = 'field-white') : (td.className = 'field-black');
            } else {
                i % 2 ? (td.className = 'field-black' ) : (td.className = 'field-white');
            }
            tr.appendChild(td);
        }
    }

//CLASES
    //CREATE FIELDS 
    function Field(board, number) {
        this.board = board;
        this.no = number;
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
    const elementsFolder = 'elements/';
    const figureTypes = {
        pawn: {
            shape: {
                white: elementsFolder + 'pawnW.svg',
                black: elementsFolder + 'pawnB.svg',
            }
        },
        knight: {
            shape: {
                white: elementsFolder + 'pawnW.svg',
                black: elementsFolder + 'pawnB.svg',
            }
        }     
    };

    function Pawn(type, color, id) {
        let self = this;
        this.type = type;
        this.id = id;
        this.color = color;
        this.element = createElement(type, color, id);
        
        function createElement(type, color, id) {
            let element = document.createElement('img');
            element.src = figureTypes[type].shape[color];
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
        const fieldsArr = board.fields;

        for (let i = 0; i <= 64; i++) {
            let startPostion = fieldsArr[i];
            let piece = false;

            if (i >= 8 && i <= 15) {
                piece = new Pawn('pawn', 'black', i);
            }

            else if (i >= 48 && i <= 55) {
                piece = new Pawn('pawn', 'white', i);
            } 
            
            else {
                continue;
            }

            if (piece) {
                startPostion.pawn = piece;
                startPostion.td.appendChild(piece.element); 
            }
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
//        fieldWithFigure = {};
//        fieldWithoutFigure = {};
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
};

