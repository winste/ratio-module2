const grid = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let time = 0;
let countLines = 5;

function createBoard() {
  let board = createHTMLBlock("div", "board container", "", "board");
  document.body.appendChild(board);

  for (let i = 0; i < countLines; i++) {
    for (let j = 0; j < countLines; j++) {
      let cell = document.createElement("div");
      cell.id = `${i}-${j}`;
      changeClass(cell, grid[i][j]);
      board.append(cell);
    }
  }
  generateNum();
  generateNum();
}

createBoard();

function changeClass(cell, number) {
  cell.innerText = "";
  cell.classList.value = "board__cell";
  if (number > 0) {
    cell.innerText = number;
    cell.classList.add(`c${number}`);
  }
}

function generateNum() {
  do {
    let x = Math.floor(Math.random() * countLines);
    let y = Math.floor(Math.random() * countLines);

    if (grid[x][y] == 0) {
      let generateCell = document.getElementById(`${x}-${y}`);
      Math.random() >= 0.9
        ? (generateCell.innerText = 4)
        : (generateCell.innerText = 2);
      grid[x][y] = generateCell.innerText;
      generateCell.classList.add(`c${grid[x][y]}`);
      generateCell.animate(
        [{ transform: "scale(0)" }, { transform: "scale(1)" }],
        130
      );
      break;
    }
  } while (true);
  return true;
}
