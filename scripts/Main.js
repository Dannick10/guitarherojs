import { Time } from "./TimeGame.js";
import { Game } from "./Game.js";

let velocitygame = 200;

const guitarHeroGame = new Game();
guitarHeroGame.dificulty = 5;
guitarHeroGame.VelocityGenerateNote = 200;
guitarHeroGame.controls.note1 = "a";
guitarHeroGame.controls.note2 = "s";
guitarHeroGame.controls.note3 = "1";
guitarHeroGame.controls.note4 = "2";
guitarHeroGame.controls.note5 = "3";

const music = [
  { note: 1, sec: 1 },  
  { note: 3, sec: 2 },
  { note: 1, sec: 3 },
  { note: 4, sec: 4 }, 
  { note: 3, sec: 5 },
  { note: 2, sec: 6 }, 
  { note: 4, sec: 8 },
];

const timeGame = new Time(0, 100);
timeGame.startMatchTime();

function InitialGame() {
  guitarHeroGame.startGame();
  guitarHeroGame.VelocityGenerateNote = 100;

  const intervalId = setInterval(() => {
    guitarHeroGame.progressLine = timeGame.getLinePorcent();

    if (timeGame.startTIme >= timeGame.endTime) {
      setTimeout(() => {
        guitarHeroGame.running = false;
        clearInterval(intervalId);
        console.table(guitarHeroGame.CurrentMatch);
      }, 100);
    }

    if (!guitarHeroGame.running) {
      clearInterval(intervalId);
      console.table(guitarHeroGame.CurrentMatch);
    }
  }, 1000);
}



function readMusic() {

  guitarHeroGame.velocitygame = 200
  timeGame.velocityGame = 200
  
  const intervalId = setInterval(() => {
    const currentTime = timeGame.getstartTime();
    const actualNote = music.find((note) => note.sec === currentTime);
    console.log(actualNote);
    if (actualNote) {
      guitarHeroGame.readNote(actualNote);
      guitarHeroGame.VelocityGenerateNote = velocitygame;
    }
  }, velocitygame);

  guitarHeroGame.readMusicmaking()
}



InitialGame()