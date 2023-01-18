function create(tag) {
  // создает HTML-элемент в зависимости от переданного тега
  return document.createElement(tag);
}
// добавление в прототип метода вставки элемента в конец родительного элемента
HTMLElement.prototype.appendTo = function (parent) {
  parent.appendChild(this);
  return this;
};
// добавление в прототип метода вставки элемента в начало родительного элемента
HTMLElement.prototype.prependTo = function (parent) {
  parent.prepend(this);
  return this;
};
// добавление в прототип метода добавления класса элементу
HTMLElement.prototype.addClass = function (classValue) {
  this.className = classValue;
  return this;
};
// добавление в прототип метода добавления id элементу
HTMLElement.prototype.addId = function (id) {
  this.id = id;
  return this;
};
// добавление в прототип метода добавления внутреннего содержания элемента
HTMLElement.prototype.content = function (content) {
  this.innerHTML = content;
  return this;
};

// создание заголовка, включая h1 и описание игры
const createHeadline = () => {
  const heading = create("section")
    .addClass("heading container")
    .prependTo(
      document.querySelector("body")
    ); 
  /**
   * создание элемента с помощью функции create(tag) и дальнейшее модификация с использованием методов в прототипе HTMLElement
   */
  title = create("h1")
    .addClass("heading__title")
    .content("2048")
    .appendTo(heading);

  aboutContainer = create("div").addClass("heading__about").appendTo(heading);

  aboutText = create("p")
    .addClass("heading__about-text")
    .content("Join the tiles, get to 2048!")
    .appendTo(aboutContainer);

  aboutText2 = create("p")
    .addClass("heading__about-text")
    .content("When two tiles slide into each other, they merge into one!")
    .appendTo(aboutContainer);
};

// создание блока, который будет содержать реультаты и кнопку
const createResultHeader = () => {
  const headlineResult = create("div")
    .addClass("heading__result")
    .appendTo(document.querySelector(".heading"));

  timeBlock = create("div").addClass("heading__time").appendTo(headlineResult); // создание блока для таймер и лучшего реузльтата игры
};

// создание всего таймера
const createTimer = () => {
  const timer = create("div")
    .addClass("heading__result-time timer")
    .appendTo(document.querySelector(".heading__time")); // создание общего блока, который будет содержать весь таймер

  timerTitle = create("p")
    .addClass("heading__result-title timer__title")
    .content("time: ")
    .appendTo(timer);

  unitTime = create("div")
    .addClass("heading__result-value timer__units")
    .appendTo(timer); // создание блока, в котором будут содержаться все единицы времени

  hours = create("p")
    .addClass("timer__hours")
    .addId("hours")
    .content(`00`)
    .appendTo(unitTime);
  hours.after(create("span").addClass("timer__colon").content(":")); // создание и добавление разделителя после часов

  minutes = create("p")
    .addClass("timer__minutes")
    .addId("minutes")
    .content("00")
    .appendTo(unitTime);
  minutes.after(create("span").addClass("timer__colon").content(":")); // создание и добавление разделителя после минут

  seconds = create("p")
    .addClass("timer__seconds")
    .addId("seconds")
    .content("00")
    .appendTo(unitTime);

  milliseconds = create("p")
    .addClass("timer__milliseconds")
    .addId("milliseconds")
    .content("000")
    .appendTo(unitTime);
};

// создание блока лучшего результата игры
const createBestTimeBLock = () => {
  const bestTimeCount = create("div")
    .addClass("heading__result-time best-time")
    .appendTo(document.querySelector(".heading__time")); // общий блок

  bestTimeTitle = create("p")
    .addClass("heading__result-title best-time__title")
    .content("best: ")
    .appendTo(bestTimeCount);

  bestTimeValue = create("p")
    .addClass("heading__result-value best-time__value")
    .addId("best-result")
    .content(
      `${
        localStorage.getItem("best-time") // при загрузке игры берется значение из LocalStorage
          ? msToTime(localStorage.getItem("best-time"))
          : 0
      }`
    ) // если значения нет, то вписать 0
    .appendTo(bestTimeCount);
};

// перевод времени, полученного из localstorage в вид формата HH:mm:ss:sss
function msToTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 100);
  seconds = Math.floor((ms / 1000) % 60);
  minutes = Math.floor((ms / (1000 * 60)) % 60);
  hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  // возвращает значение в зависимости от того, сколько времени заняло прохождение игры
  return hours // если есть часы, добавить их в итоговый результат для отображения
    ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
    : `${minutes}m ${seconds}.${milliseconds}s`;
}

// создание блока, считающего сумму всех сложенных ячеек
const createScoreBLock = () => {
  const headingScore = document.querySelector(".heading__result"); // куда будет добавлен весь эелемент в итоге

  scoreCount = create("div")
    .addClass("heading__count score")
    .appendTo(headingScore); // создание общего блока для добавления подэлементов

  scoreTitle = create("p")
    .addClass("heading__result-title score__title")
    .content("score: ")
    .appendTo(scoreCount);

  scoreValue = create("p")
    .addClass("heading__result-value score__value")
    .addId("score-value")
    .content("0")
    .appendTo(scoreCount);
};

// создание кнопки перезагрузки игры
const createResetButton = () => {
  const resetButton = create("button")
    .addClass("button button-reset")
    .content("new game")
    .appendTo(document.querySelector(".heading__result"));

  resetButton.onclick = () => window.location.reload(); // добавление обработчика перезагрузки при нажатии на кнопку
};

// запуск всех функций для создания элементов
createHeadline();
createResultHeader();
createTimer();
createBestTimeBLock();
createScoreBLock();
createResetButton();
