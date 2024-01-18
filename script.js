const cellContainer = document.getElementById("cell-container");
const playBtn = document.getElementById("play-btn");

let boardState = [];
let activePiece;
let occupied = [];
// order for shape of shapes, highest, ..., lowest.
let shapes = [
  {
    name: "T",
    color: "purple",
    shape: [5, 14, 15, 16],
  },
  {
    name: "L",
    color: "orange",
    shape: [4, 14, 24, 25],
  },
  {
    name: "J",
    color: "blue",
    shape: [1+4, 11+4, 20+4, 21+4],
  },
  {
    name: "S",
    color: "green",
    shape: [4, 5, 15, 16],
  },
  {
    name: "Z",
    color: "red",
    shape: [5, 6, 14, 15],
  },
  {
    name: "I",
    color: "cyan",
    shape: [4, 14, 24, 34],
  },
  {
    name: "O",
    color: "yellow",
    shape: [4, 5, 14, 15],
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
  renderBoard();
}
entry();

function renderBoard() {
  console.log("rendering board");
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
  if (!activePiece) {
    activePiece = shapes[Math.floor(Math.random() * shapes.length)];
  }
  if (activePiece.shape.some((value) => value >= 190 || occupied.includes(value + 10))) {
    console.log("getting new piece position");
    occupied = occupied.concat(activePiece.shape);
    for (let cell in boardState) {
      if (boardState[cell].active) {
        boardState[cell].active = false;
      }
    }
    activePiece = null;
    entry();
  } else {
    console.log("moving piece down")
    activePiece.shape = activePiece.shape.map(value => {
      boardState.find((cell) => {if(cell.id === value){cell.color = "black"}});
      const newValue = value + 10;
      console.log(newValue);
      return newValue;
    });
  }
}
