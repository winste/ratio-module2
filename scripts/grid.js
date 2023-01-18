const createGrid = () => {  // объект для создания сетки
  let boardContainer = create("section").addClass("grid-container"); // создание контейнера для хранения сетки
  board = create("div")
    .addClass("board container")
    .addId("board")
    .appendTo(boardContainer);
  document.body.appendChild(boardContainer);

  for (let i = 0; i < 25; i++) {  // создание 25-ти ячеек (таблица 5*5) и добавление их в сетку
    create("div").addClass("board__cell").appendTo(board);
  }
};

createGrid();

  // объект с методами для работы с сеткой
const grid = { 
  gridSize: 5,
  cells: [],  // для хранения ячеек
  // добавляет в cells ячейки из страницы для дальнейшей работы с ними
  init: function () {  
    let gridElements = document.getElementsByClassName("board__cell");
    for (let i = 0; i < this.gridSize * this.gridSize; i++) { // цикл для получения очередности ячеек с 1 до 25
      for (let cell of gridElements) {  // перебирает каждую ячеек по очереди
        this.cells[i] = {   // добавляет в cells элемент с индексом, соответствующему i
          element: cell,    
          /** 
           * нахождение Х и У соответсвует представлению сетки в виде многомерного массива вида
           * [[00, 01, 02, 03, 04],
           * [10, 11, 12, 13, 14],
           * [20, 21, 22, 23, 24],
           * [30, 31, 32, 33, 34],
           * [40, 41, 42, 43, 44],]
           */
          x: i % this.gridSize,  
          y: Math.floor(i / this.gridSize), 
          tile: null,  // значение для каждой ячеки, куда будут генерироваться и перемещаться плитки с цифрами
        };
      }
    }
    this.generateRandomCell(); // генерация двух клеток в начале игры
    this.generateRandomCell();
  },
  // получает все ячейки, в которых нет сгенерированных/перемещенных плиток
  getAllEmptyCells: function () {
    return this.cells.filter((cell) => cell.tile == null);
  },
  // получает из массива getAllEmptyCells одну случайную ячейку
  getRandomEmptyCell: function () {
    let index = Math.floor(Math.random() * this.getAllEmptyCells().length);  // нахождение случаного индекса исходя из длины массива свободных ячеек
    return this.getAllEmptyCells()[index];
  },
  // создает и добавляет сгенерированную ячейку
  generateRandomCell: function () {
    let tile = create("div");

    Math.random() >= 0.9 ? (tile.innerText = 4) : (tile.innerText = 2);

    let randomCell = this.getRandomEmptyCell();
    tile.setAttribute("class", "tile tile__" + tile.innerText);  // устанавливает класс со значение сгенерированной ячейки для стилизации
    // устанавливает значение Х и У для добавление плитки на страницу по координатам, соответствующим выбранной ячейке
    tile.style.setProperty("--x", randomCell.x);  // расчет положения top и left плитки происходит через стили (в файле стилей grid.css по селектору .tile)
    tile.style.setProperty("--y", randomCell.y);
    tile.animate([{ transform: "scale(0)" }, { transform: "scale(1)" }], 150); // добавление анимации постепенного появления новой плитки
    randomCell.tile = tile;
    document.getElementById("board").append(tile);
  },
  // записывает положение плиток на данный момент (для проверки изменения состояния сетки)
  writeCellsState: function () {
    let cellsCurrentState = this.cells
      .filter((cell) => cell.tile != null)
      .map((cell) => cell.tile);  // отбирает только существующие плитки

    let cellsTilesNumber = [];  // массив для записи значения и положения плиток
    for (let tile of cellsCurrentState) {
      cellsTilesNumber.push(tile.outerHTML);  // добавляет значение плитки, включая значение Х и У
    }
    return cellsTilesNumber.toString();
  },
  // получает ячейки в виде многомерного массива, где ячейки в "столбце" добавляются в строку
  getCellsByColumns: function () {
    let gridCells = [];
    let rowCells = [];

    for (let i = 0; i < this.gridSize; i++) { // цикл от 0 до 4 для записи строк в массив, не превышающий размера сетки
      for (let cell of this.cells) {
        if (cell.x % this.gridSize == i) rowCells.push(cell); // добавляет в строку, если значение от получения остатка равно индексу строки в массиве
        if (rowCells.length == this.gridSize) {  // если длина массива добавленных ячеек равно размеру сетки
          gridCells.push(rowCells);  // добавить в новый массив
          rowCells = []; // массив очиститиь для добавления следующих элементов
        }
      }
    }
    return gridCells;
  },
  // получает ячейки в виде многомерного массива, где ячейки в "строке" записываются соответственно в строку
  getCellsByRows: function () {
    let gridCells = [];
    let rowCells = [];

    for (let i = 0; i < this.gridSize; i++) {
      for (let cell of this.cells) {
        if (cell.y % this.gridSize == i) rowCells.push(cell);
        if (rowCells.length == this.gridSize) {
          gridCells.push(rowCells);
          rowCells = [];
        }
      }
    }
    return gridCells;
  },
  // проверка на выигрыш игры
  gameIsWon: function () {
    return this.cells.find(
      cell => cell.tile != null && cell.tile.innerText == 2048  // ищет среди плиток значение 2048
    );
  },
  // проверка на проигрыш
  gameIsLose: function () {
    return this.getAllEmptyCells().length == 0 && !canMove(); // возвращает true, если нет пустых ячеек для генерации новых и соседние ячейкт некуда передвигать
  },
};

grid.init();
