const motion = {  // объект, содержащий методы для перемещения чсеек по сетке
  transitionEnding: null, // для отслеживания окончания анимации
  score: 0,   // для записи общего количества суммированных плиток
  // по очережи перебирает каждую ячейку
  iterate: function(cells) {
    cells.map((row) => { // перебивает переданный массив по строкам
      for (let i = 0; i < row.length; i++) {
        let cellFromMove = row[i];  // присваивает значение первой (и последующих по очереди) ячеек для передвижения
        let cellToMove = null;  // для хранения ячейки, куда перемещать плитку
  
        if (cellFromMove.tile === null) continue;  // если у ячейки для передвижения нет плитки, то перейти к следующей итерации
  
        for (let k = i - 1; k >= 0; k--) {  // перебирает ячейки рядом с ячейкой для передвижения
          let nextCell = row[k];   // записывает ее значение
          if (nextCell.tile === null) {  // если у ячейки нет плитки
            cellToMove = nextCell;  // то записываем значение ячейки, куда нужно плитку переместить
          } else if (cellFromMove.tile.innerText == nextCell.tile.innerText) {  // если у рядом стоящей ячейки есть плитка с таким же значением
            cellToMove = nextCell;  // то также записываем ее значение
            break;
          } else break;
        }
  
        if (cellToMove !== null) {  // если есть куда передвинуть, передаем значение в метод для перемещения
          this.moveCell(cellFromMove, cellToMove);
        }
      }
    });
  },

  moveCell: function (fromCell, toCell) {
    this.transitionEnding = false;  // в начале перемещения значение флага false
    const promises = [];  // хранит промисы, созданные для перемещенных ячеек
    // записывает плитки для перемещения
    let fromMoveTile = fromCell.tile; 
    let toMoveTile = toCell.tile;
  
    promises.push( // добавляем в массив новый созданный промис для ячейки, которую будем перемещать
      new Promise((resolve) => {
        fromMoveTile.addEventListener("transitionend", resolve, { once: true });  // по окончании анимации отправить информацию о выполненном промисе 
      })
    );
  
    if (toMoveTile === null) {  // если ячейка, куда необходимо переместить, пустая
      fromMoveTile.style.setProperty("--x", toCell.x); // то передвигаем плитку на новое место, устанавливая новые значени Х и У
      fromMoveTile.style.setProperty("--y", toCell.y);
      toCell.tile = fromMoveTile;
      fromCell.tile = null;  // убираем плитку у перемещающейся ячейки
    } 

    else if (fromMoveTile.innerText === toMoveTile.innerText) {  // если значение плиток рядом стоящих ячеек одинаково, то также передвигаем
      fromMoveTile.style.setProperty("--x", toCell.x); 
      fromMoveTile.style.setProperty("--y", toCell.y);
      fromMoveTile.style.zIndex = "-111"; // устанвливаем отрицательный z-index, чтобы плитка могла "заехать" за новую плитку

      setTimeout(() => {  // устаналвивает прозрачность перед удалением, чтобы старые плитки не были видны на доске при быстром перемещении
        fromMoveTile.style.opacity = "0";
      }, 150);
      setTimeout(() => { // удаляет старую плитку
        document.getElementById("board").removeChild(fromMoveTile);
      }, 400);
  
      toMoveTile.innerText *= 2;  // удваиваем значение новой плитки
      toMoveTile.setAttribute("class", "tile tile__" + toMoveTile.innerText); // и устанавливаем классы для стилизации в соответсвии со значеним плитки
      toMoveTile.animate(  // добавление анимации для слитих ячеек
        [{ transform: "scale(1.2)" }, { transform: "scale(1)" }],
        200
      );
  
      fromCell.tile = null;  // удаляем плитку у ячейки
      this.score += +toMoveTile.innerText;  //  прибавляем к значению суммы плиток
      document.getElementById("score-value").innerText = this.score; // выводим значение
    }
    if (promises.length > 0) { // если в массиве есть выполняющиеся промисы
      return Promise.all(promises).then(() => this.transitionEnding = true); // дожидаемся их выполнения и меняем значение флага, подтверждая, что все перемещения закончились
    }
  }
}

// проверяет, есть ли рядом плитки с таким же значением для слияния
function checkNearCells(cells) {
  let checkMove;
  for (let row of cells) {
    let filterRow = row.map((cell) => cell.tile); // оставляем только плитки

    for (let i = 0; i < filterRow.length; i++) {
      if (filterRow[i] != null && filterRow[i + 1] != null) {  // если рядом стоящая ячейка пустая
        if (filterRow[i].innerText == filterRow[i + 1].innerText) // если значения двух рядом стоящих плиток одинаковы
          checkMove = true; // то перемещение возможно
      }
    }
  }
  return checkMove;
}

// проверяет ячейки в каждом направлении
function canMove() {
  let checkLeft = checkNearCells(grid.getCellsByRows());
  let checkRight = checkNearCells(
    grid.getCellsByRows().map((row) => [...row].reverse())
  );
  let checkUp = checkNearCells(grid.getCellsByColumns());
  let checkDown = checkNearCells(
    grid.getCellsByColumns().map((columns) => [...columns].reverse())
  );
  return checkLeft || checkRight || checkUp || checkDown; //  если хоть по одному направлению перемещение возможно, то возвращает true
}
