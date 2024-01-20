// function handleKeyDown(pressedKey) {
//   const key = pressedKey.key;
//   function updatePosition(vector) {
//     for (let pos in position) {
//       position[pos] += vector;
//     }
//   }
//   switch (key) {
//     case "ArrowLeft":
//       updatePosition(-1);
//       break;
//     case "ArrowRight":
//       updatePosition(1);
//       break;
//     case "ArrowDown":
//       updatePosition(10);
//       break;
//     case "a":
//       rotatePieceLeft();
//       break;
//     case "d":
//       rotatePieceRight();
//       break;
//   }
// }

// document.addEventListener("keydown", handleKeyDown);

//REWRITE OF SYSTEMS

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
let occupiedPositions = [211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
let startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

function startGame() {
  if (started !== true) {
    moveTimer = setInterval(move, 100);
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
    this.i = Math.floor(Math.random() * 7);
    this.color = this.gamePieces[this.i];
    this.positionsx = this.piecesx[this.i];
    this.positionsy = this.piecesy[this.i];

    // let randomStart = Math.floor(Math.random() * 9);
    // for (let f = 4; f >= 0; f--) {
    //   this.positionsx[f] += randomStart;

    //   if (this.positionsx[f] >= 10) {
    //     this.positionsx[f] -= 1;
    //   }
    // }

    // for (j = 0; j <= 4; j++) {
    //   this.positionsx[j] += randomStart;
    // }

    console.log("Current Piece: " + this.gamePieces[this.i]);
    console.log(this.positionsx);
  },
  color: null,
  i: null,
  positionsx: [],
  positionsy: [],
  gamePieces: ["cyan", "orange", "yellow", "blue", "red", "green", "purple"],
  piecesx: [
    [1, 1, 1, 1],
    [3, 1, 2, 3],
    [1, 2, 1, 2],
    [1, 1, 2, 3],
    [1, 2, 2, 3],
    [2, 3, 1, 2],
    [2, 1, 2, 3],
  ],
  piecesy: [
    [1, 2, 3, 4],
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
  for (let color in occupiedPositionsy) {
    for (let i = 0; i < occupiedPositionsx[color].length; i++) {
      let rows = occupiedPositionsx[color][i];
      let cols = occupiedPositionsy[color][i];
      for (let j = 0; j < rows.length; j++) {
        let occupiedCells = ".row" + cols[j] + ".col" + rows[j];
        let occupiedCellsQuery = document.querySelector(occupiedCells);
        occupiedCellsQuery.style.backgroundColor = color;
      }
    }
  }
}

function renderCurrentPiece() {
  for (let i = 0; i <= 3; i++) {
    let selector =
      ".row" + currentPiece.positionsy[i] + ".col" + currentPiece.positionsx[i];
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
}

function savePositions() {
  console.log("savePositions()");
  for (let i = 0; i <= 3; i++) {
    let position = currentPiece.positionsx[i] + currentPiece.positionsy[i] * 10;

    if (!occupiedPositions.includes(position)) {
      occupiedPositions.push(position);
    }
  }

  currentPiece.selectPiece();
}

function saveGrid() {
  console.log("saveGrid()");

  savePositions();
}

function checkCollision() {
  for (let i = 0; i < 4; i++) {
    let nextRow = currentPiece.positionsy[i] + 1;
    let nextCol = currentPiece.positionsx[i];

    if (nextRow <= 20) {
      let coord = nextCol + nextRow * 10;

      if (occupiedPositions.includes(coord)) {
        saveGrid();
        return;
      }
    } else {
      saveGrid();
      return;
    }
  }

  for (let i = 0; i < 4; i++) {
    currentPiece.positionsy[i] += 1;
  }

  renderGrid();
}

currentPiece.selectPiece();
