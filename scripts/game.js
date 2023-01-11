document.addEventListener("keyup", onePress); 

// выполняется при нажатии клавиши или зажатия и перемещения мышки
function onePress(e) {
  if (motion.transitionEnding || motion.transitionEnding === null) { // выполнить при первом нажатии или если анимация передвижения клеток закончилась
    let cellsBeforeMoving = grid.writeCellsState(); // запись предыдущего состояния сетки
    let eName = null; // для записи типа нажатия: мышка или клавиатура

    if (e.code) {  // если нажаты стрелки
      eName = e.code;
      e.preventDefault();
    }
    else {        // иначе мышка или сенсор
      eName = e;
    }
    
    if (timer.timerCheck) timer.timerStart();   // запуск таймера, если он еще не был запущен
    
    switch (eName) {
      case "ArrowUp":
      case "Up":
        slideUp();
        break;
      case "ArrowDown":
      case "Down":
        slideDown();
        break;
      case "ArrowLeft":
      case "Left":
        slideLeft();
        break;
      case "ArrowRight":
      case "Right":
        slideRight();
        break;
      default:
        return;
    }
   
    let cellsAfterMoving = grid.writeCellsState(); // запись состояния сетки после нажатия
    if (cellsBeforeMoving !== cellsAfterMoving) grid.generateRandomCell(); // если перемещение было, сгенерировать новую клетку
  }
  checkGameEnd();  // проверка на победу/поражение
}

   /**
    * функции, возвращающие вид сетки в зависимости от направления передвижения:
    * для направления право/низ строки нужно перевернуть
    */
let slideLeft = () => motion.iterate(grid.getCellsByRows());
let slideRight = () => motion.iterate(grid.getCellsByRows().map((row) => [...row].reverse()));
let slideUp = () => motion.iterate(grid.getCellsByColumns());
let slideDown = () => motion.iterate(grid.getCellsByColumns().map((columns) => [...columns].reverse()));

//выполняется в конце игры в случае победы/поражения
function checkGameEnd() {
  if (grid.gameIsWon()) {
    stopActions();
    getTimeInTheEnd(); // получение значения таймера в случае победы

    setTimeout(() => {
      confirm("Congratulations! You win! Play again?") ? window.location.reload() : false;
    }, 500);
  } 
  else if (grid.gameIsLose()) {
    stopActions();
    setTimeout(() => {
      confirm("Sorry! Game lose! Play again?") ? window.location.reload() : false;
    }, 500);
  }
}

// остановка таймера, очищение слушателей и добавление размытия ячейкам
function stopActions() {
  timer.clockStop();
  board.removeEventListener("pointerdown", getStartPosition);
  board.removeEventListener("touchstart", getStartPosition);
  document.removeEventListener("keyup", onePress);
  
  for (let tile of document.querySelectorAll(".tile")) {
    tile.classList.add("tile__no-move");
  }
}

// получение значения таймера, перевод его в милисекунды и запись в locastorage
function getTimeInTheEnd() {
  // получение значения единиц времени по отдельности и перевод их в милисекунды
  let h = +document.getElementById("hours").innerHTML * 3600000;
      m = +document.getElementById("minutes").innerHTML * 60000;
      s = +document.getElementById("seconds").innerHTML * 1000;
      ms = +document.getElementById("milliseconds").innerHTML;

  let totalTime = h + m + s + ms; // итоговое время в милисекундах
  let bestTime = localStorage.getItem("best-time"); // получение существующего значения из localstorage

  if (totalTime < bestTime || bestTime == null || bestTime == "0") { // если новое значение меньше предудыдущего или записывается впервые
    localStorage.setItem("best-time", totalTime);                    // то перезаписать
    document.getElementById("best-result").innerHTML = msToTime(totalTime);  // вывести лучшее значние на страницу в блок "best"
  }
}
