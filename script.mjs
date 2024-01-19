"use strict";

import { shapes } from "./shapes.mjs";

const playBtn = document.getElementById("play-btn");
document.addEventListener("keydown", handleKeyPress);

let boardState = [];
let activePiece = undefined;
let animationId = undefined;
let intervalId = undefined;
let started = false;

playBtn.addEventListener("click", () => {
  console.log("play button has been clicked");
  if (!started) {
    intervalId = setInterval(gameLoop, 1000);
    animationId = window.requestAnimationFrame(updateBoard);
  } else {
    clearInterval(intervalId);
    window.cancelAnimationFrame(animationId);
  }
  started = !started;
});

function handleKeyPress(e) {
  function movePiece(amt) {
    if (activePiece !== undefined) {
      activePiece.shape.forEach((value) => {
        newCellStat(value, true, true, "black");
      });
      activePiece.shape = activePiece.shape.map((value) => (value += amt));
      activePiece.shape.forEach((value) => {
        newCellStat(value, false, true, activePiece.color);
      });
      console.log(
        "moved by: ",
        amt,
        " active piece now has: ",
        activePiece.shape
      );
    }
  }

  function rotate90() {
    console.log("Rotation has been called with old shape: ", activePiece.shape);
    const pointOfRotationCellNumber = activePiece.shape[1];
    const pointOfRotationCoords = [pointOfRotationCellNumber%10, Math.floor(pointOfRotationCellNumber/10)];
    activePiece.shape.forEach((value) => {
      newCellStat(value, false, false, "black");
    })
    activePiece.shape = activePiece.shape.map((value) => {
      if (value === pointOfRotationCellNumber) {
        console.log("Rotation Point", value);
        return value;
      } else {
        console.log("Regular point old", value);
        const x = value % 10;
        const y = Math.floor(value / 10);
        const newX = pointOfRotationCoords[0] + (y - pointOfRotationCoords[1])
        const newY = pointOfRotationCoords[1] + (x - pointOfRotationCoords[0])
        console.log("Regular point new", value);
        return newY * 10 + newX
      }
    })
    console.log("Rotation has been completed with new shape: ", activePiece.shape)
    activePiece.shape.forEach((value) => {
      newCellStat(value, false, true, activePiece.color);
    })
  }

  const key = e.key;
  console.log("key pressed: ", key);
  switch (key) {
    case "ArrowLeft":
      movePiece(-1);
      break;
    case "ArrowRight":
      movePiece(1);
      break;
    case "ArrowUp":
      rotate90();
      break;
  }
}

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
    activePiece.shape.forEach((value) => {
      newCellStat(value, true, true, activePiece.color);
    });
  } else {
    console.log("There was an active piece, moving it down.");
    movePieceDown();
  }
}

function createPiece() {
  console.log("create piece has run");
  const randomShape = structuredClone(
    shapes[Math.floor(Math.random() * shapes.length)]
  );
  console.log("Create piece created: ", randomShape);
  return randomShape;
}

function newCellStat(val, occ, act, colo) {
  boardState[val].occupied = occ;
  boardState[val].active = act;
  boardState[val].color = colo;
}

function movePieceDown() {
  console.log("move piece down has run");
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
    activePiece.shape = activePiece.shape.map((value) => value + 10);
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
  if (started) {
    window.requestAnimationFrame(updateBoard);
  }
}
