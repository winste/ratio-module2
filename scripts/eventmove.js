const position = {  // объект для хранения координат нажатия
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  distancePressed: 60,  // количество пикселей для определения направления движения при зажатии
  board: document.getElementById("board")  // события должны срабатывать только при зажатии на сетке
};

//  получение начального положение нажатия мышкой/сенсор
function getStartPosition(e) { 
  e.preventDefault();
  let eventBody = null;  // записать тело события для получения координат
  let eventName = null;  // записать имя события в зависимости от типа, чтобы навесить соответствующий обработчик 

  if (e.type == "touchstart") {   // если сенсор
    eventBody = e.touches[0];     
    eventName = "touchmove";
  } else {                       // иначе мышка
    eventBody = e;
    eventName = "pointermove";
  }

  position.startX = eventBody.clientX;
  position.startY = eventBody.clientY;
  position.board.addEventListener(`${eventName}`, getEndPosition);
}

// получение положения мышки/сенсора после передвижения
function getEndPosition(e) {
  let eventBody = null;
  e.type == "touchmove" ? (eventBody = e.touches[0]) : (eventBody = e);  // записать тело события для получения координат

  position.endX = eventBody.clientX;
  position.endY = eventBody.clientY;
  let direction = getDirection(   // получение значения направления для дальнейшего перемещения клеток
    position.startX,
    position.startY,
    position.endX,
    position.endY
  );
  if (direction != null) position.board.removeEventListener(`${e.type}`, getEndPosition);  // если перемещения было, удалить слушатель события отжатия
}

// получение направления движения, передав все координаты одного перемещения
function getDirection(startX, startY, endX, endY) {
  let direction = null;
// проверка на длительность касания: засчитать, если длительность  перемещения длиннее значения position.distancePressed (60 пикселей)
  if (endX - startX > position.distancePressed) direction = "Right";
  else if (startX - endX > position.distancePressed) direction = "Left";
  else if (startY - endY > position.distancePressed) direction = "Up";
  else if (endY - startY > position.distancePressed) direction = "Down";

  if (direction != null) onePress(direction);  // если перемещение состоялось, передать направление в функцию для обработки нажатия
  return direction;
}

// обработчики на сетку для отслеживания нажатия с помощью мышки или сенсора
board.addEventListener("pointerdown", getStartPosition);
board.addEventListener("touchstart", getStartPosition);
