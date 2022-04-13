let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let score = 0;


window.onload = function() {
    createTable();
}


function createTable() {
  let table = document.createElement('table');
  table.className = 'table';
  table.id = 'table';
  document.body.prepend(table);

  for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
          let cell = document.createElement('div');
          cell.id = `${r}-${c}`;
          let num = grid[r][c];
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

      // changeClass(generateCell, grid[y][x]);
      generateCell.className = `table__cell table__cell--generate c${grid[y][x]}`;
      break;
    }
  } while (true);

  return true;
}

  
function slide(row) {

  function filterZero(row) {
    return row.filter(num => num != 0);
  }
  row = filterZero(row);

  for (let r = 0; r < row.length-1; r++) {
    if (row[r] == row[r+1]) {
      row[r] *= 2;
      row[r+1] = 0;
      score += row[r]; 
    }
  }

  row = filterZero(row);
  while (row.length < 4) {
    row.push(0);
  }
  return row;
}


function moveLeft() {
  let change = false;
  for (let i = 0; i < 4; i++) {
    let oldRow = grid[i];
    grid[i] = slide(grid[i]);
    if (oldRow.join() != grid[i].join()) change = true;

  }
  return change;
}

function slideLeft() {
  let change = moveLeft();
  decorate();
  if (change) generateNum();
}

function decorate() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j ++) {
      changeClass(document.getElementById(`${i}-${j}`), grid[i][j]);
    }
  }
}

function slideRight() {
  reverseRows();
  moveLeft();
  reverseRows();
}

function reverseRows() {
  for (let i = 0; i < 4; i++) {
    grid[i] = grid[i].reverse();
  }
}


// function turnRows() {
//   let oldGrid = grid.slice(0);
//   for (let i = 0; i < 4; i++) {   
//     for (let j = 0; j < 4; j++) {
//       grid[i][j] = oldGrid[j][i];
//     }
//   }
// } 


// function slideUp() {
//   turnRows();
//   decorate();
// }

function slideUp() {
  let change = false;
  for (let c = 0; c < 4; c++) {
    let oldRow = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
    let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
    row = slide(row);
    if (oldRow.join('') != row.join('')) change = true;
    for (let r = 0; r < 4; r++){
        grid[r][c] = row[r];
        changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
    }
  }
  if (change) generateNum();
}


function slideDown() {
  let change = false;
  for (let c = 0; c < 4; c++) {
    let oldRow =[grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
    let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];

    row.reverse();
    row = slide(row);
    row.reverse();
    if (oldRow.join('') != row.join('')) change = true;
    for (let r = 0; r < 4; r++){
      grid[r][c] = row[r];
      changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
    }
  }
  if (change) generateNum();
}


function hasEmptyCell() {
  for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
          if (grid[r][c] == 0) return true;
      }
  }
  return false;
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

document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowLeft': slideLeft(); break;
    case 'ArrowRight': slideRight(); break;
    case 'ArrowUp': slideUp(); break;
    case 'ArrowDown': slideDown(); break;
    default: return;
  }

  if (isGameWon()) alert('You won!');
  if (isGameOver()) alert('You lose!')
});


