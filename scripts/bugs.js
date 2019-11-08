const bugImage = new Image();
bugImage.src = "./../images/player.png";

class Bug {
  constructor(level, col, row) {
    this.level = level;
    this.game = level.game;
    this.position = {
      x: col * 64,
      y: row * 64 + 14
    };
    this.gridPosition = {
      row: 0,
      col: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.health = 20;
    this.direction = "right";
    this.devMode = false;

    this.hurtSound = new Audio();
    this.hurtSound.src = "../sounds/insect.flac";
    this.deadSound = new Audio();
    this.deadSound.src = "../sounds/deadbug.wav";
  }
  drawBug() {
    const SIZE_X = 32;
    const SIZE_Y = 50;
    const col = 0;
    const row = 1;
    this.game.context.drawImage(
      bugImage,
      SIZE_X * col,
      SIZE_Y * row,
      SIZE_X,
      SIZE_Y,
      this.position.x,
      this.position.y,
      SIZE_X,
      SIZE_Y
    );

    this.game.context.save();
    this.game.context.fillStyle = "green";
    this.game.context.fillRect(
      this.position.x - 5,
      this.position.y + 10,
      this.health,
      4
    );
    this.game.context.restore();

    if (this.devMode) {
      this.game.context.save();
      this.game.context.strokeStyle = "white";
      this.game.context.strokeRect(
        this.position.x,
        this.position.y,
        SIZE_X,
        SIZE_Y
      );
      this.game.context.fillStyle = "white";
      this.game.context.font = "10px monospace";
      this.game.context.fillText(
        `[${Math.floor(this.position.y / 64)},${Math.floor(
          this.position.x / 64
        )}]`,
        this.position.x + 2,
        this.position.y + 10,
        30,
        10
      );
      this.game.context.restore();
    }
  }

  updateBug() {
    if (Math.sign(this.velocity.x) === 1) {
      this.velocity.x += 0.02;
    } else {
      this.velocity.x -= 0.02;
    }
    this.position.x += this.velocity.x;
  }

  invertBug() {
    if (Math.sign(this.velocity.x) === 1) {
      this.velocity.x = -0.02;
    } else {
      this.velocity.x = 0.02;
    }
  }
}
