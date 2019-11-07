const playerImage = new Image();
playerImage.src = "./../images/player.png";

class Player {
  constructor(game) {
    this.game = game;
    this.position = {
      x: 0,
      y: 350
    };
    this.gridPosition = {
      row: 0,
      col: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };

    this.githubSound = new Audio();
    this.githubSound.src = "../sounds/githubcatch.wav";
    this.hurtSound = new Audio();
    this.hurtSound.src = "../sounds/hurt.mp3";
    this.deadSound = new Audio();
    this.deadSound.src = "../sounds/sodead.mp3";
    this.deadSoundFlag = true;

    this.health = 100;
    this.direction = "right";
    this.githubs = [22];

    this.onAir = true;
    this.wasOnPlatform = false;

    this.devMode = true;
  }

  drawPlayer(imgCol, imgRow) {
    const SIZE_X = 32;
    const SIZE_Y = 50;
    let col = 0;
    let row = 0;
    if (imgCol){col = imgCol;}
    if (imgRow){row = imgRow;}
    this.game.context.drawImage(
      playerImage,
      SIZE_X * col,
      SIZE_Y * row,
      SIZE_X,
      SIZE_Y,
      this.position.x,
      this.position.y,
      SIZE_X,
      SIZE_Y
    );
    if (this.devMode) {
        this.game.context.save();
        this.game.context.strokeStyle = "white";
        this.game.context.strokeRect(
          this.position.x,
          this.position.y,
          SIZE_X * 0.99,
          SIZE_Y * 0.99
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

  drawHealth() {
    this.game.context.save();
    this.game.context.fillStyle = "grey";
    this.game.context.fillRect(42, 18, 100, 10);
    if (this.health > 0) {
        this.game.context.fillStyle = "green";
        this.game.context.fillRect(42, 18, this.health, 10);
    } else {
        this.game.context.fillStyle = "red";
        this.game.context.fillRect(42, 18, 100, 10);
    }
    this.game.context.restore();
  }

  getPlayerGridPosition(x, y) {
    return {
      borderTop: Math.floor(y / 64),
      borderBottom: Math.floor((y + 50) / 64),
      borderLeft: Math.floor(x / 64),
      borderRight: Math.floor((x + 32) / 64)
    };
  }

  collidePlayer(map, type) {
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }

    let currentPosition = this.getPlayerGridPosition(
      this.position.x,
      this.position.y
    );

    // console.log(currentPosition);

    if (this.velocity.y > 0) {
      // player is going down
      if (
        map[currentPosition.borderBottom][currentPosition.borderLeft] > 0 ||
        map[currentPosition.borderBottom][currentPosition.borderRight] > 0
      ) {
        // SEE THE TYPE OF OBJECT ENCOUNTERED DEPENDING ON THE MAP TYPE
        switch (type) {
          case "platforms":
            this.onAir = false;
            this.position.y = currentPosition.borderTop * 64 + 14;
            this.velocity.y = 0;
            this.game.level.gravity = 0;
            break;
          case "objects":
            this.velocity.y += this.game.level.gravity;
            this.position.y += this.velocity.y;
            this.onAir = true;
            this.githubSound.play();

            if(map[currentPosition.borderBottom][currentPosition.borderRight] > 0){
                this.githubs.push(map[currentPosition.borderBottom][currentPosition.borderRight]);
                map[currentPosition.borderBottom][currentPosition.borderRight] = 0;
            }
            if(map[currentPosition.borderBottom][currentPosition.borderLeft] > 0){
                this.githubs.push(map[currentPosition.borderBottom][currentPosition.borderLeft]);
                map[currentPosition.borderBottom][currentPosition.borderLeft] = 0;
            }
            break;
        }
      } else {
        this.velocity.y += this.game.level.gravity;
        this.position.y += this.velocity.y;
        this.onAir = true;
      }
    } else if (this.velocity.y < 0) {
      // player is going up
      if (
        map[currentPosition.borderTop][currentPosition.borderLeft] > 0 ||
        map[currentPosition.borderTop][currentPosition.borderRight] > 0
      ) {
        switch (type) {
          case "platforms":
            this.game.level.gravity = 0.3;
            this.velocity.y *= -1;
            this.velocity.y += this.game.level.gravity;
            this.position.y += this.velocity.y;
            this.onAir = true;
            break;

          case "objects":
            this.game.level.gravity = 0.3;
            this.velocity.y += this.game.level.gravity;
            this.position.y += this.velocity.y;
            this.onAir = true;
            this.githubSound.play();
            if(map[currentPosition.borderTop][currentPosition.borderRight] > 0){
                this.githubs.push(map[currentPosition.borderTop][currentPosition.borderRight]);
                map[currentPosition.borderTop][currentPosition.borderRight] = 0;
            }
            if(map[currentPosition.borderTop][currentPosition.borderLeft] > 0){
                this.githubs.push(map[currentPosition.borderTop][currentPosition.borderLeft]);
                map[currentPosition.borderTop][currentPosition.borderLeft] = 0;
            }
            break;
        }
      } else {
        this.game.level.gravity = 0.3;
        this.velocity.y += this.game.level.gravity;
        this.position.y += this.velocity.y;
        this.onAir = true;
      }
    } else if (this.velocity.y === 0) {
      this.game.level.gravity = 0.3;
      this.velocity.y += this.game.level.gravity;
      this.position.y += this.velocity.y;
      this.onAir = true;
    }

    if (this.velocity.x > 0) {
      if (map[currentPosition.borderTop][currentPosition.borderRight] > 0) {
        switch (type) {
            case "platforms":
                this.position.x = currentPosition.borderLeft * 64 + 31;
                this.velocity.x = 0;
                break;
  
            case "objects":
                this.position.x += this.velocity.x;
                this.githubSound.play();
              if(map[currentPosition.borderTop][currentPosition.borderRight] > 0){
                  this.githubs.push(map[currentPosition.borderTop][currentPosition.borderRight]);
                  map[currentPosition.borderTop][currentPosition.borderRight] = 0;
              }
              break;
          }
      } else {
        this.position.x += this.velocity.x;
      }
    } else if (this.velocity.x < 0) {
      if (map[currentPosition.borderTop][currentPosition.borderLeft] > 0) {
        
        switch (type) {
            case "platforms":
                this.position.x = currentPosition.borderRight * 64;
                this.velocity.x = 0;
                break;
  
            case "objects":
                this.position.x += this.velocity.x;
                this.githubSound.play();
              if(map[currentPosition.borderTop][currentPosition.borderLeft] > 0){
                  this.githubs.push(map[currentPosition.borderTop][currentPosition.borderLeft]);
                  map[currentPosition.borderTop][currentPosition.borderLeft] = 0;
              }
              break;
          }
      } else {
        this.position.x += this.velocity.x;
      }
    } else {
      this.position.x += this.velocity.x;
    }
  }

  playerVersusBug(){
      let playerPosition = this.getPlayerGridPosition(this.position.x,this.position.y);
      for (let bug of this.game.level.bugsArray){
        let bugPosition = this.getPlayerGridPosition(bug.position.x,bug.position.y);
        //console.log(bugPosition);
        
        if (this.position.x + 32 > bug.position.x && this.position.x + 32 < bug.position.x + 32 && playerPosition.borderTop === bugPosition.borderTop){
            // collision on the right
            this.hurtSound.play();
            this.health -= 10;
            this.velocity.x = -3;
        } else if(this.position.x < bug.position.x + 32 && this.position.x + 32 > bug.position.x + 32 && playerPosition.borderTop === bugPosition.borderTop){
            this.hurtSound.play();
            this.health -= 10;
            this.velocity.x = +3; 
        } else if (this.position.y + 50 < bug.position.y && this.position.y > bug.position.y && playerPosition.borderBottom === bugPosition.borderTop){
            this.hurtSound.play();
            this.health -= 10;
            this.velocity.y = -3;
            this.velocity.x = -3;
        }
      }
  }

  updatePlayer() {
    this.collidePlayer(this.game.level.map, "platforms");
    this.collidePlayer(this.game.level.objectsMap, "objects");
    this.playerVersusBug();
  }


}
