let rows = 4;
let columns = 4;
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

  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
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

function changeClass(cell, num) {
  cell.innerText = "";
  cell.classList.value = ""; 
  cell.classList.add('table__cell');
  if (num > 0) {
    cell.innerText = num;
    cell.classList.add(`c${num}`);
  }
}


 function generateNum() {
  if (!hasEmptyCell()) return;

  do {
    let x = Math.floor(Math.random() * rows); 
    let y = Math.floor(Math.random() * columns);

    if (grid[y][x] == 0) {
      let generateCell = document.getElementById(`${y}-${x}`);

      if (grid[y][x] = Math.random() >= 0.9) {
        generateCell.innerText = 4;
        grid[y][x] = 4;
      }
      else {
        generateCell.innerText = 2;
        grid[y][x] = 2;
      }

      changeClass(generateCell, grid[y][x]);
      break;
    }
  } while (true);
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
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  let change = false;

  for (let r = 0; r < rows; r++) {
    let oldRow = grid[r];
      grid[r] = slide(grid[r]);

      if (oldRow.join('') != grid[r].join('')) change = true;

      for (let c = 0; c < columns; c++){
          changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
      }
  }

  if (change) generateNum();
}


function slideRight() {
  let change = false;

  for (let r = 0; r < rows; r++) {
    let oldRow = grid[r];
      let row = grid[r].reverse();
      grid[r] = slide(row).reverse();
      if (oldRow.join('') != grid[r].join('')) change = true;
      for (let c = 0; c < columns; c++){
          changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
      }
  }
  if (change) generateNum();
}

function slideUp() {
  let change = false;
  for (let c = 0; c < columns; c++) {
    let oldRow = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]]
      let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
      row = slide(row);
      if (oldRow.join('') != row.join('')) change = true;
      for (let r = 0; r < columns; r++){
          grid[r][c] = row[r];
          changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
      }
  }
  if (change) generateNum();
}

function slideDown() {
  let change = false;
  for (let c = 0; c < columns; c++) {
    let oldRow =[grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
      let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];

      row.reverse();
      row = slide(row);
      row.reverse();
      if (oldRow.join('') != row.join('')) change = true;
      for (let r = 0; r < rows; r++){
        grid[r][c] = row[r];
        changeClass(document.getElementById(`${r}-${c}`), grid[r][c]);
      }
  }
  if (change) generateNum();
}



function hasEmptyCell() {
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
          if (grid[r][c] == 0) return true;
      }
  }
  return false;
}


document.addEventListener('keyup', (e) => {
  let code = e.code;
  switch (code) {
    case 'ArrowLeft': 
      slideLeft(); 
      break;
    case 'ArrowRight': 
      slideRight(); 
      break;
    case 'ArrowUp': 
      slideUp(); 
      break;
    case 'ArrowDown': 
      slideDown();
      break;
    default: return;
  }
});


// function isGameWon() {
//   for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//       if (grid[i][j] == 2048) {
//         return true;
//       }
//     }
//   }
//   return false;
// }








