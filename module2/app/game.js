document.addEventListener("keyup", onePress);

function onePress(e) {
  if (motion.transitionEnding || motion.transitionEnding === null) {
    let cellsBeforeMoving = grid.checkGridChange();
    let eName = null;

    if (e.code) {
      eName = e.code;
      e.preventDefault();
    }
    else {
      eName = e;
    }
    timer.timerStart();
    
    switch (eName) {
      case "ArrowUp":
      case "Up":
        slideUp();
        break;
      case "ArrowDown":
      case "Down":
        slideDown();
        break;
      case "ArrowLeft":
      case "Left":
        slideLeft();
        break;
      case "ArrowRight":
      case "Right":
        slideRight();
        break;
      default:
        return;
    }
   
    let cellsAfterMoving = grid.checkGridChange();
    if (cellsBeforeMoving !== cellsAfterMoving) grid.generateRandomCell();
  }
  gameEnd();
}


function slideLeft() {
  return motion.iterate(grid.getCellsByRows());
}


function slideRight() {
  return  motion.iterate(grid.getCellsByRows().map((row) => [...row].reverse()));
}


function slideUp() {
  return  motion.iterate(grid.getCellsByColumns());
}


function slideDown() {
  return  motion.iterate(
    grid.getCellsByColumns().map((columns) => [...columns].reverse())
  );
}


function gameEnd() {
  if (grid.gameIsWon()) {
    gameEndingActions("Congratulations! You win! Play again?");
    getTimeInTheEnd();
  } 
  else if (grid.gameIsLose()) {
    gameEndingActions("Sorry! Game lose! Play again?");
  }
}


function gameEndingActions(message) {
  timer.clockStop();
  board.removeEventListener("pointerdown", getStartPosition);
  board.removeEventListener("touchstart", getStartPosition);
  document.removeEventListener("keyup", onePress);
  
  for (let tile of document.querySelectorAll(".tile")) {
    tile.classList.add("stop-game");
  }
  
  setTimeout(() => {
    confirm(`${message}`) ? window.location.reload() : false;
  }, 500);
}


function getTimeInTheEnd() {
  let h = +document.getElementById("hours").innerHTML * 3600000;
  m = +document.getElementById("minutes").innerHTML * 60000;
  s = +document.getElementById("seconds").innerHTML * 1000;
  ms = +document.getElementById("milliseconds").innerHTML;

  let totalTime = h + m + s + ms;
  let bestTime = localStorage.getItem("best-time");

  if (totalTime < bestTime || bestTime == null || bestTime == "0") {
    localStorage.setItem("best-time", totalTime);
    document.getElementById("best-result").innerHTML = msToTime(totalTime);
  }
}
