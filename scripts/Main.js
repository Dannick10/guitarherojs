import { Time } from "./TimeGame.js";
import { Game } from "./Game.js";

const guitarHeroGame = new Game();
guitarHeroGame.dificulty = 5;
guitarHeroGame.VelocityGenerateNote = 200;
guitarHeroGame.controls.note1 = "a";
guitarHeroGame.controls.note2 = "s";
guitarHeroGame.controls.note3 = "1";
guitarHeroGame.controls.note4 = "2";
guitarHeroGame.controls.note5 = "3";
guitarHeroGame.startGame();

const timeGame = new Time(0, 3);
timeGame.startMatchTime();



function InitialGame() {
    const intervalId = setInterval(() => {
      guitarHeroGame.progressLine = timeGame.getLinePorcent();
  
      if (timeGame.startTIme >= timeGame.endTime) {
        setTimeout(() => {
          guitarHeroGame.running = false;
          clearInterval(intervalId);
          console.table(guitarHeroGame.CurrentMatch)
        }, 100);
      }
  
      if (!guitarHeroGame.running) {
        clearInterval(intervalId);
        console.table(guitarHeroGame.CurrentMatch)
      }
  
    }, 1000);
  }
  
  InitialGame();
  