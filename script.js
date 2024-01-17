let gamePieces = [0, 1, 2, 3, 4, 5, 6];
let position = {
  pos1: null,
  pos2: null,
  pos3: null,
  pos4: null,
};

let currentPiece = null;
let pieceColor = null;
let started;

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

function startGame() {
  if (started !== true) {
    intervalId = setInterval(pieceMove, 100);
    started = true;
    console.log("Game Started");
  }
}

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopGame);

function stopGame() {
  if (started == true) {
    clearInterval(intervalId);
    started = false;
    console.log("Game Stopped");
  }
}

intervalId = null;

function pieceMove() {
  console.log("Moved");
  if (
    Object.values(position).some((pos) => {
      return occupied.includes(pos + 10);
    })
  ) {
    saveGrid();
  }

  if (Object.values(position).some((pos) => pos >= 191)) {
    saveGrid();
  } else if (currentPiece !== null) {
    // resetGrid();
    updateGrid();
    for (let pos in position) {
      position[pos] += 10;
      document.getElementById(position[pos]).style.backgroundColor = pieceColor;
    }
  }
}

function setPiece() {
  position = { pos1: null, pos2: null, pos3: null, pos4: null };
  currentPiece = Math.floor(Math.random() * 7);

  const pieces = [
    [1, 11, 21, 22], //J
    [1, 11, 21, 12], //L
    [1, 2, 11, 12], //O
    [1, 11, 21, 31], //I
    [2, 11, 12, 21], //S
    [1, 11, 12, 21], //T
    [1, 11, 12, 22], //Z
  ];

  const possiblePieceColors = [
    "blue",
    "orange",
    "yellow",
    "cyan",
    "green",
    "purple",
    "red",
  ];

  function computePiece(randomNumberIndexNumber) {
    const randomizeStart = Math.floor(Math.random() * 9);
    pieceColor = possiblePieceColors[randomNumberIndexNumber];
    let piecePositions = pieces[randomNumberIndexNumber];
    let i = 0;
    for (let pos in position) {
      const newComputedPosition = piecePositions[i] - 10 + randomizeStart;
      position[pos] = newComputedPosition;
      i++;
    }
  }
  computePiece(currentPiece);
}
setPiece();

function resetGrid() {
  gridCells = document.getElementsByClassName("gridCell");

  cellsArray = Array.from(gridCells);

  cellsArray.forEach(function (cell) {
    cell.style.backgroundColor = "black";
  });
}

let orange = [];
let cyan = [];
let purple = [];
let blue = [];
let yellow = [];
let green = [];
let red = [];
let currentArray;
let colorSet;
let updateArray = [];
let colorsArray = [
  "orange",
  "cyan",
  "purple",
  "blue",
  "yellow",
  "green",
  "red",
];
let colorColorArrDic = {
  orange: orange,
  cyan: cyan,
  purple: purple,
  blue: blue,
  yellow: yellow,
  green: green,
  red: red,
};

function saveGrid() {
  const colorArgRef = colorColorArrDic[pieceColor];
  colorArgRef.push(position);
  currentArray = colorArgRef;
  setPiece();

  // if (pieceColor == "orange") {
  //   orange.push(position);
  //   console.log(orange);
  //   currentArray = orange;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "cyan") {
  //   cyan.push(position);
  //   console.log(cyan);
  //   currentArray = cyan;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "purple") {
  //   purple.push(position);
  //   console.log(purple);
  //   currentArray = purple;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "blue") {
  //   blue.push(position);
  //   console.log(blue);
  //   currentArray = blue;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "yellow") {
  //   yellow.push(position);
  //   console.log(yellow);
  //   currentArray = yellow;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "green") {
  //   green.push(position);
  //   console.log(green);
  //   currentArray = green;
  //   console.log("Positions Added");
  //   setPiece();
  // } else if (pieceColor == "red") {
  //   red.push(position);
  //   console.log(red);
  //   currentArray = red;
  //   console.log("Positions Added");
  //   setPiece();
  // }
}
let occupied = [];
function updateGrid() {
  resetGrid();
  updateArray = [];
  occupied = [];
  updateArray.push(orange, cyan, purple, blue, yellow, green, red);
  console.log(updateArray);
  for (let i = 0; i < updateArray.length; i++) {
    let x = updateArray[i];
    let z = i;
    for (let j = 0; j < x.length; j++) {
      let y = x[j];
      for (let pos in y) {
        document.getElementById(y[pos]).style.backgroundColor = colorsArray[z];
        if (!occupied.includes(y[pos])) {
          occupied.push(y[pos]);
        }
      }
      // if (!occupied.includes(y.pos1)) {
      //   occupied.push(y.pos1);
      // }
      // if (!occupied.includes(y.pos2)) {
      //   occupied.push(y.pos2);
      // }
      // if (!occupied.includes(y.pos3)) {
      //   occupied.push(y.pos3);
      // }
      // if (!occupied.includes(y.pos4)) {
      //   occupied.push(y.pos4);
      // }
    }
  }
  console.log("Occupied Positions:", occupied);
}

function handleKeyDown(e) {
  const key = e.key;
  function updatePosition(amt) {
    for (let pos in position) {
      position[pos] += amt;
    }
  }
  switch (key) {
    case "ArrowLeft":
      updatePosition(-1);
      break;
    case "ArrowRight":
      updatePosition(1);
      break;
    case "ArrowDown":
      updatePosition(10);
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

//   if (event.key === "ArrowLeft") {
//     position.pos1 -= 1;
//     position.pos2 -= 1;
//     position.pos3 -= 1;
//     position.pos4 -= 1;
//     pieceMove();
//     console.log("Left arrow key pressed");
//   } else if (event.key === "ArrowRight") {
//     position.pos1 += 1;
//     position.pos2 += 1;
//     position.pos3 += 1;
//     position.pos4 += 1;
//     pieceMove();
//     console.log("Right arrow key pressed");
//   } else if (event.key === "ArrowDown") {
//     position.pos1 += 10;
//     position.pos2 += 10;
//     position.pos3 += 10;
//     position.pos4 += 10;
//     pieceMove();
//     console.log("Down arrow key pressed");
//   } else if (event.key === "a") {
//     rotatePieceLeft()
//     pieceMove();
//     console.log("Left arrow key pressed");
//   } else if (event.key === "d") {
//     // rotatePieceRight();
//     pieceMove();
//     console.log("Right arrow key pressed");
//   }
// });

function rotatePieceLeft() {
  const currentCurrentPiece = currentPiece;

  function rotatePieceByAmount(diffArr) {
    let someVar = 0;
    for (let pos in position) {
      position[pos] += diffArr[someVar];
      someVar++;
    }
  }
  let jPieceOne = 0;
  switch (currentCurrentPiece) {
    case 0: // J piece
      // Define four positions for 90-degree rotation
      // Update currentPiece array accordingly
      // const firstRotationJ = [1, 11, 21, 22];
      // const secondRotationJ = [11, 12, 13, 3];
      // const thirdRotationJ = [22, 12, 2, 1];
      // const fourthRotationJ = [1, 11, 21, 22];
      const possiblePositions = [
        [10, 1, -8, -19],
        [11, 0, -11, -2],
        [-21, -1, 19, 21],
      ];
      if (jPieceOne === 3) {
        jPieceOne = 0;
      }
      rotatePieceByAmount(possiblePositions[jPieceOne]);
      break;
    case 1: // L piece
      // Define four positions for 90-degree rotation
      // Update currentPiece array accordingly
      // const firstRotationL = [1, 11, 21, 12];
      const secondRotationL = [11, 12, 13, 2];
      const thirdRotationL = [22, 11, 2, 11];
      const fourthRotationL = [1, 11, 21, 12];
      break;
    default:
      break;
    // case 3: // I piece
    //   // Define four positions for 90-degree rotation
    //   // Update currentPiece array accordingly
    //   const firstRotationI = [1, 11, 21, 31];
    //   const secondRotationI = [12, 2, 1, 11];
    //   const thirdRotationI = [21, 11, 1, 2];
    //   const fourthRotationI = [11, 21, 22, 12];
    //   break;
    // case 4: // S piece
    //   // Define four positions for 90-degree rotation
    //   // Update currentPiece array accordingly
    //   const firstRotationS = [2, 11, 12, 21];
    //   const secondRotationS = [12, 2, 1, 11];
    //   const thirdRotationS = [21, 11, 1, 2];
    //   const fourthRotationS = [11, 21, 22, 12];
    //   break;
    // case 5: // T piece
    //   // Define four positions for 90-degree rotation
    //   // Update currentPiece array accordingly
    //   const firstRotationT = [1, 11, 12, 21];
    //   const secondRotationT = [12, 2, 1, 11];
    //   const thirdRotationT = [21, 11, 1, 2];
    //   const fourthRotationT = [11, 21, 22, 12];
    //   break;
    // case 6: // Z piece
    //   // Define four positions for 90-degree rotation
    //   // Update currentPiece array accordingly
    //   const firstRotationZ = [1, 11, 12, 22];
    //   const secondRotationZ = [12, 2, 1, 11];
    //   const thirdRotationZ = [21, 11, 1, 2];
    //   const fourthRotationZ = [11, 21, 22, 12];
    //   break;
  }
}
