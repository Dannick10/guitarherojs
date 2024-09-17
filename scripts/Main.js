import { Time } from "./TimeGame.js";
import { Game } from "./Game.js";
import { IconReturn, IconSettings, Iconabout, Iconplay } from "./Icons.js";

const screen = document.querySelector(".screen");
const guitarHeroGame = new Game();

function InitialGame(time) {
  const timeGame = new Time(0, time);

  screen.innerHTML = `
    <div>
      <canvas width="300" height="500" id="game"></canvas>
      <div class="pointsScore">
        <p>0</p>
      </div>
      <canvas width="30" height="100" id="dotPoint"></canvas>
      <canvas width="30" height="100" id="progressMatch"></canvas>
    </div>
  `;

  document.querySelector(".visible").classList.remove("visible");

  timeGame.startMatchTime();
  guitarHeroGame.startGame();
  guitarHeroGame.running = true;

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

function mainScreen() {
  screen.innerHTML = `
    <section class="main_game">
    <div class="title_section">
    <h2 class="title">Random Hero</h2>
    </div>
    <div class="main_game_section" >
        <button class="btn start">${Iconplay}</button>
        <button class="btn btn_options">${IconSettings}</button>
        <button class="btn btn_about">${Iconabout}</button>
      </div>
    </section>
  `;

  document.querySelector(".btn_options").addEventListener("click", settings);
  document.querySelector(".btn_about").addEventListener("click", about);

  document.querySelector(".start").addEventListener("click", changeDificulty);
}

function settings() {
  screen.innerHTML = `
  <section class="main_game">
    <div class="main_game_section  config_game_wallpaper" >
      <button class="btn start">mudar notas</button>
      <button class="btn btn_options goback">${IconReturn}</button>
    </div>
  </section>
`;

  document.querySelector(".start").addEventListener("click", changeNote);

  document.querySelector(".goback").addEventListener("click", mainScreen);
}

function changeNote() {
  screen.innerHTML = `
  <section class="main_game">
    <div class="main_game_section config_note_wallpaper">
      <div class="textinfo">
        <p>Aperte em qualquer tecla</p>
      </div>

      <div><button class="btn start circle" style=" background-color: green;" id="1">
      ${guitarHeroGame.controls.note1}
      </button>
      </div>
      <div><button class="btn btn_options circle"  style="background-color: red;" id="2">
      ${guitarHeroGame.controls.note2}
      </button>
      </div>
      <div><button class="btn btn_options circle " style="background-color: orange;" id="3">
      ${guitarHeroGame.controls.note3}
      </button>
      </div>
      <div><button class="btn btn_options circle " style="background-color: blue;" id="4">
      ${guitarHeroGame.controls.note4}
      </button>
      </div>
      <div><button class="btn btn_options circle " style="background-color: orange;" id="5">
      ${guitarHeroGame.controls.note5}
      </button>
      </div>
      
      <div>v
        <button class="btn goback">${IconReturn}</button>
      </div>
    </div>
  </section>
`;
  const TextDiv = document.querySelector(".textinfo");
  const button = [...document.querySelectorAll(".btn")];

  document.addEventListener("keydown", change);

  function change(keypress) {
    button.forEach((button) => {
      if (button.classList.contains("active")) {
        const noteKey = `note${button.id}`;
        guitarHeroGame.controls[noteKey] = keypress.key;
        TextDiv.innerHTML = keypress.key;
        button.innerHTML = keypress.key;
      }
    });
    console.log(guitarHeroGame.controls);
  }

  const textinfo = (btn) => {
    if (btn.classList.contains("active")) {
      TextDiv.innerHTML = btn.innerText;
    }
  };

  button.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const { target } = event;
      button.forEach((button) => button.classList.remove("active"));
      target.classList.add("class", "active");
      button.forEach((button) => textinfo(button));
    });
  });

  document.querySelector(".goback").addEventListener("click", settings);
}

function changeDificulty() {
  screen.innerHTML = `
  <section class="main_game">
    <div class="main_game_section  config_dificulty_wallpaper" >
      <button id="3" class="btn dificulty" style="background: #109030;">Facil</button id="3">
      <button id="4" class="btn dificulty"  style="background: #205080;">Medio</button>
      <button id="5" class="btn dificulty"  style="background: #902;">Dificil</button>
      <div>
      <button class="btn goback">${IconReturn}</button>
    </div>
    </div>
  </section>
`;

  const btn = [...document.querySelectorAll(".dificulty")];

  btn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const { target } = event;
      guitarHeroGame.dificulty = target.id;
      changeTime();
    });
  });

  document.querySelector(".goback").addEventListener("click", mainScreen);
}

function changeTime() {
  let time = 1;

  screen.innerHTML = `
  <section class="main_game">
  <div class="main_game_section  config_dificulty_wallpaper" >
  <div style="background: black; padding: 4px; rotate: -2deg">
  <div class="title_section">
  <h2 class="title">${time} minuto</h2>
  </div>
  </div>
  <button id="3" class="btn dificulty odd" style="background: #005050;">+</button id="3">
  <button id="3" class="btn dificulty decrease" style="background: #800000;">-</button id="3"> 
  <div style="display: flex; flex-direction: column-reverse; gap: 30px">
  <button class="btn goback">${IconReturn}</button>
  <button class="btn play">${Iconplay}</button>
  </div>
  </div>
  </section>
  `;

  const text = document.querySelector(".title");
  const odd = document.querySelector(".odd");
  const decrease = document.querySelector(".decrease");
  let ranger = 1;
  let maxNumber = 15;

  odd.addEventListener("click", () => {
    if (ranger <= time) {
      ranger++;
      time = Math.min(Math.max(1, ranger), maxNumber);
      text.innerHTML = `${time} minuto`;
    }
  });

  decrease.addEventListener("click", () => {
    if (ranger >= time) {
      ranger--;
      time = Math.min(Math.max(1, ranger), maxNumber);
      text.innerHTML = `${time} minuto`;
    }
  });

  const ConvertMinute = (time) => {
    return time * 60
  }

  document.querySelector(".goback").addEventListener("click", changeDificulty);
  document
    .querySelector(".play")
    .addEventListener("click", () => InitialGame(ConvertMinute(time)));
}

function about() {
  screen.innerHTML = `
  <section class="main_game">
    <div class="main_game_section config_about_wallpaper">
      <div class="textinfo" style="text-align: center;">
        <h2>Sobre o randomHero</h2>
        <div class="box">
          <p>O RandomHero é um jogo inspirado no clássico estilo Guitar Hero, onde os jogadores precisam acertar as notas que descem pela tela no tempo certo para marcar pontos. Desenvolvi este projeto com foco em proporcionar uma experiência divertida e desafiadora, com controles personalizados e mecânicas de jogo dinâmicas. Espero que você se divirta jogando tanto quanto eu me diverti desenvolvendo!</p>
          <p>
          Meu nome é Daniel Rocha, sou desenvolvedor frontend com experiência em tecnologias como HTML, CSS, JavaScript, React, TailwindCSS, TypeScript e Next.js. Sempre busco criar interfaces interativas e eficientes que ofereçam uma boa experiência para os usuários. O RandomHero é uma das minhas criações, combinando meu amor por desenvolvimento e jogos.
          </p>
        </div>
        <p>Jogo criado por DanielRocha</p>
      </div>
     
      <div>
        <button class="btn goback">${IconReturn}</button>
      </div>
    </div>
  </section>
`;

  document.querySelector(".goback").addEventListener("click", mainScreen);
}

mainScreen();
changeTime();
