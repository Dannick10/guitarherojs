export class Game {
  constructor() {
    this.HTMLboard = document.querySelector("#game");
    this.HTMLdot = document.querySelector("#dotPoint");
    this.HTMLprogressMatch = document.querySelector("#progressMatch");
    this.ctxBoard = this.HTMLboard.getContext("2d");
    this.ctxDot = this.HTMLdot.getContext("2d");
    this.ctxProgressMatch = this.HTMLprogressMatch.getContext("2d");
    this.pointBoard = document.querySelector(".pointsScore p");
    this.vel = 10;
    this.unitsize = 40;
    this.notesSpacing = 8;
    this.tileNotes = [
      { note: 0, color: "green", position: this.notesSpacing, velocityY: 0 },
      { note: 1, color: "red", position: this.notesSpacing * 8, velocityY: 0 },
      {
        note: 2,
        color: "yellow",
        position: this.notesSpacing * 8 * 2,
        velocityY: 0,
      },
      {
        note: 3,
        color: "blue",
        position: this.notesSpacing * 8 * 3,
        velocityY: 0,
      },
      {
        note: 4,
        color: "orange",
        position: this.notesSpacing * 8 * 4,
        velocityY: 0,
      },
    ];
    this.currentNote = [];
    this.running = false;
    this.noteLimiting = this.HTMLboard.height - this.unitsize - 10;
    this.colorBackground = "rgba(60,60,180,0.8)";
    this.VelocityGenerateNote = 200;
    this.dificulty = 3;
    this.missNote = null;
    this.rightNote = null;
    this.wrongNote = false;
    this.speedEffectGame = 50;
    this.timeDurationMissNote = this.speedEffectGame;
    this.timeDurationRightNote = this.speedEffectGame;
    this.timeDurationWrongNote = this.speedEffectGame;
    this.progressLine = 0

    this.controls = {
      note1: "a",
      note2: "s",
      note3: "j",
      note4: "k",
      note5: "l",
    };

    this.CurrentMatch = {
      totalpoints: 0,
      totalNoteMatch: 0,
      totalMissNote: 0,
      totalRightNote: 0,
      totalWrongNote: 0,
      totalComboNote: 0,
      addComboNote: 0,
      rangerLineDot: 5,
    };

    this.initEvents();
  }

  initEvents() {
    document
      .querySelector("#green")
      .addEventListener("click", () => this.PlayNote(0));
    document
      .querySelector("#red")
      .addEventListener("click", () => this.PlayNote(1));
    document
      .querySelector("#yellow")
      .addEventListener("click", () => this.PlayNote(2));
    document
      .querySelector("#blue")
      .addEventListener("click", () => this.PlayNote(3));
    document
      .querySelector("#orange")
      .addEventListener("click", () => this.PlayNote(4));
    addEventListener("keydown", (event) => this.convertKeys(event));
  }

  drawNote() {
    this.currentNote.forEach((note) => {
      this.ctxBoard.fillStyle = note.color;
      this.circleNote(note);
    });
  }

  circleNote(note) {
    this.ctxBoard.beginPath();
    this.ctxBoard.fillStyle = note.color;
    this.ctxBoard.arc(
      note.position + this.notesSpacing * 2,
      note.velocityY,
      this.unitsize / 2,
      0,
      2 * Math.PI
    );
    this.ctxBoard.fill();

    this.ctxBoard.beginPath();
    this.ctxBoard.fillStyle = "rgba(0,0,0,0.4)";
    this.ctxBoard.arc(
      note.position + this.notesSpacing * 2,
      note.velocityY,
      this.unitsize / 3,
      0,
      2 * Math.PI
    );
    this.ctxBoard.fill();
  }

  drawGuitar() {
    this.backgroundGuitar();
    this.lineLimitingGuitar();
    this.listChordsGuitar();
  }

  backgroundGuitar() {
    const gradient = this.ctxBoard.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, this.colorBackground);
    gradient.addColorStop(1, "rgba(0,0,0,0.9)");
    this.ctxBoard.fillStyle = gradient;
    this.ctxBoard.fillRect(0, 0, this.HTMLboard.width, this.HTMLboard.height);
  }

  lineLimitingGuitar() {
    this.ctxBoard.fillStyle = "rgba(255,255,255,0.9)";
    this.ctxBoard.fillRect(0, this.noteLimiting, this.HTMLboard.width, 100);
  }

  listChordsGuitar() {
    this.ctxBoard.fillStyle = "rgba(0,0,0,0.2)";
    for (let i = 0; i <= this.tileNotes.length; i++) {
      this.ctxBoard.fillRect(
        this.notesSpacing * i * 7,
        0,
        10,
        this.HTMLboard.height
      );
    }
  }

  TextDraw() {
    this.ctxBoard.font = "90px serif";
    this.ctxBoard.fontStretch = "extra-expanded";
    this.ctxBoard.fillStyle = "rgba(255,255,255,0.9)";
    this.ctxBoard.fillText(
      "Guitar hero",
      this.HTMLboard.width / 4,
      this.HTMLboard.height / 2,
      140
    );
  }

  randomNote() {
    let indexNote = this.generateNumber(this.dificulty);
    let selectNote = { ...this.tileNotes[indexNote] };
    this.currentNote.push(selectNote);
    this.managerPointsMatch("ADDNOTE");
  }

  generateNumber(dificulty) {
    return Math.floor(Math.random() * dificulty);
  }

  clearBoard() {
    this.ctxBoard.clearRect(0, 0, this.HTMLboard.width, this.HTMLboard.height);
  }

  moveNote() {
    this.currentNote.forEach((note) => {
      note.velocityY += this.vel;
    });
  }

  drawDotPoint() {
    let width = this.HTMLdot.width,
      height = this.HTMLboard.height;
    let middleHeight = height / 8;
    this.ctxDot.fillStyle = "#F21F0C";
    this.ctxDot.fillRect(0, 0, width, height);
    this.ctxDot.fillStyle = "#F2A413";
    this.ctxDot.fillRect(0, 0, width, middleHeight);
    this.ctxDot.fillStyle = "#A0A603";
    this.ctxDot.fillRect(0, 0, width, middleHeight / 2);
    this.drawMarkerLineDot();
  }

  drawMarkerLineDot() {
    let porcentLineDot = 2 * 10 * this.CurrentMatch.rangerLineDot;
    let PositionHeightDot = Math.min(Math.max(0, porcentLineDot / 2), 90);
    let invertedPositionHeightDot = 90 - PositionHeightDot;
    this.ctxDot.fillStyle = "white";
    this.ctxDot.fillRect(0, invertedPositionHeightDot, this.HTMLdot.width, 5);
  }

  drawEffects() {
    this.drawEffectMissNote();
    this.drawEffectRightNote();
    this.drawEffectWrongNote();
  }

  drawEffectMissNote() {
    this.timeDurationMissNote--;
    if (this.missNote && this.timeDurationMissNote >= 0) {
      this.ctxBoard.font = "50px serif";
      this.ctxBoard.fillStyle = "rgba(255,255,255,0.9)";
      this.ctxBoard.fillText(
        "MISS",
        this.missNote.position - 2,
        this.HTMLboard.height - 80 + this.timeDurationMissNote,
        60
      );
    } else {
      this.timeDurationMissNote = this.speedEffectGame;
      this.missNote = null;
    }
  }

  drawEffectRightNote() {
    this.timeDurationRightNote--;
    if (this.rightNote && this.timeDurationRightNote >= 0) {
      this.ctxBoard.font = "50px serif";
      this.ctxBoard.fillStyle = "rgba(255,255,255,0.9)";
      this.ctxBoard.fillText(
        "🔥",
        this.rightNote.position - 2,
        this.HTMLboard.height -
          20 +
          Math.floor((Math.random() * this.timeDurationRightNote) / 3),
        60
      );
    } else {
      this.timeDurationRightNote = this.speedEffectGame / 2;
      this.rightNote = null;
    }
  }

  drawEffectWrongNote() {
    this.timeDurationWrongNote--;
    const gradient = this.ctxBoard.createLinearGradient(0, -500, 0, 360);
    gradient.addColorStop(0, "rgba(0,0,0,0.1)");
    gradient.addColorStop(1, "rgba(100,50,150,0.2)");
    this.ctxBoard.fillStyle = gradient;
    if (this.timeDurationWrongNote >= 0 && this.wrongNote == true) {
      this.ctxBoard.fillRect(0, 0, this.HTMLboard.width, this.HTMLboard.height);
    } else {
      this.timeDurationWrongNote = this.speedEffectGame / 2;
      this.wrongNote = false;
    }
  }

  drawProgressTimeMatch() {
    const { width, height } = this.HTMLprogressMatch;

    const gradient = this.ctxProgressMatch.createLinearGradient(10, 80, 0, 1);
    gradient.addColorStop(0, "rgba(20,20,50,0.2)");
    gradient.addColorStop(1, "rgba(80,80,120,0.2)");
    this.ctxProgressMatch.fillStyle = gradient;
    this.ctxProgressMatch.fillRect(0, 0, width, height);

    this.ctxProgressMatch.fillStyle = "rgb(200,60,30)";
    this.ctxProgressMatch.fillRect(0, height -this.progressLine, width, this.progressLine);
 
  }

  checkMissNote() {
    this.currentNote.forEach((note) => {
      if (note.velocityY >= this.noteLimiting + this.unitsize * 3) {
        this.missNote = note;
        this.currentNote.shift();
        this.managerPointsMatch("ADDMISSNOTE");
      }
    });
  }

  PlayNote(keypress) {
    if (this.currentNote[0].note == keypress) {
      if (
        this.currentNote[0].velocityY >=
        this.noteLimiting - this.unitsize + 20
      ) {
        this.rightNote = this.currentNote[0];
        this.managerPointsMatch("ADDPOINTS");
        this.managerPointsMatch("ADDCOMBONOTE");
        this.managerPointsMatch("ADDRIGHTNOTE");
        this.currentNote.shift();
      } else {
        this.wrongNote = true;
        this.managerPointsMatch("ADDWRONGNOTE");
      }
    } else {
      this.wrongNote = true;
      this.managerPointsMatch("ADDWRONGNOTE");
    }
  }

  managerPointsMatch(action) {
    switch (action) {
      case "ADDPOINTS":
        this.CurrentMatch.totalpoints += this.CurrentMatch.rangerLineDot;
        this.pointBoard.innerText = this.CurrentMatch.totalpoints;
        break;
      case "ADDMISSNOTE":
        this.CurrentMatch.totalMissNote += 1;
        this.CurrentMatch.addComboNote = 0;
        this.manegeLineDot(-1);
        break;
      case "ADDRIGHTNOTE":
        this.manegeLineDot(1);
        this.CurrentMatch.totalRightNote += 1;
        break;
      case "ADDWRONGNOTE":
        this.manegeLineDot(-1);
        this.CurrentMatch.totalWrongNote += 1;
        this.CurrentMatch.addComboNote = 0;
        break;
      case "ADDCOMBONOTE":
        this.CurrentMatch.addComboNote += 1;

        if (
          this.CurrentMatch.addComboNote >= this.CurrentMatch.totalComboNote
        ) {
          this.CurrentMatch.totalComboNote = this.CurrentMatch.addComboNote;
        }
        break;
      case "ADDNOTE":
        this.CurrentMatch.totalNoteMatch += 1;
        break;
    }
  }

  manegeLineDot(action) {
    this.CurrentMatch.rangerLineDot += action;

    this.CurrentMatch.rangerLineDot = Math.min(
      Math.max(-3, this.CurrentMatch.rangerLineDot),
      10
    );
  }

  UpddateCurrentCombo() {
    if (this.CurrentMatch.addComboNote >= 50) {
      this.ctxBoard.font = "30px serif";
      this.ctxBoard.fontStretch = "extra-expanded";
      this.ctxBoard.fillStyle = "rgba(255,255,255,0.9)";
      this.ctxBoard.fillText(
        this.CurrentMatch.addComboNote,
        this.HTMLboard.width / 2 - 10,
        this.HTMLboard.height / 2 + 50,
        140
      );
    }
  }

  convertKeys(event) {
    let keyPress = event.key.toLowerCase();
    switch (keyPress) {
      case this.controls.note1:
        this.PlayNote(0);
        break;
      case this.controls.note2:
        this.PlayNote(1);
        break;
      case this.controls.note3:
        this.PlayNote(2);
        break;
      case this.controls.note4:
        this.PlayNote(3);
        break;
      case this.controls.note5:
        this.PlayNote(4);
        break;
    }
  }

  generateNotes() {
    if (this.running) {
      setTimeout(() => {
        this.randomNote();
        this.generateNotes();
      }, this.VelocityGenerateNote);
    }
  }

  startGame() {
    this.running = true;
    this.gameLoop();
    this.generateNotes();
  }

  overGame() {
    if (this.CurrentMatch.rangerLineDot <= -3) this.running = false;
  }

  gameLoop() {
    if (this.running) {
      this.clearBoard();
      this.drawProgressTimeMatch();
      this.drawGuitar();
      this.TextDraw();
      this.drawDotPoint();
      this.drawNote();
      this.moveNote();
      this.checkMissNote();
      this.drawEffects();
      this.UpddateCurrentCombo();
      this.overGame();
      requestAnimationFrame(() => this.gameLoop());
    }
  }
}
