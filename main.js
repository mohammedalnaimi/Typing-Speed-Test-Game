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
const words = [
  "Hello",
  // "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  // "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  // "Documentation",
  "Coding",
  "Funny",
  "Working",
  // "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Defualt Level
let defualtLevel = "Easy";
let defualtLevelSeconds = lvls[defualtLevel];

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

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defualtLevel;
secondsSpan.innerHTML = defualtLevelSeconds;
timeLeftSpan.innerHTML = defualtLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = () => {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // CallBack Generate Words Function
  genWords();
};

// Generate Words Function
function genWords() {
  // Get Random Word From Array
  let randomWords = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  theWord.innerHTML = randomWords;
  // Show The Random Word
  let indexWord = words.indexOf(randomWords);
  // Remove WordFrom Array
  words.splice(indexWord, 1);
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words In Loop
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }
  // CallBack Start Time Function
  startTime();
}

function startTime() {
  timeLeftSpan.innerHTML = defualtLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0" || theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        theWord.innerHTML = "";
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
         // Call Generate Word Function
          genWords();
        } else {
          let congrats = document.createElement("span");
          congrats.className = "good";
          congrats.innerHTML = "Congratz!";
          finishMessage.appendChild(congrats);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let gameOver = document.createElement("span");
        gameOver.className = "bad";
        gameOver.innerHTML = "Game Over";
        finishMessage.appendChild(gameOver);
      }
    }
  }, 1000);
}
