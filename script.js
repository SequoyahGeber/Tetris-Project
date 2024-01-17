const cellContainer = document.getElementById("cell-container");
const playBtn = document.getElementById("play-btn");

let boardState = [];
let activePiece;

let shapes = [
  {
    name: "T",
    color: "purple",
    shape: [5, 5 + 10, 5 + 1 + 10, 2 + 5 + 10],
  },
  {
    name: "L",
    color: "orange",
    shape: [0, 10, 20, 21],
  },
];

function initPageState() {
  for (let i = 0; i < 200; i++) {
    boardState.push({ id: i, color: "black", active: false });
    const cell = document.createElement("div");
    cell.className = "grid";
    cell.id = i;
    cellContainer.appendChild(cell);
  }
}
initPageState();

// document.addEventListener("keydown", handleKeyDown);
playBtn.addEventListener("click", wrapToggle);

function wrapToggle() {
  let intervalId;
  let started;
  function toggleGame() {
    if (started) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(renderBoard, 500);
    }
    started = !started;
  }
  toggleGame();
}
// Render board purpose is to render the board state to the DOM based on boardState

function entry() {
  console.log("entry");
  activePiece = shapes[Math.floor(Math.random() * shapes.length)];
}
entry();

function renderBoard() {
  console.log("rendering board");
  clearBoard();
  giveNewPiecePosition();
  colorBoard();
  boardState.forEach((cell) => {
    const cellDom = document.getElementById(cell.id);
    cellDom.style.backgroundColor = cell.color;
  });
}

function colorBoard() {
  console.log("coloring board")
  activePiece.shape.forEach((cellId) => {
    const cell = boardState.find((cell) => cell.id === cellId);
    if (cell) {
      cell.color = activePiece.color;
      cell.active = true;
    }
  });
}

function clearBoard() {
  console.log("clearing board");
  boardState.forEach((cell) => {
    cell.color = "black";
    cell.active = false;
  });
}

function giveNewPiecePosition() {
  if (activePiece.shape.some((value) => value >= 190)) {
    console.log("getting new piece position");
    for (let cell in boardState) {
      if (boardState[cell].active) {
        boardState[cell].active = false;
      }
    }
  } else {
    console.log("moving piece down")
    activePiece.shape = activePiece.shape.map(value => {
      const newValue = value + 10;
      console.log(newValue);
      return newValue;
    });
  }
}
