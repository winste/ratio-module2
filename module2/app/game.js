function isGameWon() {
  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      if (grid[i][j] == 2048) {
        localStorage.setItem("timer-start", false);
        clockStop();
        getTimeInTheEnd();
        removeListener(board,"pointerdown", mouseMove);
        removeListener(document,"keyup", moveCell);
        return true;
      }
    }
  }
  return false;
}


function removeListener(doc, listener, func) {
  doc.removeEventListener(`${listener}`, func);
}


function isGameOver() {
  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      if (
        grid[i][j] == 0 ||
        i !== 4 && grid[i][j] === grid[i + 1][j] ||
        j !== 4 && grid[i][j] === grid[i][j + 1]
        ) {
        return false;
      }
    }
  }
  return true;
}


function getTimeInTheEnd() {
  let h = +document.getElementById('hours').innerHTML * 3600000;
      m = +document.getElementById('minutes').innerHTML * 60000;
      s = +document.getElementById('seconds').innerHTML * 1000;
      ms = +document.getElementById('milliseconds').innerHTML;

  let totalTime = h + m + s + ms;
  
  if ( totalTime < localStorage.getItem('best-time') || localStorage.getItem('best-time') == null || localStorage.getItem('best-time') == '0') {
    localStorage.setItem('best-time', totalTime);
    let formattedTime = msToTime(totalTime);
    document.getElementById('best-result').innerHTML = formattedTime;
  }
}

function msToTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 100),
      seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60),
      hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}


let board = document.getElementById("board");
const distanceThreshold = 60;

let pDownX = null;
let pDownY = null;
let pMoveX = null;
let pMoveY = null;


function mouseMove(e) {
  e.preventDefault();
  pDownX = e.clientX;
  pDownY = e.clientY;
  board.addEventListener("pointermove", pointerMove);
}

board.addEventListener("pointerdown", mouseMove);

function getDirection(pDownX, pMoveX, pDownY, pMoveY) {
  let direction = null;

  if (pMoveX - pDownX > distanceThreshold) {
    direction = "R";
  } else if (pDownX - pMoveX > distanceThreshold) {
    direction = "L";
  } else if (pMoveY - pDownY > distanceThreshold) {
    direction = "D";
  } else if (pDownY - pMoveY > distanceThreshold) {
    direction = "U";
  }
  return direction;
}

function pointerMove(e) {
  pMoveX = e.clientX;
  pMoveY = e.clientY;
  if (e.pressure > 0) {
    let direction = getDirection(pDownX, pMoveX, pDownY, pMoveY);
    if (direction !== null) {
      moveCell(direction);
      startClockByMouse();
      board.removeEventListener("pointermove", pointerMove);
    }
  }
}


function moveCell(e) {
  let previousGrid = grid.toString();

  if (e.code) {
    switch (e.code) {
      case "ArrowLeft":
        slideLeft();
        break;
      case "ArrowRight":
        slideRight();
        break;
      case "ArrowUp":
        slideUp();
        break;
      case "ArrowDown":
        slideDown();
        break;
      default:
        return;
    }
  }
  else {
    switch (e) {
      case "L":
        slideLeft();
        break;
      case "R":
        slideRight();
        break;
      case "U":
        slideUp();
        break;
      case "D":
        slideDown();
        break;
      default:
        return;
    }
  }
  
  if (previousGrid !== grid.toString()) {
    decorateCell();
    generateNum();
    startClockByMouse();
  }

  if (isGameWon() || isGameOver()) {
    confirm("Game won! Play again?") ? window.location.reload() : false;
  }
}

document.addEventListener("keyup", moveCell);


