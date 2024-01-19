// let gamePieces = [0, 1, 2, 3, 4, 5, 6];
// let position = {
//   pos1: null,
//   pos2: null,
//   pos3: null,
//   pos4: null,
// };

// let currentPiece = null;
// let pieceColor = null;
// let started;
// let score = 0;

// intervalId = null;

// function pieceMove() {
//   console.log("Moved");
//   if (
//     Object.values(position).some((pos) => {
//       return occupied.includes(pos + 10);
//     })
//   ) {
//     saveGrid();
//   }

//   if (Object.values(position).some((pos) => pos >= 191)) {
//     saveGrid();
//   } else if (currentPiece !== null) {
//     // resetGrid();
//     updateGrid();
//     for (let pos in position) {
//       position[pos] += 10;
//       document.getElementById(position[pos]).style.backgroundColor = pieceColor;
//     }
//   }
// }

// function setPiece() {
//   position = { pos1: null, pos2: null, pos3: null, pos4: null };
//   currentPiece = Math.floor(Math.random() * 7);

//   const pieces = [
//     [1, 11, 21, 22], //J
//     [1, 11, 21, 12], //L
//     [1, 2, 11, 12], //O
//     [1, 11, 21, 31], //I
//     [2, 11, 12, 21], //S
//     [1, 11, 12, 21], //T
//     [1, 11, 12, 22], //Z
//   ];

//   const possiblePieceColors = [
//     "blue",
//     "orange",
//     "yellow",
//     "cyan",
//     "green",
//     "purple",
//     "red",
//   ];

//   function computePiece(randomNumberIndexNumber) {
//     const randomizeStart = Math.floor(Math.random() * 9);
//     pieceColor = possiblePieceColors[randomNumberIndexNumber];
//     let piecePositions = pieces[randomNumberIndexNumber];
//     let i = 0;
//     for (let pos in position) {
//       const newComputedPosition = piecePositions[i] - 10 + randomizeStart;
//       position[pos] = newComputedPosition;
//       i++;
//     }
//   }
//   computePiece(currentPiece);
// }
// setPiece();

// function resetGrid() {
//   gridCells = document.getElementsByClassName("gridCell");

//   cellsArray = Array.from(gridCells);

//   cellsArray.forEach(function (cell) {
//     cell.style.backgroundColor = "black";
//   });
// }

// let orange = [];
// let cyan = [];
// let purple = [];
// let blue = [];
// let yellow = [];
// let green = [];
// let red = [];
// let currentArray;
// let colorSet;
// let updateArray = [];
// let colorsArray = [
//   "orange",
//   "cyan",
//   "purple",
//   "blue",
//   "yellow",
//   "green",
//   "red",
// ];
// let colorColorArrDic = {
//   orange: orange,
//   cyan: cyan,
//   purple: purple,
//   blue: blue,
//   yellow: yellow,
//   green: green,
//   red: red,
// };

// function saveGrid() {
//   const colorArgRef = colorColorArrDic[pieceColor];
//   colorArgRef.push(position);
//   currentArray = colorArgRef;
//   setPiece();
// }
// let occupied = [];
// function updateGrid() {
//   resetGrid();
//   updateArray = [];
//   occupied = [];
//   updateArray.push(orange, cyan, purple, blue, yellow, green, red);
//   console.log(updateArray);
//   for (let i = 0; i < updateArray.length; i++) {
//     let x = updateArray[i];
//     let z = i;
//     for (let j = 0; j < x.length; j++) {
//       let y = x[j];
//       for (let pos in y) {
//         document.getElementById(y[pos]).style.backgroundColor = colorsArray[z];
//         if (!occupied.includes(y[pos])) {
//           occupied.push(y[pos]);
//         }
//       }
//     }
//   }
//   console.log("Occupied Positions:", occupied);
// }

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

function calculateScore(completedLines) {
  const scoreMultiplier = [0, 40, 100, 300, 1200];
  score += scoreMultiplier[completedLines] || 0;
}

function setScore() {
  document.getElementById("score").innerText = newScore;
}

let currentPiece = {
  selectPiece: function () {
    this.i = Math.floor(Math.random() * 1);

    console.log("Current Piece: " + this.gamePieces[this.i].color);
  },
  i: 0,
  positionsx: [],
  positionsy: [],

  coordinatesx: function () {
    const pieces = [
      [1, 1, 1, 1],
      [(3, 1, 2, 3)],
      [(1, 2, 1, 2)],
      [(1, 1, 2, 3)],
      [(1, 2, 2, 3)],
      [(2, 3, 1, 2)],
      [(2, 1, 2, 3)],
      // [0, 0, 0],
      // [-2, -1, 0],
      // [1, 0, 1],
      // [0, 1, 2],
      // [1, 1, 2],
      // [1, -2, 0],
      // [-1, 0, 1],
    ];
    this.positionsx = [pieces[this.i]];
  },
  coordinatesy: function () {
    const pieces = [
      [1,2,3,4],
      [1,2,2,2],
      [1,1,2,2],
      [1,2,2,2],
      [1,1,2,2],
      [1,1,2,2],
      [1,2,2,2],
      // [1, 2, 3],
      // [1, 1, 1],
      // [0, 1, 1],
      // [1, 1, 1],
      // [0, 1, 1],
      // [0, 1, 1],
      // [1, 1, 1],
    ];
    this.positionsy = [pieces[this.i]];
  },
  gamePieces: [
    {
      color: "cyan",
      initialx: 1,
      initialy: 1,
    },
    {
      color: "orange",
      initialx: 3,
      initialy: 1,
    },
    {
      color: "yellow",
      initialx: 1,
      initialy: 1,
    },
    {
      color: "blue",
      initialx: 1,
      initialy: 1,
    },
    {
      color: "red",
      initialx: 1,
      initialy: 1,
    },
    {
      color: "green",
      initialx: 2,
      initialy: 1,
    },
    {
      color: "purple",
      initialx: 2,
      initialy: 1,
    },
  ],
};

function renderGrid(occupiedPositions) {
  console.log("renderGrid()");
  for (i = 0; i <= 3; i++) {
    document.getElementById(currentPiece.positionx[i]).style.backgroundColor =
      currentPiece.color;
    document.getElementById(currentPiece.positiony[i]).style.backgroundColor =
      currentPiece.color;
  }
}

function move() {
  checkCollion();

  renderGrid();
}

function savePositions(occupiedPositions) {
  console.log("savePositions()");
  occupiedPositions[currentPiece.type].push(currentPiece.x);
  occupiedPositions[currentPiece.type].push(currentPiece.y);
}

function saveGrid() {
  console.log("saveGrid()");
  savePositions(occupiedPositions);
  let occupiedPositions = {
    cyanx: [],
    cyany: [],

    orangex: [],
    orangey: [],

    yellowx: [],
    yellowy: [],

    bluex: [],
    bluey: [],

    redx: [],
    redy: [],

    greenx: [],
    greeny: [],

    purplex: [],
    purpley: [],
  };
  renderGrid(occupiedPositions);
}

function checkCollion() {
  saveGrid();
  if (collided) {
    currentPiece.selectPiece();
  }
}
