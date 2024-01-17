let gamePieces = [0, 1, 2, 3, 4, 5, 6];
let position = {
  pos1: null,
  pos2: null,
  pos3: null,
  pos4: null,
};
let currentPiece;
let pieceColor;
let started;
let intervalId;
let orange = [];
let currentArray;
let occupied = [];
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
  orange: [],
  cyan: [],
  purple: [],
  blue: [],
  yellow: [],
  green: [],
  red: [],
};

document.addEventListener("keydown", handleKeyDown);

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", toggleGame);

let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", toggleGame);

function toggleGame() {
  if (started) {
    clearInterval(intervalId);
  } else {
    intervalId = setInterval(pieceMove, 100);
  }
  started = !started;
}

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
  } else if (currentPiece >= 0) {
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

  function computePiece(randomNumberIndexNumber) {
    const randomizeStart = Math.floor(Math.random() * 9);
    pieceColor = colorsArray[randomNumberIndexNumber];
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

function saveGrid() {
  const colorArgRef = colorColorArrDic[pieceColor];
  colorArgRef.push(position);
  currentArray = colorArgRef;
  setPiece();
}

function updateGrid() {
  resetGrid();
  occupied = [];
  for (let key in colorColorArrDic) {
    colorColorArrDic[key].forEach((i) => {
      for (let pos in i) {
        document.getElementById(i[pos]).style.backgroundColor = key;
        if (!occupied.includes(i[pos])) {
          occupied.push(i[pos]);
        }
      }
    })
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

// function rotatePieceLeft() {
//   const currentCurrentPiece = currentPiece;

//   function rotatePieceByAmount(diffArr) {
//     let someVar = 0;
//     for (let pos in position) {
//       position[pos] += diffArr[someVar];
//       someVar++;
//     }
//   }
//   let jPieceOne = 0;
//   switch (currentCurrentPiece) {
//     case 0: // J piece
//       // Define four positions for 90-degree rotation
//       // Update currentPiece array accordingly
//       // const firstRotationJ = [1, 11, 21, 22];
//       // const secondRotationJ = [11, 12, 13, 3];
//       // const thirdRotationJ = [22, 12, 2, 1];
//       // const fourthRotationJ = [1, 11, 21, 22];
//       const possiblePositions = [
//         [10, 1, -8, -19],
//         [11, 0, -11, -2],
//         [-21, -1, 19, 21],
//       ];
//       if (jPieceOne === 2) {
//         jPieceOne = 0;
//       }
//       rotatePieceByAmount(possiblePositions[jPieceOne]);
//       jPieceOne++;
//       break;
//     case 1: // L piece
//       // Define four positions for 90-degree rotation
//       // Update currentPiece array accordingly
//       // const firstRotationL = [1, 11, 21, 12];
//       const secondRotationL = [11, 12, 13, 2];
//       const thirdRotationL = [22, 11, 2, 11];
//       const fourthRotationL = [1, 11, 21, 12];
//       break;
//     default:
//       break;
//     // case 3: // I piece
//     //   // Define four positions for 90-degree rotation
//     //   // Update currentPiece array accordingly
//     //   const firstRotationI = [1, 11, 21, 31];
//     //   const secondRotationI = [12, 2, 1, 11];
//     //   const thirdRotationI = [21, 11, 1, 2];
//     //   const fourthRotationI = [11, 21, 22, 12];
//     //   break;
//     // case 4: // S piece
//     //   // Define four positions for 90-degree rotation
//     //   // Update currentPiece array accordingly
//     //   const firstRotationS = [2, 11, 12, 21];
//     //   const secondRotationS = [12, 2, 1, 11];
//     //   const thirdRotationS = [21, 11, 1, 2];
//     //   const fourthRotationS = [11, 21, 22, 12];
//     //   break;
//     // case 5: // T piece
//     //   // Define four positions for 90-degree rotation
//     //   // Update currentPiece array accordingly
//     //   const firstRotationT = [1, 11, 12, 21];
//     //   const secondRotationT = [12, 2, 1, 11];
//     //   const thirdRotationT = [21, 11, 1, 2];
//     //   const fourthRotationT = [11, 21, 22, 12];
//     //   break;
//     // case 6: // Z piece
//     //   // Define four positions for 90-degree rotation
//     //   // Update currentPiece array accordingly
//     //   const firstRotationZ = [1, 11, 12, 22];
//     //   const secondRotationZ = [12, 2, 1, 11];
//     //   const thirdRotationZ = [21, 11, 1, 2];
//     //   const fourthRotationZ = [11, 21, 22, 12];
//     //   break;
//   }
// }
