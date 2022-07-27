function isGameWon() {
  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      if (grid[i][j] == 2048) {
        localStorage.setItem('timer-start', false);


        getTimeInTheEnd();
        return true;
      }
    }
  }
  return false;
}



function getTimeInTheEnd() {
  let h = +document.getElementById('hours').innerHTML * 3600000;
  let m = +document.getElementById('minutes').innerHTML * 60000;
  let s = +document.getElementById('seconds').innerHTML * 1000;
  let ms = +document.getElementById('milliseconds').innerHTML;

  let totalTime = h + m + s + ms;
  
  if ( totalTime < localStorage.getItem('best-time') || localStorage.getItem('best-time') == null ) {
    localStorage.setItem('best-time', totalTime);
    document.getElementById('best-result').innerHTML = totalTime;
  }
}

function isGameOver() {
  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== 4 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 4 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}



function game(e) {
  let previousGrid = grid.toString();

  switch (e.code) {
    case 'ArrowLeft': slideLeft(); break;
    case 'ArrowRight': slideRight(); break;
    case 'ArrowUp': slideUp(); break;
    case 'ArrowDown': slideDown();break;
    default: return;
  }

  if  ( previousGrid !== grid.toString() ) {
    decorateCell();
    generateNum();
  }

  if (isGameWon()) { 
    setTimeout(() => {
      confirm('Game won! Play again?') ? reloadPage(): false;
    }, 0);
  } 

  if (isGameOver()) { 
    setTimeout(() => {
      confirm('Game over! Play again?') ? reloadPage() : false;
    }, 0);
  }
}


document.addEventListener('keyup', game);


let board = document.getElementById('board');
const distanceThreshold = 60;


let pDownX = null;
let pDownY = null;
let pMoveX = null;
let pMoveY = null;


board.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  pDownX = e.clientX;
  pDownY = e.clientY;
  board.addEventListener('pointermove', pointermove);
});


function getDirection(pDownX, pMoveX, pDownY, pMoveY) {
  let direction = null;

  if ((pMoveX - pDownX) > distanceThreshold) {
    direction = 'R';
  } else if ((pDownX - pMoveX) > distanceThreshold) {
    direction = 'L';
  } else if ((pMoveY - pDownY) > distanceThreshold) {
    direction = 'D';
  } else if ((pDownY - pMoveY) > distanceThreshold) {
    direction = 'U';
  };

  return direction;
  };

function pointermove(e) {
  pMoveX = e.clientX;
  pMoveY = e.clientY;
  if (e.pressure > 0) {
    let direction = getDirection(pDownX, pMoveX, pDownY, pMoveY);
    if (direction !== null) {
      moveGame(direction);
      board.removeEventListener('pointermove', pointermove);
    };
  };
}



function moveGame(e) {
  let previousGrid = grid.toString();

  switch (e) {
    case 'L': slideLeft(); break;
    case 'R': slideRight(); break;
    case 'U': slideUp(); break;
    case 'D': slideDown();break;
    default: return;
  }

  if  ( previousGrid !== grid.toString() ) {
    decorateCell();
    generateNum();
  } 

  if (isGameWon()) { 
      confirm('Game won! Play again?') ? window.location.reload() : false;
  } 

  if (isGameOver()) { 
      confirm('Game over! Play again?') ? window.location.reload() : false;
  }
}