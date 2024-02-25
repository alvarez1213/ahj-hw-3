export default class Game {
  constructor(holeGame, holeWithGoblin, dead, lost) {
    this.holeGame = holeGame;
    this.holeWithGoblin = holeWithGoblin;

    this.dead = dead;
    this.lost = lost;
    this.pointHit = 0;
    this.pointMiss = 0;

    this.onClick = this.onClick.bind(this);

    this.clicked = false;
    this.intervalID = 0;
  }

  getRndNum(previous) {
    const rnd = Math.floor(Math.random() * 16) + 1;
    if (previous == rnd) {
      return this.getRndNum(previous);
    } else {
      return rnd;
    }
  }

  changeHole() {
    const rnd = this.getRndNum(this.holeWithGoblin.dataset.id);
    this.holeWithGoblin.classList.remove("hole_has-goblin");
    this.holeWithGoblin.classList.remove("hole_has-goblin-beated");
    this.holeWithGoblin = this.holeGame.querySelector(`[data-id="${rnd}"]`);
    this.holeWithGoblin.classList.add("hole_has-goblin");
  }

  checkHole(hole) {
    if (hole.classList.contains("hole_has-goblin")) {
      this.addPointHit();
      this.holeWithGoblin.classList.toggle("hole_has-goblin-beated");
    } else {
      this.addPointMiss();
    }
  }

  addPointMiss() {
    this.pointMiss += 1;
    this.lost.textContent = this.pointMiss;
    this.checkGameStatus();
  }

  addPointHit() {
    this.pointHit += 1;
    this.dead.textContent = this.pointHit;
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (this.pointHit === 10) {
      this.resetGame("Победа!");
      return;
    }
    if (this.pointMiss === 5) {
      this.resetGame("Вы проиграли!");
    }
  }

  resetGame(message) {
    clearInterval(this.intervalID);
    setTimeout(() => alert(message), 1);
    setTimeout(() => {
      this.pointHit = 0;
      this.pointMiss = 0;
      this.dead.textContent = 0;
      this.lost.textContent = 0;
      this.start();
    }, 1000);
  }

  start() {
    this.intervalID = setInterval(() => {
      this.changeHole(this.holeGame);

      if (!this.clicked) {
        this.addPointMiss();
      } else {
        this.clicked = false;
      }
    }, 1000);
  }

  onClick(e) {
    // console.log(e.target);
    this.checkHole(e.target);
    this.clicked = true;
  }
}
