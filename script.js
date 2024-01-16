let gamePieces = [0,1,2,3,4,5,6]
let position = {
    pos1:null,
    pos2:null,
    pos3:null,
    pos4:null
};


let currentPiece = null;
let pieceColor = null;
let started;

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

function startGame() {
if(started !== true){
intervalId = setInterval(pieceMove, 500)
started = true
console.log("Game Started")}
}

let stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopGame);

function stopGame() {
    if(started == true){
    clearInterval(intervalId)
    started = false
    console.log("Game Stopped")
    }

}

intervalId = null

function pieceMove() {
    console.log("Moved");
    console.log(position);
if (currentPiece !== null) {
    resetGrid()
    position.pos1 += 10;
    position.pos2 += 10;
    position.pos3 += 10;
    position.pos4 += 10;
    document.getElementById(position.pos1).style.backgroundColor = pieceColor;
    document.getElementById(position.pos2).style.backgroundColor = pieceColor;
    document.getElementById(position.pos3).style.backgroundColor = pieceColor;
    document.getElementById(position.pos4).style.backgroundColor = pieceColor;
    
}
if (position.pos1 >= 191 || position.pos2 >= 191 || position.pos3 >= 191 || position.pos4 >= 191) {
    saveGrid()
    setPiece()
    
}
  }



function setPiece(){
position = { pos1: null, pos2: null, pos3: null, pos4: null }; 
   currentPiece = Math.floor(Math.random() * 6);
   console.log(currentPiece)
   if (currentPiece === 0) {
    // Tetris piece "I"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 21 - 10 + randomizeStart;
    position.pos4 = 31 - 10 + randomizeStart;
    pieceColor = 'cyan';

}
else if (currentPiece === 1) {
    // Tetris piece "J"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 21 - 10 + randomizeStart;
    position.pos4 = 22 - 10 + randomizeStart;
    pieceColor = 'blue'
}
else if (currentPiece === 2) {
    // Tetris piece "L"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 21 - 10 + randomizeStart;
    position.pos4 = 12 - 10 + randomizeStart;
    pieceColor = 'orange'
}
else if (currentPiece === 3) {
    // Tetris piece "O"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 2 - 10 + randomizeStart;
    position.pos3 = 11 - 10 + randomizeStart;
    position.pos4 = 12 - 10 + randomizeStart;
    pieceColor = 'yellow'
}
else if (currentPiece === 4) {
    // Tetris piece "S"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 2 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 12 - 10 + randomizeStart;
    position.pos4 = 21 - 10 + randomizeStart;
    pieceColor = 'green'
}
else if (currentPiece === 5) {
    // Tetris piece "T"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 12 - 10 + randomizeStart;
    position.pos4 = 21 - 10 + randomizeStart;
    pieceColor = 'purple'
}
else if (currentPiece === 6) {
    // Tetris piece "Z"
    randomizeStart = Math.floor(Math.random() * 9)
    position.pos1 = 1 - 10 + randomizeStart;
    position.pos2 = 11 - 10 + randomizeStart;
    position.pos3 = 12 - 10 + randomizeStart;
    position.pos4 = 22 - 10 + randomizeStart;
    pieceColor = 'red'
}
}
setPiece()

function resetGrid() {
    
    gridCells = document.getElementsByClassName('gridCell')
    
    cellsArray = Array.from(gridCells)
    
    cellsArray.forEach(function(cell){
        cell.style.backgroundColor = "black"
    
    })
    }


   function saveGrid() {
let orange = [];
let cyan = [];
let purple = [];
let blue = [];
let yellow = [];
let green = [];
let red = [];

for (i=0; i<Array.length; i++){
document.getElementById


}


    }