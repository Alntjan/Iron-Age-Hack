// OBSTACLE CLASS

class Platform {
    constructor(level, positionX, positionY, size){
      this.level = level;
      this.posX = positionX;
      this.posY = positionY;
      this.size = size;
      this.context = level.game.context;
    }
  
    drawPlatform(){
      this.context.save();
      this.context.fillStyle = 'brown';
      this.context.fillRect(this.posX, this.posY, this.size , 30);
      this.context.restore();
    }
  
    updateObstacle(){
        this.positionY += this.game.steps;
    }
  
    createObstacle(){
      this.game.obstacles.push(this);
      //this.drawObstacle();
      //this.randomizeObstacle();
      // this.moveObstacle();
    }
  
  }