const board = document.querySelector("canvas");
const ctx = board.getContext("2d");
const vel = 10,
  unitsize = 40,
  notesSpacing = 8;
const tileNotes = [
  {
    note: 0,
    color: "green",
    position: notesSpacing,
    velocityY: 0,
  },
  {
    note: 1,
    color: "red",
    position: notesSpacing * 8,
    velocityY: 0,
  },
  {
    note: 2,
    color: "yellow",
    position: notesSpacing * 8 * 2,
    velocityY: 0,
  },
  {
    note: 3,
    color: "blue",
    position: notesSpacing * 8 * 3,
    velocityY: 0,
  },
  {
    note: 4,
    color: "orange",
    position: notesSpacing * 8 * 4,
    velocityY: 0,
  },
];
let currentNote = [];
let running = false;
let noteLimiting = board.height - unitsize - 10;
let colorBackground = "rgba(60,60,180,0.8)";

let missNote = null;
let rightNote = null
let speedEffectGame = 50;
let TimeDurationMissNote = speedEffectGame;
let timeDurationRightNote = speedEffectGame;

const note1 = document.querySelector("#green");
const note2 = document.querySelector("#red");
const note3 = document.querySelector("#yellow");
const note4 = document.querySelector("#blue");
const note5 = document.querySelector("#orange");

note1.addEventListener("click", () => PlayNote(currentNote, 0));
note2.addEventListener("click", () => PlayNote(currentNote, 1));
note3.addEventListener("click", () => PlayNote(currentNote, 2));
note4.addEventListener("click", () => PlayNote(currentNote, 3));
note5.addEventListener("click", () => PlayNote(currentNote, 4));

addEventListener("keydown", convertKeys);

function drawNote(actualNotes) {
  actualNotes.forEach((note) => {
    ctx.fillStyle = note.color;
    circleNote(note);
    railsNote(note);
  });

  function circleNote(note) {
    ctx.beginPath();
    ctx.arc(
      note.position + notesSpacing * 2,
      note.velocityY,
      unitsize / 2,
      0,
      2 * Math.PI
    );

    ctx.fill();
  }

  function railsNote(note) {
    const gradient = ctx.createLinearGradient(0, 200, 0, 100);
    gradient.addColorStop(0, note.color);
    gradient.addColorStop(1, colorBackground);

    ctx.fillStyle = gradient;

    ctx.fillRect(
      note.position - 4,
      note.velocityY - unitsize,
      unitsize,
      unitsize
    );
  }
}

function drawGuitar() {
  backgroundGuitar();

  lineLimitingGuitar();

  listChordsGuitar();

function backgroundGuitar() {
  const gradient = ctx.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, colorBackground);
  gradient.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, board.width, board.height);
}

function lineLimitingGuitar() {
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(0, noteLimiting, board.width, 100);
}

function listChordsGuitar() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  for (let i = 0; i <= tileNotes.length; i++) {
    ctx.fillRect(notesSpacing * i * 7, 0, 10, board.height);
  }
}
}

function TextDraw() {
  ctx.font = "90px serif";
  ctx.fontStretch = "extra-expanded";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("Guitar hero", board.width / 4, board.height / 2, 140);
}

function randomNote() {
  let indexNote = generateNumber();

  function generateNumber() {
    return Math.floor(Math.random() * tileNotes.length);
  }
  let selectNote = { ...tileNotes[indexNote] };

  currentNote.push(selectNote);
}

function clearBoard() {
  ctx.clearRect(0, 0, board.width, board.height);
}

function moveNote(actualNotes) {
  actualNotes.forEach((note) => {
    note.velocityY += vel;
  });
}

function drawEffectMissNote() {
  TimeDurationMissNote--;
  if (missNote && TimeDurationMissNote >= 0) {
    ctx.font = "60px serif";
    ctx.fontStretch = "extra-expanded";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(
      "MISS",
      missNote.position - 2,
      board.height - 80 + TimeDurationMissNote,
      60
    );
  } else {
    TimeDurationMissNote = speedEffectGame;
    missNote = null;
  }
}

function drawEffectRightNote() {
  timeDurationRightNote--
  if(rightNote && timeDurationRightNote >= 0) {
    ctx.font = "50px serif";
    ctx.fontStretch = "extra-expanded";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(
      "️‍🔥",
      rightNote.position -2,
      board.height - 20 +  Math.random(timeDurationRightNote / 2),
      60
    );

  } else {
    timeDurationRightNote = speedEffectGame/2;
    rightNote = null
  }
}

function checkMissNote(actualNotes) {
  actualNotes.forEach((note) => {
    if (note.velocityY >= noteLimiting + unitsize * 3) {
      missNote = note;
      actualNotes.pop();
      randomNote();
    }
  });
}

function PlayNote(actualNotes, keypress) {
  actualNotes.forEach((note) => {
    if (note.note == keypress) {
      if (note.velocityY >= noteLimiting - unitsize + 20) {
        actualNotes.pop();
        randomNote();
        rightNote = note
      } else {
      }
    } else {
    }
  });
}

function convertKeys(event) {
  let keypress = event.keyCode;

  const keyA = 65;
  const keyS = 83;
  const keyJ = 74;
  const keyK = 75;
  const keyL = 76;

  switch (true) {
    case keypress == keyA:
      PlayNote(currentNote, 0);
      break;
    case keypress == keyS:
      PlayNote(currentNote, 1);
      break;
    case keypress == keyJ:
      PlayNote(currentNote, 2);
      break;
    case keypress == keyK:
      PlayNote(currentNote, 3);
      break;
    case keypress == keyL:
      PlayNote(currentNote, 4);
      break;
  }
}

function gameStart() {
  running = true;
  randomNote();

  function tick() {
    if (running == true) {
      clearBoard();
      moveNote(currentNote);
      drawGuitar();
      TextDraw();
      drawNote(currentNote);
      checkMissNote(currentNote);
      drawEffectRightNote();
      drawEffectMissNote();
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

setTimeout(() => {
  gameStart();
}, 800);
