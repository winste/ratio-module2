let score = 0;

function slide(row) {
  function filterZero(row) {
    return row.filter((num) => num != 0);
  }
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      document.getElementById("score-value").innerHTML = score;
    }
  }

  row = filterZero(row);
  while (row.length < 5) {
    row.push(0);
  }
  return row;
}

function reverseRows() {
  for (let i = 0; i < countLines; i++) {
    grid[i] = grid[i].reverse();
  }
}

function turnRows() {
  let prevGrid = grid.slice(0);
  for (let i = 0; i < countLines; i++) {
    grid[i] = [
      prevGrid[0][i],
      prevGrid[1][i],
      prevGrid[2][i],
      prevGrid[3][i],
      prevGrid[4][i],
    ];
  }
}

function decorateCell() {
  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      changeClass(document.getElementById(`${i}-${j}`), grid[i][j]);
    }
  }
}

function slideLeft() {
  for (let i = 0; i < countLines; i++) {
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
  turnRows();
}

function slideDown() {
  turnRows();
  slideRight();
  turnRows();
}