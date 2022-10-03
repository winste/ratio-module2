let tick;
let timerCheck = true;

function clockStart() {
  return time = new Date();
}

function clockTick() {
  tick = setInterval(() => {
    let timeAfter = new Date();
    let userTimezoneOffset = getTimezone();
  
    let diffTime = timeAfter.getTime() - time.getTime();
    let date = new Date(diffTime - userTimezoneOffset);

    function showTimeInTimer(name, value) {
      if (name == "milliseconds") {
        document.getElementById(name).innerHTML = (value < 100 && value > 10) //78
                                                    ? "0" + value 
                                                    : "00" + value;
      }
      else {
        document.getElementById(name).innerHTML = (value < 10) 
                                                    ? "0" + value 
                                                    : value;
      }
    }

    showTimeInTimer("hours", date.getHours());
    showTimeInTimer("minutes", date.getMinutes());
    showTimeInTimer("seconds", date.getSeconds());
    showTimeInTimer("milliseconds", date.getMilliseconds());
  }, 0)
}


function clockStop() {
  clearInterval(tick);
}


function startClockByMouse() {
  if (timerCheck)  {
    clockStart();
    clockTick();
  };
  
  timerCheck = false;
}




