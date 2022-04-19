let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;


window.onload = function() {
  createHeadline();
  createTable();
}


function createHeadline() {
  let scoreBlock = document.createElement('div');
  scoreBlock.className = "score";
  scoreBlock.id = 'score';
  document.body.prepend(scoreBlock);
}


function createTable() {
  let table = document.createElement('table');
  table.className = 'table';
  table.id = 'table';
  document.body.append(table);

  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          let cell = document.createElement('div');
          cell.id = `${i}-${j}`;
          let num = grid[i][j];
          changeClass(cell, num);
          table.append(cell);
      }
  }
  generateNum();
  generateNum();
}


function changeClass(cell, number) {
  cell.innerText = "";
  cell.classList.value = ""; 
  cell.classList.add('table__cell');
  if (number > 0) {
    cell.innerText = number;
    cell.classList.add(`c${number}`);
  }
}


 function generateNum() {
  if (!hasEmptyCell()) return;

  do {
    let x = Math.floor(Math.random() * 4); 
    let y = Math.floor(Math.random() * 4);

    if (grid[y][x] == 0) {
      let generateCell = document.getElementById(`${y}-${x}`);
      if (Math.random() >= 0.9) {
        generateCell.innerText = 4;
        grid[y][x] = 4;
      }
      else {
        generateCell.innerText = 2;
        grid[y][x] = 2;
      }
      generateCell.className = `table__cell table__cell--generate c${grid[y][x]}`;
      break;
    }

  } while (true);

  return true;
}


function hasEmptyCell() {
  for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
          if (grid[i][j] == 0) return true;
      }
  }
  return false;
}  


function slide(row) {

  function filterZero(row) {
    return row.filter(num => num != 0);
  }
  row = filterZero(row);

  for (let i = 0; i < row.length-1; i++) {
    if (row[i] == row[i+1]) {
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i]; 
    }
  }

  row = filterZero(row);
  while (row.length < 4) {
    row.push(0);
  }
  return row;
}


function reverseRows() {
  for (let i = 0; i < 4; i++) {
    grid[i] = grid[i].reverse();
  }
}


function turnRows() {
  let prevGrid = grid.slice(0);
  for (let i = 0; i < 4; i++) {   
    grid[i] = [prevGrid[0][i], prevGrid[1][i], prevGrid[2][i], prevGrid[3][i]];
  }
} 


function decorateCell() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j ++) {
      changeClass(document.getElementById(`${i}-${j}`), grid[i][j]);
    }
  }
}


function slideLeft() {
  for (let i = 0; i < 4; i++) {
    grid[i] = slide(grid[i]);
  }
}


function slideRight() {
  reverseRows();
  slideLeft();
  reverseRows();
}


function slideUp() {
  turnRows();
  slideLeft();
  turnRows()
}


function slideDown() {
  turnRows();
  slideRight();
  turnRows()
}


function isGameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}


function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}


function game(e) {
  let previousGrid = grid.slice(0);

  switch (e.code) {
    case 'ArrowLeft': slideLeft(); break;
    case 'ArrowRight': slideRight(); break;
    case 'ArrowUp': slideUp(); break;
    case 'ArrowDown': slideDown();break;
    default: return;
  }
  decorateCell();

  if  ( previousGrid.join() != grid.join() ) generateNum();

  if (isGameWon()) alert('You won!');
  if (isGameOver()) alert('You lose!')
}

document.addEventListener('keyup', game);
