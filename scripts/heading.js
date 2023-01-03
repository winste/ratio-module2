function create(tag){
	return document.createElement(tag);
}

HTMLElement.prototype.appendTo = function(parent){
	parent.appendChild(this);
	return this;
}

HTMLElement.prototype.prependTo = function(parent){
	parent.prepend(this);
	return this;
}

HTMLElement.prototype.addClass = function(classValue){
	this.className = classValue;
	return this;
}

HTMLElement.prototype.addId = function(id){
	this.id = id;
	return this;
}

HTMLElement.prototype.content = function(content){
	this.innerHTML = content;
	return this;
}


const createHeadline = () => {
  const heading = create("section").addClass('heading container').prependTo(document.querySelector("body"));
      title = create("h1").addClass('heading__title').content('2048').appendTo(heading);
    
      aboutContainer = create("div").addClass("heading__about").appendTo(heading);
      aboutText = create("p").addClass("heading__about-text").content("Join the tiles, get to 2048!").appendTo(aboutContainer);
      aboutText2 = create("p").addClass("heading__about-text").content("When two tiles slide into each other, they merge into one!").appendTo(aboutContainer);
}

const createTimer = () => {
  const headlineResult = create("div").addClass("heading__result").appendTo(document.querySelector(".heading"));
      timeBlock = create("div").addClass("heading__time").appendTo(headlineResult);

      timer = create("div").addClass("heading__result-time timer").appendTo(timeBlock);
      timerTitle = create("p").addClass("heading__result-title timer__title").content("time: ").appendTo(timer);

      unitTime = create("div").addClass("heading__result-value timer__units").appendTo(timer);
      hours = create("p").addClass("timer__hours").addId("hours").content(`00`).appendTo(unitTime);
      hours.after(create("span").addClass("timer__colon").content(":"));
      minutes = create("p").addClass("timer__minutes").addId("minutes").content("00").appendTo(unitTime);
      minutes.after(create("span").addClass("timer__colon").content(":"));
      seconds = create("p").addClass("timer__seconds").addId("seconds").content("00").appendTo(unitTime);
      milliseconds = create("p").addClass("timer__milliseconds").addId("milliseconds").content("000").appendTo(unitTime);
}


const createBestTimeBLock = () => {
    const bestTimeCount = create("div").addClass("heading__result-time best-time").appendTo(document.querySelector(".heading__time"));
      bestTimeTitle = create("p").addClass("heading__result-title best-time__title").content("best: ").appendTo(bestTimeCount);
      bestTimeValue = create("p").addClass("heading__result-value best-time__value").addId("best-result").content(`${localStorage.getItem("best-time")
                                                                                              ? msToTime(localStorage.getItem("best-time")): 0}`)
                                                                                              .appendTo(bestTimeCount);
}


function msToTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 100);
    seconds = Math.floor((ms / 1000) % 60);
    minutes = Math.floor((ms / (1000 * 60)) % 60);
    hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  
  return  (hours) 
              ? `${hours}h ${minutes}m ${seconds}.${milliseconds}s`
              : `${minutes}m ${seconds}.${milliseconds}s`;
}


const createScoreBLock = () => {
  const headingScore = document.querySelector(".heading__result");
      scoreCount = create("div").addClass("heading__count score").appendTo(headingScore);
      scoreTitle = create("p").addClass("heading__result-title score__title").content("score: ").appendTo(scoreCount);
      scoreValue = create("p").addClass("heading__result-value score__value").addId("score-value").content("0").appendTo(scoreCount);
}


const createResetButton = () => {
  const resetButton = create("button").addClass("button button-reset").content("new game").appendTo(document.querySelector(".heading__result"));
  resetButton.onclick = () => window.location.reload();
}


createHeadline();   
createTimer();
createBestTimeBLock();
createScoreBLock();
createResetButton();


