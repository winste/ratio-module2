const timer = {  // объект, содержащий методы для работы таймера
  time: null,   // для записи времени начала игры
  tick: null,   // для записи/удаления setInterval
  timerCheck: true,  // для проверки, был ли таймер уже запущен

  clockStart: function () {        // записывает время начала игры
    return (this.time = new Date());
  },

  clockTick: function () {        // запускат таймер и отсчет секунд 
    this.tick = setInterval(() => {
      const userTimezoneOffset = Math.abs(       // получение таймзоны пользователя
        new Date().getTimezoneOffset() * 60000
      );
      let timeAfter = new Date();
      let differenceInTime = timeAfter.getTime() - this.time.getTime();  // получение разницы во времени в милисекундах, прошедшей с момента запуска игры
      let date = new Date(differenceInTime - userTimezoneOffset);   // создание нового объекта Date за вычитом таймзоны

      function showTimeInTimer(unitTime, value) {   //функция для выведения полученной даты в таймер на страницу
        if (unitTime == "milliseconds") {      // конкатенация единиц времени с нулями для улучшеного визуального отображения
          document.getElementById(unitTime).innerHTML =
            value < 100 && value > 10   
              ? "0" + value
              : value < 10 && value < 100
              ? "00" + value
              : value;
        } else {
          document.getElementById(unitTime).innerHTML =
            value < 10 ? "0" + value : value;
        }
      }
      // применеие функции отображения для каждой единицы времени, прощедщего с момента начала игры
      showTimeInTimer("hours", date.getHours());
      showTimeInTimer("minutes", date.getMinutes());
      showTimeInTimer("seconds", date.getSeconds());
      showTimeInTimer("milliseconds", date.getMilliseconds());
    }, 0);
  },
  // очищает метод setInterval, тем самым останавливает таймер
  clockStop: function () { 
    clearInterval(this.tick);
  },
  // запусккает работу таймера
  timerStart: function () {
    this.clockStart();
    this.clockTick();
    this.timerCheck = false;
  },
};
