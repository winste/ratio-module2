let rows = 4;
let columns = 4;
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


window.onload = function() {
    createTable();
    generateNum();
    generateNum();
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
}

 function generateNum() {
    let x, y;
    do {
      x = Math.floor(Math.random() * rows), 
      y = Math.floor(Math.random() * columns);
      if (grid[y][x] == 0) {
        let cell = document.getElementById(y.toString() + "-" + x.toString());
        grid[y][x] = Math.random() >= 0.9 ? cell.innerText = 4 : cell.innerText = 2;
        break;
      }
    } while (true);
  }




