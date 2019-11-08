// GAME CLASS
const lostImage = new Image();
lostImage.src = "./../images/losegame.png";
const wonImage = new Image();
wonImage.src = "./../images/wingame.png";
const instructionsImage = new Image();
instructionsImage.src = "./../images/instructions.png";

//bgSound.addEventListener( "load", () => {  });

class Game {
  constructor($canvas) {
    this.context = $canvas.getContext("2d");
    this.player = new Player(this);
    this.level = new Level(this, this.player);
    this.controls = new Controls(this);

    this.state = false;
    this.gameLevel = 1;

    this.instructions = true;

    this.sound = new Audio();
    this.sound.src = "./../sounds/backgroundsound.mp3";
    this.winSound = new Audio();
    this.winSound.src = "../sounds/rejoice.ogg";

    this.didIJustWinThis = false;
    this.didILost = false;

    this.tempTimeStamp = 0;
    this.tempTimeStamp2 = 0;

    this.animationPlayer = 4000;
    this.bugSpeed = 1500;

    const CANVAS_HEIGHT = this.context.height;
    const CANVAS_WIDTH = this.context.width;
  }

  drawEverything() {
    const context = this.context;
    if (this.instructions) {
      this.context.drawImage(instructionsImage, 0, 0, 640, 640);
    } else {
      if (this.player.health <= 0) {
        // IF PLAYER LOOSES THE GAME
        this.context.drawImage(lostImage, 0, 0, 640, 640);
        this.sound.pause();
        if (this.player.deadSoundFlag) {
          this.player.deadSound.play();
          this.player.deadSoundFlag = false;
        }
      } else if (this.player.githubs.length === 5) {
        this.context.drawImage(wonImage, 0, 0, 640, 640);
        this.sound.pause();
        this.winSound.play();
      } else {
        this.winSound.pause();
        this.level.drawLevel();
      }
    }
  }

  updateEverything(timestamp) {
    this.level.updateLevel();
    this.player.updatePlayer();

    if (this.tempTimeStamp < timestamp - this.animationPlayer) {
      this.player.indexBubble = Math.floor(
        Math.random() * this.player.bubblesArray.length
      );
      this.player.showBubble = !this.player.showBubble;
      this.tempTimeStamp = timestamp;
    }

    if (this.tempTimeStamp2 < timestamp - this.bugSpeed) {
      for (let bug of this.level.bugsArray) {
        if (bug.health > 0) {
          bug.invertBug();
        }
      }
      this.tempTimeStamp2 = timestamp;
    }
  }

  animation(timestamp) {
    this.drawEverything();
    this.updateEverything(timestamp);
    window.requestAnimationFrame(timestamp => this.animation(timestamp));
  }

  startGame() {
    this.state = true;
    this.controls.setControls();
    this.sound.play();
    this.animation();
  }

  startLevel() {}

  loseGame() {}

  restartGame() {}
}
