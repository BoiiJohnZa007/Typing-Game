const word = document.getElementById("word")
const text = document.getElementById("text")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const startpageE1 = document.getElementById("firstmenu-container")
const playEl = document.getElementById("play-container")
const endgameEl = document.getElementById("end-game-container")
const enemyImg = document.querySelector(".enemy img"); // <- img inside enemy div
const enemyDiv = document.querySelector(".enemy");     // <- div itself
const containerE1 = document.querySelector(".container");


var audio = new Audio('./sprite/pixel1.mp3');
var audio1 = new Audio('./sprite/pixel1short.mp3');
audio.volume = 0.5;
audio1.volume = 0.5;

// List of words for game
const words = [
  "deheubarth",
  "gorllewin",
  "dwyrain",
  "gogledd",
  "saeson",
  "llydaw",
  "ynys prydain",
  "gwynedd",
  "powys",
  "dyfed",
  "gwent",
  "morgannwg",
  "chwyrligwgan",
  "bwlch",
  "swyddfeydd",
  "drosgl",
  "cychod",
  "cwmystwyth",
  "rhosllannerchrugog",
  "gwylchiadau",
  "ystradgynlais",
  "fflamddwyn",
  "cymdeithas",
  "ysgolheictod",
  "anghyfannedd",
  "bwlchgwynt",
  "rhyfeddodau",
  "cylchgronau",
  "trefnyddiaeth",
  "gwrthgyferbyniol",
  "ngwynfa",
  "cwmtwrch",
  "ysbrydoliaeth",
  "cydweithrediad",
  "anghyfartalwch",
  "gwrthryfelwyr",
  "cymhwysterau",
  "annogadwyedd",
  "traethmelyn",
  "mynyddoedd",
  "diddymiad",
  "ysgolfeistroliaeth",
  "cerrigydrudion",
  "trallwng",
  "ysgrifenyddiaeth",
  "gwrthgyferbyniadau",
  "eisteddfodau",
  "cariad",
  "mor",
  "afon",
  "bach",
  "dwr",
  "llys",
  "coed",
  "bwrdd",
  "arthur",
  "plouhaouen",
  "breizh",
  "lannion",
  "gwezennou",
  "chansadou",
  "ankou",
  "kernev",
  "yezh",
  "tregerieg",
  "plougastell",
  "douarnenez",
  "kemperle",
  "karantez",
  "aotrou",
  "kreizenn",
  "gwenn",
  "duu",
  "speredel",
  "anor",
  "gouezeg",
  "marvadez",
  "stummadur",
  "treuzkas",
  "nozvezh",
  "kenderc helourien",
  "dibaberourien",
  "kreizenneladur",
  "skouerourien",
  "anavezet",
  "gantleizadurezh",
  "kenderc helerezh",
  "dibaberezh",
  "stummaduriou",
  "skrivaninderien"
]

// Init word
let randomWord

let startyet = false

// Init score ENEMY HEALTH
let score = 0

// Init time
let time = 10
let timeInterval;

// Focus on text on start
text.focus()

// Start counting down
//const timeInterval = setInterval(updateTime, 1000)

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord()
  word.innerHTML = randomWord
}

// Update score
function updateScore() {
  time ++
  scoreEl.innerHTML = score
  audio1.play();
}

function updateTime() {
  score++
  scoreEl.innerHTML = score + "s"
  timeEl.innerText = time;  // update the UI

  if (time <= 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
startpageE1.addEventListener("click", startGame);

function startGame() {
  playEl.style.display = "block";
  startpageE1.style.display = "none";
  enemyDiv.style.display = "block";
  startyet = true;


  startIdle();
  startEnemyBehavior();

  clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
}

// Game over, show end screen
function gameOver() {
  playEl.style.display = "none";
  endgameEl.style.display = "block";
  startyet = false;
  state = "idle";
  document.getElementById("final-score").innerText = `You survived for ${score} seconds`;
}

addWordToDOM()

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value

  if (insertedText === randomWord) {
    addWordToDOM()
    updateScore()

    // Clear
    e.target.value = ""
    updateTime()
    enemyImg.style.filter = "brightness(1.5)";
    setTimeout(() => {
    enemyImg.style.filter = "brightness(1)";
    }, 200);
  }
})








let idleInterval;
let state = "idle";

const idleFrames = [
  "./sprite/notcompress/idle1.png",
  "./sprite/notcompress/ready1.png"
];

const attackFrames = [
  "./sprite/notcompress/ready1.png",
  "./sprite/notcompress/ready2.png",
  "./sprite/notcompress/ready3.png",
  "./sprite/notcompress/ready4.png"
];

// --- Idle Animation ---
function startIdle() {
  stopIdle();
  state = "idle";
  let frame = 0;
  idleInterval = setInterval(() => {
    if (state !== "idle") return;
    enemyImg.src = idleFrames[frame];
    frame = (frame + 1) % idleFrames.length;
  }, 500);
}

function stopIdle() {
  clearInterval(idleInterval);
}

// --- Attack Animation ---
function enemyAttack() {
  stopIdle();
  state = "attack";
  let frame = 0;

  const attackInterval = setInterval(() => {
    enemyImg.src = attackFrames[frame];
    frame++;

    if (frame >= attackFrames.length) {
      clearInterval(attackInterval);
      flashBody();
      time -= 2;
      audio.play();
      startIdle(); // go back to idle after attack
  
    }
  }, 500); // 4 frames = 1 second
}

// --- Start attacking every 6 seconds ---
function startEnemyBehavior() {
  startIdle(); // begin idle animation immediately
  setInterval(() => {
    if (state === "idle") { // only attack if currently idle
      enemyAttack();
    }
  }, 5000);
}

function flashBody() {
  // Apply filter to the container div only
  containerE1.style.filter = "brightness(1.5)";

  // Revert after 200ms
  setTimeout(() => {
    containerE1.style.filter = "brightness(1)";
  }, 200);
}
