import { Time } from "./TimeGame.js"
import { Game } from "./Game.js"


const guitarHeroGame = new Game();
guitarHeroGame.dificulty = 3;
guitarHeroGame.VelocityGenerateNote = 200;
guitarHeroGame.controls.note1 = "a";
guitarHeroGame.controls.note2 = "s";
guitarHeroGame.controls.note3 = "1";
guitarHeroGame.controls.note4 = "2";
guitarHeroGame.controls.note5 = "3";
guitarHeroGame.startGame();

const timeGame = new Time(0,100);
timeGame.startMatchTime()
