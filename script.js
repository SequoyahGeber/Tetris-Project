const cellContainer = document.getElementById("cell-container");
const playBtn = document.getElementById("play-btn");

let boardState = [];
// board sate has form:
// [
//   {id: 0, color: "black", active: false},
//   ...
// ]
// Where id is the cell number, and active represents if the cell is part of the active piece

let activePiece;

let shapes = [
  {
    name: "T",
    color: "purple",
    shape: [1, 10, 1 + 10, 2 + 10],
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
      intervalId = setInterval(computePiece, 100);
    }
    started = !started;
  }
  toggleGame();
}

function clearBoard() {
  for (let i = 0; i < 200; i++) {
    document.getElementById(i).style.background = "black";
  }
}

function renderBoard() {
  clearBoard();
  for (let key in boardState) {
    document.getElementById(key).style.background = boardState[key];
  }
}

function computePiece() {
  if (!activePiece) {
    const randomPiece = shapes[Math.floor(Math.random() * shapes.length)];
    activePiece = randomPiece;
    const pieceNewPos = updateBoardState(activePiece);
    renderBoard(pieceNewPos);
  } else {
    const pieceNewPos = updateBoardState(activePiece);
    if (pieceNewPos.shape[3] >= 190) {
      activePiece = null;
      renderBoard(pieceNewPos);
      return;
    }
  }
  renderBoard();
}

function updateBoardState(piece) {
  for (let i = 0; i < piece.shape.length; i++) {
    piece.shape[i] += 10;
    boardState[piece.shape[i]] = piece.color;
  }
  return piece;
}
