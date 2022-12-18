/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const easyArr = [
  "Hello",
  "Code",
  "Town",
  "Scala",
  "Funny",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
];
const normalArr = [
  "Country",
  "Testing",
  "Youtube",
  "Twitter",
  "Github",
  "Python",
  "Cascade",
  "Coding",
  "Working",
  "Playing",
];
const hardArr = [
  "Programming",
  "Javascript",
  "Linkedin",
  "Leetcode",
  "Internet",
  "Paradigm",
  "Styling",
  "Destructuring",
  "Documentation",
  "Dependencies",
];

// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 5,
  Hard: 4,
};

let defualtLevel;
let defualtLevelSeconds;
let chooseLvl = document.querySelector(".choose-lvl");

for (const key in lvls) {
  // Create Div Element
  let lvlDiv = document.createElement("div");
  let radio = document.createElement("input"); //input element, text
  radio.setAttribute("id", key);
  radio.setAttribute("type", "radio");
  radio.setAttribute("name", "stype");
  radio.setAttribute("value", key);

  let label = document.createElement("label");
  label.setAttribute("for", key);
  label.textContent = ` ${key} [ ${lvls[key]}s ]`;
  lvlDiv.appendChild(radio);
  lvlDiv.appendChild(label);
  chooseLvl.appendChild(lvlDiv);
  // Setting Level Name + Seconds + Score
  radio.onclick = function () {
    defualtLevel = this.value;
    defualtLevelSeconds = lvls[defualtLevel];
    lvlNameSpan.innerHTML = defualtLevel;
    secondsSpan.innerHTML = defualtLevelSeconds;
    timeLeftSpan.innerHTML = defualtLevelSeconds;
    if (this.value === "Easy"){
    scoreTotal.innerHTML = easyArr.length;
    } if (this.value === "Normal") {
      scoreTotal.innerHTML = normalArr.length;
    } if (this.value === "Hard") {
      scoreTotal.innerHTML = hardArr.length;
    }
    startButton.style.display = "block";
  };
}
// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let playAgain = document.querySelector(".reload");

// Disable Paste Event
input.onpaste = () => {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  chooseLvl.remove();
  // document.querySelector(".name").remove();
  document.querySelector(".the-word").style.marginTop = "-5px";
  // CallBack Generate Words Function
  genWords();
};

// Generate Words Function
function genWords() {
  // Get Easy Array
  if (defualtLevel === "Easy") {
    // Get Random Word From Array
    let randomEasyWords = easyArr[Math.floor(Math.random() * easyArr.length)];
    // Get Word Index
    theWord.innerHTML = randomEasyWords;
    // Show The Random Word
    let indexEasyWord = easyArr.indexOf(randomEasyWords);
    // Remove WordFrom Array
    easyArr.splice(indexEasyWord, 1);
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Words In Loop
    for (let i = 0; i < easyArr.length; i++) {
      // Create Div Element
      let div = document.createElement("div");
      let text = document.createTextNode(easyArr[i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
  }
  // Get Normal Array
  if (defualtLevel === "Normal") {
    // Get Random Word From Array
    let randomNormalWords =
      normalArr[Math.floor(Math.random() * normalArr.length)];
    // Get Word Index
    theWord.innerHTML = randomNormalWords;
    // Show The Random Word
    let indexNormalWord = normalArr.indexOf(randomNormalWords);
    // Remove WordFrom Array
    normalArr.splice(indexNormalWord, 1);
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Words In Loop
    for (let i = 0; i < normalArr.length; i++) {
      // Create Div Element
      let div = document.createElement("div");
      let text = document.createTextNode(normalArr[i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
  }
  // Get Hard Array
  if (defualtLevel === "Hard") {
    // Get Random Word From Array
    let randomHardWords = hardArr[Math.floor(Math.random() * hardArr.length)];
    // Get Word Index
    theWord.innerHTML = randomHardWords;
    // Show The Random Word
    let indexHardWord = hardArr.indexOf(randomHardWords);
    // Remove WordFrom Array
    hardArr.splice(indexHardWord, 1);
    // Empty Upcoming Words
    upcomingWords.innerHTML = "";
    // Generate Words In Loop
    for (let i = 0; i < hardArr.length; i++) {
      // Create Div Element
      let div = document.createElement("div");
      let text = document.createTextNode(hardArr[i]);
      div.appendChild(text);
      upcomingWords.appendChild(div);
    }
  }
  // CallBack Start Playing Function
  StartPlaying();
  // Save Score In Local Storage
  let dateNow = new Date();
  window.localStorage.setItem(
    "score",
    `${scoreGot.innerHTML} True In` + ` ${dateNow}`
  );
}

// Create Start Playing Function
function StartPlaying() {
  timeLeftSpan.innerHTML = defualtLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0" ||
      theWord.innerHTML.toLowerCase() === input.value.toLowerCase()
    ) {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        theWord.innerHTML = "";
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (easyArr.length > 0 && normalArr.length > 0 && hardArr.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let congrats = document.createElement("span");
          let playAgainSpan = document.createElement("span");
          congrats.className = "good";
          playAgainSpan.className = "play-again"
          congrats.innerHTML = "Congratz!";
          playAgainSpan.innerHTML = "Play Again"
          finishMessage.appendChild(congrats);
          playAgain.appendChild(playAgainSpan)
          input.remove();
          timeLeftSpan.innerHTML = ""
          playAgain.style.display = "block"
          playAgainSpan.onclick = () => {
            window.location.reload()
          }
        }
      } else {
        let gameOver = document.createElement("span");
        let playAgainSpan = document.createElement("span");
        gameOver.className = "bad";
        playAgainSpan.className = "play-again"
        gameOver.innerHTML = "Game Over";
        playAgainSpan.innerHTML = "Play Again"
        finishMessage.appendChild(gameOver);
        playAgain.appendChild(playAgainSpan)
        theWord.remove()
        input.remove();
        timeLeftSpan.innerHTML = "0"
        playAgain.style.display = "block"
        playAgainSpan.onclick = () => {
          window.location.reload()
        }
      }
    }
  }, 1000);
}
console.log(window.localStorage.getItem("score"));
