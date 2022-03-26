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

  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
          
          let cell = document.createElement('div');
          cell.className = 'table__cell';
          cell.id = i.toString() + "-" + j.toString();
          table.append(cell);
      }
  }
  generateNum();
  generateNum();
}


 function generateNum() {
  let x, y;
  do {
    x = Math.floor(Math.random() * rows), 
    y = Math.floor(Math.random() * columns);
    let cellInner = grid[y][x];

    if (cellInner == 0) {
      let genarateCell = document.getElementById(y.toString() + "-" + x.toString());
      cellInner = Math.random() >= 0.9 ? genarateCell.innerText = 4 : genarateCell.innerText = 2;
      genarateCell.classList.add("c"+cellInner); 
      break;
    }
  } while (true);
}


function filterZero(row) {
  return row.filter(num => num != 0);
}

  
function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length-1; i++) {
    if (row[i] == row[i+1]) {
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i];
    }
  }

  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

// function slide(array) {



//   array = filterEmpty(array);
// }

// function slide(row) {
//   //[0, 2, 2, 2] 
//   row = filterZero(row); //[2, 2, 2]
//   for (let i = 0; i < row.length-1; i++){
//       if (row[i] == row[i+1]) {
//           row[i] *= 2;
//           row[i+1] = 0;
//           score += row[i];
//       }
//   } //[4, 0, 2]
//   row = filterZero(row); //[4, 2]
//   //add zeroes
//   while (row.length < columns) {
//       row.push(0);
//   } //[4, 2, 0, 0]
//   return row;
// }

// function slideRight() {
//   for (let r = 0; r < rows; r++) {
//       let row = board[r];         //[0, 2, 2, 2]
//       row.reverse();              //[2, 2, 2, 0]
//       row = slide(row)            //[4, 2, 0, 0]
//       board[r] = row.reverse();   //[0, 0, 2, 4];
//       for (let c = 0; c < columns; c++){
//           let tile = document.getElementById(r.toString() + "-" + c.toString());
//           let num = board[r][c];
//           updateTile(tile, num);
//       }
//   }
// }



