const cellContainer = document.getElementById("cell-container");
const playBtn = document.getElementById("play-btn");

let boardState = {};
let activePiece;
let shapes = [
  {
    name: "T",
    color: "purple",
    shape: [1, (1 + 10), (2 + 10), (3 + 10)],
  }
]

function initPageState() {
  for (let i = 0; i < 200; i++) {
    boardState[i] = "black";
    const cell = document.createElement("div");
    cell.className = "grid";
    cell.id = i;
    cellContainer.appendChild(cell);
  }
}
initPageState();
console.log(boardState);

// document.addEventListener("keydown", handleKeyDown);
playBtn.addEventListener("click", wrapToggle);

function wrapToggle() {
  let intervalId;
  let started;
  function toggleGame() {
    if (started) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(renderBoard, 1000);
    }
    playBtn.textContent = started ? "Pause" : "Play";
    started = !started;
  }
  toggleGame();
}

function renderBoard() {
  for (let key in boardState) {
    document.getElementById(key).style.background = boardState[key];
  }
}

function computePiece() {
  updateBoardState(shapes[0]);
  renderBoard();
}

function updateBoardState(piece) {
  for (let i = 0; i < piece.shape.length; i++) {
    boardState[piece.shape[i]] = piece.color;
  }
  return piece;
}