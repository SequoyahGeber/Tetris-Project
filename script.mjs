import { shapes } from "./shapes.mjs";

const playBtn = document.getElementById("play-btn");

let boardState = [];
let activePiece = undefined;
let intervalId;
let started = false;

playBtn.addEventListener("click", () => {
  console.log("play button has been clicked");
  if (!started) {
    intervalId = setInterval(gameLoop, 1000);
  } else {
    clearInterval(intervalId);
  }
  started = !started;
});

function initBoardState() {
  console.log("init board state has run");
  for (let i = 0; i < 200; i++) {
    boardState.push({ id: i, color: "black", active: false, occupied: false });
  }
}
initBoardState();

function gameLoop() {
  console.log("game loop has run");
  if (activePiece === undefined) {
    console.log("There was no active piece, creating one.");
    activePiece = createPiece();
  } else {
    console.log("There was an active piece, moving it down.");
    movePieceDown();
  }
  updateBoard();
}

function createPiece() {
  console.log("create piece has run");
  const randomShape = structuredClone(
    shapes[Math.floor(Math.random() * shapes.length)]
  );
  console.log("Create piece created: ", randomShape);
  return randomShape;
}

function movePieceDown() {
  console.log("move piece down has run");
  function newCellStat(val, occ, act, colo) {
    boardState[val].occupied = occ;
    boardState[val].active = act;
    boardState[val].color = colo;
  }
  if (
    activePiece.shape.some((value) => {
      const newIndex = value + 10;
      return (
        newIndex >= 200 ||
        (boardState[newIndex].occupied && !boardState[newIndex].active)
      );
    })
  ) {
    console.log("YES COLLIDE ON NEXT MOVE");
    activePiece.shape.forEach((value) => {
      newCellStat(value, true, false, activePiece.color);
    });
    activePiece = undefined;
    console.log("Piece has NOT been moved down");
  } else {
    console.log("NO COLLIDE ON NEXT MOVE");
    activePiece.shape.forEach((value) => {
      newCellStat(value, false, false, "black");
    });
    activePiece.shape = activePiece.shape.map((cell) => cell + 10);
    activePiece.shape.forEach((value) => {
      newCellStat(value, true, true, activePiece.color);
    });
    console.log("Piece has been moved down");
  }
}

function updateBoard() {
  console.log("update board has run");
  boardState.forEach((cell) => {
    const cellDiv = document.getElementById(cell.id);
    cellDiv.style.backgroundColor = cell.color;
  });
}
