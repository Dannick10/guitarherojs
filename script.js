const board = document.querySelector("#game");
const ctx = board.getContext("2d");
const boardDot = document.querySelector("#dotPoint");
const ctxDot = boardDot.getContext("2d");
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
let VelocityGenerateNote = 500;
let dificulty = 5;

let missNote = null;
let rightNote = null;
let wrongNote = false;
let speedEffectGame = 50;
let timeDurationMissNote = speedEffectGame;
let timeDurationRightNote = speedEffectGame;
let timeDurationWrongNote = speedEffectGame;

let CurrentMatch = {
  totalpoints: 0,
  totalNoteMatch: 0,
  totalMissNote: 0,
  totalRightNote: 0,
  totalWrongNote: 0,
  totalComboNote: 0,
  addComboNote: 0,
  rangerLineDot: 5,
};

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
  });

  function circleNote(note) {
    ctx.beginPath();
    ctx.fillStyle = note.color;
    ctx.arc(
      note.position + notesSpacing * 2,
      note.velocityY,
      unitsize / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.arc(
      note.position + notesSpacing * 2,
      note.velocityY,
      unitsize / 3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  function railsNote(note) {
    const gradient = ctx.createLinearGradient(0, 100, 0, 50);
    gradient.addColorStop(0, note.color);
    gradient.addColorStop(1, `rgba(50,50,255,0.5)`);

    ctx.fillStyle = gradient;

    ctx.fillRect(
      note.position + 5,
      note.velocityY - unitsize - 10,
      unitsize / 2,
      unitsize + 20
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
  let indexNote = generateNumber(dificulty);

  function generateNumber(dificulty) {
    return Math.floor(Math.random() * dificulty);
  }
  let selectNote = { ...tileNotes[indexNote] };

  currentNote.push(selectNote);

  managerPointsMatch("ADDNOTE");
}

function clearBoard() {
  ctx.clearRect(0, 0, board.width, board.height);
}

function moveNote(actualNotes) {
  actualNotes.forEach((note) => {
    note.velocityY += vel;
  });
}

function drawDotPoint() {
  let width = boardDot.width,
    height = board.height;
  let middleHeight = height / 8;

  ctxDot.fillStyle = "#F21F0C";
  ctxDot.fillRect(0, 0, width, height);

  ctxDot.fillStyle = "#F2A413";
  ctxDot.fillRect(0, 0, width, middleHeight);

  ctxDot.fillStyle = "#A0A603";
  ctxDot.fillRect(0, 0, width, middleHeight / 2);

  function drawmarkerLineDot() {
    let porcentLineDot = 2 * 10 * CurrentMatch.rangerLineDot;
    let PositionHeightDot = Math.min(Math.max(0, porcentLineDot / 2), 90);
    let invertedPositionHeightDot = 90 - PositionHeightDot;
    
    ctxDot.fillStyle = "white";
    ctxDot.fillRect(0, invertedPositionHeightDot, width, 5);
  }

  drawmarkerLineDot();
}

function drawEffectMissNote() {
  timeDurationMissNote--;
  if (missNote && timeDurationMissNote >= 0) {
    ctx.font = "50px serif";
    ctx.fontStretch = "extra-expanded";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(
      "MISS",
      missNote.position - 2,
      board.height - 80 + timeDurationMissNote,
      60
    );
  } else {
    timeDurationMissNote = speedEffectGame;
    missNote = null;
  }
}

function drawEffectRightNote() {
  timeDurationRightNote--;
  if (rightNote && timeDurationRightNote >= 0) {
    ctx.font = "50px serif";
    ctx.fontStretch = "extra-expanded";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(
      "️‍🔥",
      rightNote.position - 2,
      board.height -
        20 +
        Math.floor((Math.random() * timeDurationRightNote) / 3),
      60
    );
  } else {
    timeDurationRightNote = speedEffectGame / 2;
    rightNote = null;
  }
}

function drawEffectWrongNote() {
  timeDurationWrongNote--;

  const gradient = ctx.createLinearGradient(0, -500, 0, 360);
  gradient.addColorStop(0, "rgba(0,0,0,0.1)");
  gradient.addColorStop(1, "rgba(100,50,150,0.2)");

  ctx.fillStyle = gradient;

  if (timeDurationWrongNote >= 0 && wrongNote == true) {
    ctx.fillRect(0, 0, board.width, board.height);
  } else {
    timeDurationWrongNote = speedEffectGame / 2;
    wrongNote = false;
  }
}

function checkMissNote(actualNotes) {
  actualNotes.forEach((note) => {
    if (note.velocityY >= noteLimiting + unitsize * 3) {
      missNote = note;
      actualNotes.shift();
      managerPointsMatch("ADDMISSNOTE");
    }
  });
}

function PlayNote(actualNotes, keypress) {
  if (actualNotes[0].note == keypress) {
    if (actualNotes[0].velocityY >= noteLimiting - unitsize + 20) {
      rightNote = actualNotes[0];
      managerPointsMatch("ADDPOINTS");
      managerPointsMatch("ADDCOMBONOTE");
      managerPointsMatch("ADDRIGHTNOTE");
      actualNotes.shift();
    } else {
      wrongNote = true;
      managerPointsMatch("ADDWRONGNOTE");
    }
  } else {
    wrongNote = true;
    managerPointsMatch("ADDWRONGNOTE");
  }
}

function generateNote() {
  if (running) {
    setTimeout(() => {
      randomNote();
      generateNote();
    }, VelocityGenerateNote);
  }
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

function managerPointsMatch(action) {
  switch (true) {
    case action == "ADDNOTE":
      CurrentMatch.totalNoteMatch++;
      break;
    case action == "ADDPOINTS":
      CurrentMatch.totalpoints++;
      break;
    case action == "ADDRIGHTNOTE":
      managerRangerLineDot(1);
      CurrentMatch.totalRightNote++;
      break;
    case action == "ADDMISSNOTE":
      CurrentMatch.totalMissNote++;
      managerRangerLineDot(-1);
      CurrentMatch.addComboNote = 0;
      break;
    case action == "ADDWRONGNOTE":
      CurrentMatch.totalWrongNote++;
      managerRangerLineDot(-1);
      CurrentMatch.addComboNote = 0;
      break;
    case action == "ADDCOMBONOTE":
      CurrentMatch.addComboNote++;

      if (CurrentMatch.addComboNote >= CurrentMatch.totalComboNote) {
        CurrentMatch.totalComboNote = CurrentMatch.addComboNote;
      }

      break;
  }

  function managerRangerLineDot(action) {
    CurrentMatch.rangerLineDot += action;

    CurrentMatch.rangerLineDot = Math.min(
      Math.max(0, CurrentMatch.rangerLineDot),
      10
    );
  }
  console.table(CurrentMatch);
}

function gameStart() {
  running = true;

  generateNote();

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
      drawEffectWrongNote();
      drawDotPoint();
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

setTimeout(() => {
  gameStart();
}, 800);
