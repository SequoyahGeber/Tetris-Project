function handleKeyDown(pressedKey) {
  if (
    pressedKey.key === "ArrowUp" ||
    pressedKey.key === "ArrowDown" ||
    pressedKey.key === "ArrowLeft" ||
    pressedKey.key === "ArrowRight"
  ) {
    pressedKey.preventDefault();
  }
  const key = pressedKey.key;
  function updatePositionx(vector) {
    for (i = 0; i < 4; i++) {
      currentPiece.positionsx[i] += vector;
    }
    renderGrid();
  }
  function updatePositiony(vector) {
    for (i = 0; i < 4; i++) {
      currentPiece.positionsy[i] += vector;
    }
    renderGrid();
  }
  switch (key) {
    case "ArrowLeft":
      updatePositionx(-1);
      break;
    case "ArrowRight":
      updatePositionx(1);
      break;
    case "ArrowDown":
      updatePositiony(1);
      break;
    case "a":
      rotatePieceLeft();
      break;
    case "d":
      rotatePieceRight();
      break;
  }
}

document.addEventListener("keydown", handleKeyDown);

let started;
let occupiedPositionsx = {
  cyan: [],

  orange: [],

  yellow: [],

  blue: [],

  red: [],

  green: [],

  purple: [],
};

let occupiedPositionsy = {
  cyan: [],

  orange: [],

  yellow: [],

  blue: [],

  red: [],

  green: [],

  purple: [],
};
let occupiedPositions = [];
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

function startGame() {
  if (started !== true) {
    moveTimer = setInterval(move, 500);
    started = true;
    console.log("Game Started");
  }
}

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopGame);

function stopGame() {
  if (started == true) {
    clearInterval(moveTimer);
    started = false;
    console.log("Game Stopped");
  }
}

// function calculateScore(completedLines) {
//   const scoreMultiplier = [0, 40, 100, 300, 1200];
//   score += scoreMultiplier[completedLines] || 0;
// }

// function setScore() {
//   document.getElementById("score").innerText = newScore;
// }

let currentPiece = {
  selectPiece: function () {
    piece = Math.floor(Math.random() * 7);
    this.positionsx = [];
    this.positionsy = [];
    this.color = null;
    this.color = this.gamePieces[piece];
    this.positionsx = this.piecesx[piece];
    this.positionsy = this.piecesy[piece];

    console.log("Current Piece: " + this.color);
    console.log(this.positionsx);
  },
  color: null,
  positionsx: [],
  positionsy: [],
  gamePieces: ["cyan", "orange", "yellow", "blue", "red", "green", "purple"],
  piecesx: [
    [4, 5, 6, 7],
    [6, 4, 5, 6],
    [4, 5, 4, 5],
    [4, 4, 5, 6],
    [4, 5, 5, 6],
    [5, 6, 4, 5],
    [5, 4, 5, 6],
  ],
  piecesy: [
    [1, 1, 1, 1],
    [1, 2, 2, 2],
    [1, 1, 2, 2],
    [1, 2, 2, 2],
    [1, 1, 2, 2],
    [1, 1, 2, 2],
    [1, 2, 2, 2],
  ],
};

function clearGrid() {
  let grid = document.querySelector("#wrapper > div.gameContainer > div");
  let gridCells = grid.querySelectorAll("*");
  for (let i = 0; i < gridCells.length; i++) {
    let cell = gridCells[i];
    cell.style.backgroundColor = "black";
  }
}

function renderOccupiedPositions() {
  if (occupiedPositions.length > 0) {
    for (let color in occupiedPositionsx) {
      for (let i = 0; i < occupiedPositionsy[color].length; i++) {
        console.log(i);
        let row = occupiedPositionsy[color][i];

        let col = occupiedPositionsx[color][i];
        console.log(row, col);
        for (let j = 0; j < 4; j++) {
          let cell = (row - 1) * 10 + col;
          let selector = document.getElementById(cell);
          selector.style.backgroundColor = color;
          console.log(selector);
        }
      }
    }
  }
}
function renderCurrentPiece() {
  for (f = 0; f < 4; f++) {
    let selector =
      ".row" + currentPiece.positionsy[f] + ".col" + currentPiece.positionsx[f];
    let query = document.querySelector(selector);
    query.style.backgroundColor = currentPiece.color;
  }
}

function renderGrid() {
  clearGrid();
  renderOccupiedPositions();
  renderCurrentPiece();
}

function move() {
  checkCollision();
  renderGrid();

  for (let i = 0; i < 4; i++) {
    currentPiece.positionsy[i] += 1;
  }
}

function saveGrid() {
  console.log("saveGrid()");

  for (let i = 0; i < 4; i++) {
    let row = currentPiece.positionsy[i];
    let col = currentPiece.positionsx[i];
    let piece = currentPiece.color;
    occupiedPositionsx[piece].push(col);
    occupiedPositionsy[piece].push(row);
    let coord = (row - 1) * 10 + col;
    console.log(coord);
    if (occupiedPositions.includes(coord)) {
      occupiedPositions.push(coord);
    }
  }
  currentPiece.selectPiece();
}

function checkCollision() {
  for (let i = 0; i < 4; i++) {
    let row = currentPiece.positionsy[i];
    let col = currentPiece.positionsx[i];
    let coord = (row - 1) * 10 + col;
    if (occupiedPositions.includes(coord - 10)) {
      saveGrid();
    } else if (row === 20) {
      saveGrid();
    }
  }
}

currentPiece.selectPiece();
