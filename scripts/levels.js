const tileImage = new Image();
tileImage.src = `./../images/tiles.png`;

const bgImage = new Image();
bgImage.src = `./../images/level1bg.png`;

class Level {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.bugsArray = [];
    this.bugsArray.push(new Bug(this, 2, 6), new Bug(this, 4, 6),  new Bug(this, 4, 1), new Bug(this, 5, 1));
    
    this.gravity = 0.3;
    this.friction = 0.8;
    this.devMode = false;
    this.context = game.context;
    this.runAnimationSprite = 0;
    this.runAnimationCounter = 0;
    this.map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 2, 1, 1, 1, 1, 16, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
        [2, 16, 0, 0, 0, 0, 0, 0, 0, 12],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
        [0, 2, 1, 1, 1, 1, 16, 0, 0, 12],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
        [5, 14, 14, 14, 14, 14, 14, 14, 14, 9]
        ];
    this.objectsMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
        [0, 21, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 19, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 18, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
  }


  drawMaps(mapArray){
    for (let row = 0; row < mapArray.length; row++) {
        for (let col = 0; col < mapArray[row].length; col++) {
          let valueWithin = mapArray[row][col];
          if (valueWithin) {
            this.context.drawImage(
              tileImage,
              (valueWithin % 10) * 64,
              Math.floor(valueWithin / 10) * 64,
              64,
              64,
              col * 64,
              row * 64,
              64,
              64
            );
          }
          if(this.devMode){
          this.context.save();
          this.context.fillStyle = "white";
          this.context.font = "10px monospace"
          this.context.fillText(
              `[${row}, ${col}]`,
            col * 64,
            row * 64 + 10,
            30,
            10
          );
          this.context.strokeStyle = "white";
          this.context.strokeRect(          col * 64,
            row * 64,
            64,
            64
          );
          this.context.restore();
          }
        }
      }
  }

  drawGithubs(){
    for (let index = 0; index < this.player.githubs.length; index++) {
    let valueWithin = this.player.githubs[index];    
    this.context.drawImage(
        tileImage,
        (valueWithin % 10) * 64,
        Math.floor(valueWithin / 10) * 64,
        64,
        64,
        -10,
        -10,
        64,
        64
      );
    }
  }

  drawLevel() {
    this.context.save();
    this.context.drawImage(bgImage, 0, 0, 640, 640);
    this.context.restore();

    this.drawMaps(this.map);
    this.drawMaps(this.objectsMap);

    this.player.drawHealth();
    this.drawGithubs();
    if(this.player.velocity.x != 0){
        this.player.drawPlayer(this.runAnimationSprite, 2);        
        if(this.runAnimationCounter % 10 === 0){
            if (this.runAnimationSprite === 8) {
                this.runAnimationSprite = 0;
            } else {
                this.runAnimationSprite++;
            } 
        }
        this.runAnimationCounter++;
               
    } else{ 
        this.player.drawPlayer();
    }

    for (let bug of this.bugsArray) {    
        if (bug.health > 0){
            bug.drawBug();
        }
    }

    for (const attack of this.player.attacks) {
        attack.drawAttack();
    }
  }


  updateLevel() {
    for (let bugsy of this.bugsArray) {
        bugsy.updateBug();
    }
  }

  restartLevel(){
      this.gravity = 0.3;

      this.player.position = {
        x: 0,
        y: 350
      };
      this.player.gridPosition = {
        row: 0,
        col: 0
      };
      this.player.velocity = {
        x: 0,
        y: 0
      };
      this.player.health = 100;
      this.player.direction = "right";
      this.player.githubs = [22];
  
      this.player.onAir = true;

      this.bugsArray = [];
      this.bugsArray.push(new Bug(this, 2, 6), new Bug(this, 4, 6),  new Bug(this, 4, 1), new Bug(this, 5, 1));

      this.objectsMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
        [0, 21, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 19, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 18, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      this.game.sound.play();
      this.player.deadSoundFlag = true;
  }
}
