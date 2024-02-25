import Game from "./game";

const holeGame = document.querySelector(".hole-game");

// создание структуры игрового поля
for (let i = 2; i <= 16; i++) {
  let div = document.createElement("div");
  div.className = "hole";
  div.setAttribute("data-id", i);
  holeGame.append(div);
}

const dead = document.querySelector(".dead");
const lost = document.querySelector(".lost");
const holeWithGoblin = document.querySelector(".hole_has-goblin");

const game = new Game(holeGame, holeWithGoblin, dead, lost);

holeGame.addEventListener("click", game.onClick);

game.start();
