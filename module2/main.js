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
  table.setAttribute('id', 'table');
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
  cell.classList.value = ""; //clear the classList
  cell.classList.add('table__cell');
  if (num > 0) {
    cell.innerText = num.toString();
    cell.classList.add(`c${num}`);
  }
}


 function generateNum() {
  do {
    let x = Math.floor(Math.random() * rows); 
    let y = Math.floor(Math.random() * columns);

    if (grid[y][x] == 0) {
      let genarateCell = document.getElementById(`${y}-${x}`);

      if (grid[y][x] = Math.random() >= 0.9) {
        genarateCell.innerText = 4;
        grid[y][x] = 4;
      }
      else {
        genarateCell.innerText = 2;
        grid[y][x] = 2;
      }

      changeClass(genarateCell, grid[y][x]);
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
  for (let r = 0; r < rows; r++) {
      let row = grid[r];
      row = slide(row);
      grid[r] = row;
      for (let c = 0; c < columns; c++){
          let cell = document.getElementById(`${r}-${c}`);
          changeClass(cell, grid[r][c]);
      }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
      let row = grid[r];
      row = row.reverse();
      row = slide(row);
      grid[r] = row.reverse();
      for (let c = 0; c < columns; c++){
          let cell = document.getElementById(`${r}-${c}`);
          changeClass(cell, grid[r][c]);
      }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
      let row = [grid[0][c], grid[1][c], grid[2][c], grid[3][c]];
      row = slide(row);
      for (let r = 0; r < columns; r++){
          grid[r][c] = row[r];
          let cell = document.getElementById(`${r}-${c}`);
          changeClass(cell, grid[r][c]);
      }
  }
}

document.addEventListener('keyup', (e) => {
  if (e.code == "ArrowLeft") {
      slideLeft();
      generateNum();
  }
  else if (e.code == "ArrowRight") {
    slideRight();
    generateNum();
}
else if (e.code == "ArrowUp") {
  slideUp();
  generateNum();

}
}
)














