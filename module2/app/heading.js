let getTimezone = () => Math.abs(new Date().getTimezoneOffset() * 60000);

(function init() {
  createHeadline();
  timerCreate();
  createAboutBlock();
})();

// class HTMLElement {
//   #blockName;
//   #className;
//   #inner;
//   #id;

//   constructor (blockName, className, inner, id) {
//     this.blockName = blockName;
//     this.className = className;
//     this.inner = inner;
//     this.id = id;
//   }
//   get blockName() {
//     return this.blockName;
//   }
//   get className() {
//     return this.#className;
//   }
//   get inner() {
//     return this.#inner;
//   }
//   get id() {
//     return this.#id;
//   }
//   set blockName(value) {
//     this.#blockName = value;
//     if (value == null) return;
//   }
//   set className(value) {
//     this.#blockName = value;
//     if (value == null) return;
//   }
//   set inner(value) {
//     this.#blockName = value;
//     if (value == null) return;
//   }
//   set id(value) {
//     this.#blockName = value;
//     if (value == null) return;
//   }
//   // appendElement(parentsElement) {
//   //   parentsElement.append(this.block);
//   // }
// }

function createHTMLBlock(nameBlock, className, inner, id) {
  let block = document.createElement(`${nameBlock}`);
  block.className = `${className}`;
  if (inner) block.innerHTML = `${inner}`;
  if (id) block.id = `${id}`;
  return block;
}

function reloadPage() {
  window.location.reload();
  localStorage.setItem("timer-start", false);
}


function createHeadline() {
  let heading = createHTMLBlock("div", "heading container");
  document.body.prepend(heading);

  let headingMainInfo = createHTMLBlock("div", "heading__main");
  heading.prepend(headingMainInfo);

  let title = createHTMLBlock("h1", "heading__title", "2048");
  let scoreBlock = createHTMLBlock("div", "heading__score score");

  let scoreCount = createHTMLBlock("div", "score__count");
  let scoreTitle = createHTMLBlock("p", "score__title", "score");
  let scoreValue = createHTMLBlock("p", "score__value", "0", "score-value");
  scoreCount.append(scoreTitle, scoreValue);

  let bestScoreCount = createHTMLBlock("div", "score__count");
  let bestScoreTitle = createHTMLBlock("div", "score__title", "best time");

  let bestTimeValue = createHTMLBlock(
    "p",
    "score__value",
    `${
      localStorage.getItem("best-time")
        ? localStorage.getItem("best-time")
        : 0
    }`,
    "best-result"
  );
  bestScoreCount.append(bestScoreTitle, bestTimeValue);

  scoreBlock.append(scoreCount, bestScoreCount);
  headingMainInfo.append(title, scoreBlock);
}

function createAboutBlock() {
  let aboutInfo = createHTMLBlock("div", "heading__about");
  let aboutText = createHTMLBlock(
    "div",
    "heading__about-text",
    "<p class = heading__about-text>Join the tiles, get to <b>2048</b>!</p><p class = heading__about-text>Once you shift the cells, time will go!</p>"
  );
  aboutInfo.append(aboutText);
  document.querySelector(".heading").append(aboutInfo);

  let resetButton = createHTMLBlock(
    "button",
    "button button-reset",
    "New Game"
  );
  resetButton.onclick = function () {
    reloadPage();
  };
  aboutInfo.append(resetButton);
}

function timerCreate() {
  let timer = createHTMLBlock(
    "div",
    "headline__timer timer score__count",
    "",
    "timer"
  );

  let timerTitle = createHTMLBlock("p", "timer__title score__title", "Timer");
  let timeBlock = createHTMLBlock(
    "div",
    "timer__block",
    ` <p class="timer__hours score__value" id="hours">00</p><span class="score__value">:</span>
      <p class="timer__minutes score__value" id="minutes">00</p><span class="score__value">:</span>
      <p class="timer__seconds score__value" id="seconds">00</p><span class="score__value">
      <p class="timer__milliseconds score__value" id="milliseconds">000</p>`,
    "clock"
  );

  timer.append(timerTitle, timeBlock);
  document.querySelector(".heading__title").after(timer);
}
