const cellContainer = document.getElementById("cell-container");
const playBtn = document.getElementById("play-btn");

let boardState = [];
let activePiece = undefined;
let occupied = [];
// order for shape of shapes, highest, ..., lowest.
const shapes = [
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
    shape: [1 + 4, 11 + 4, 20 + 4, 21 + 4],
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

document.addEventListener("keydown", handleKeyDown);
playBtn.addEventListener("click", wrapToggle);

let intervalId;
let started = false;
function wrapToggle() {
  function toggleGame() {
    if (started) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(renderBoard, 1000);
    }
    started = !started;
  }
  toggleGame();
}
function handleKeyDown(e) {
  const key = e.key;
  function updatePos(amt) {
    activePiece.shape = activePiece.shape.map(value => value + amt);
    activePiece.shape.forEach(value => {
      boardState.forEach(cell => {
        if (cell.id === value) {
          cell.color = "black";
          cell.active = false;
        }
      });
    });
    renderBoard();
  }
  switch (key) {
    case "ArrowLeft":
      updatePos(-1);
      break;
    case "ArrowRight":
      updatePos(1);
      break;
    case "ArrowDown":
      updatePos();
      break;
    case "ArrowUp":
      rotate();
      break;
    default:
      break;
  }
}

function renderBoard() {
  console.log(shapes);
  if (activePiece === undefined) {
    activePiece = JSON.parse(
      JSON.stringify(shapes[Math.floor(Math.random() * 7)])
    );
  }
  giveNewPiecePosition();
  colorBoard();
  boardState.forEach((cell) => {
    const cellDom = document.getElementById(cell.id);
    cellDom.style.backgroundColor = cell.color;
  });
}

function colorBoard() {
  activePiece.shape.forEach((cellId) => {
    const cell = boardState.find((cell) => cell.id === cellId);
    if (cell) {
      cell.color = activePiece.color;
      cell.active = true;
    }
  });
}

function giveNewPiecePosition() {
  if (
    activePiece.shape.some((value) => {
      return value >= 190 || occupied.includes(value + 10);
    })
  ) {
    occupied = occupied.concat(activePiece.shape);
    boardState.forEach((cell) => {
      if (cell.active) {
        cell.active = false;
      }
    });
    activePiece = undefined;
  } else {
    activePiece.shape = activePiece.shape.map((value) => {
      boardState.forEach((cell) => {
        if (cell.id === value) {
          cell.color = "black";
        }
      });
      const newValue = value + 10;
      return newValue;
    });
  }
}
