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
    shape: [5, 15, 24, 25],
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
  // let newIndex = activePiece.shape[3] + 10;
  // loop the values, check for collision with non-active
  // if (newIndex >= 200 || boardState[newIndex].occupied) 
  if (
    activePiece.shape.some((value) => {
      const newIndex = value + 10;
      return (newIndex >= 200 || (boardState[newIndex].occupied && !boardState[newIndex].active))
    })
  )
  {
    console.log("YES COLLIDE ON NEXT MOVE");
    activePiece.shape.forEach((value) => {
      boardState[value].occupied = true;
      boardState[value].active = false;
    });
    activePiece = undefined;
    console.log("Piece has NOT been moved down");
  } else {
    console.log("NO COLLIDE ON NEXT MOVE");
    activePiece.shape.forEach((value) => {
      boardState[value].occupied = false;
      boardState[value].active = false;
      boardState[value].color = "black";
    });
    activePiece.shape = activePiece.shape.map((cell) => cell + 10);
    activePiece.shape.forEach((value) => {
      boardState[value].occupied = true;
      boardState[value].active = true;
      boardState[value].color = activePiece.color;
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
