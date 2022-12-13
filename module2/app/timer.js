const timer = {
  time: null,
  tick: null,
  timerCheck: true,

  clockStart: function () {
    return (this.time = new Date());
  },

  clockTick: function () {
    this.tick = setInterval(() => {
      const userTimezoneOffset = Math.abs(
        new Date().getTimezoneOffset() * 60000
      );
      let timeAfter = new Date();
      let differenceInTime = timeAfter.getTime() - this.time.getTime();
      let date = new Date(differenceInTime - userTimezoneOffset);

      function showTimeInTimer(unitTime, value) {
        if (unitTime == "milliseconds") {
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

      showTimeInTimer("hours", date.getHours());
      showTimeInTimer("minutes", date.getMinutes());
      showTimeInTimer("seconds", date.getSeconds());
      showTimeInTimer("milliseconds", date.getMilliseconds());
    }, 0);
  },

  clockStop: function () {
    clearInterval(this.tick);
  },

  timerStart: function () {
    if (this.timerCheck) {
      this.clockStart();
      this.clockTick();
    }
    this.timerCheck = false;
  },
};
