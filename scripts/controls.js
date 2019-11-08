class Controls {
  constructor(game) {
    this.game = game;
    this.player = game.player;
    this.level = game.level;
    this.jump = [];
  }

  setControls() {
    let firedJump = false;
    window.addEventListener("keydown", event => {
      
      switch (event.keyCode) {
        case 37:
          event.preventDefault();
          if (this.player.velocity.x > -1) {
            this.player.velocity.x += -2;
          }
          //this.player.velocity.x = -5;
          break;
        case 38:
          event.preventDefault();
          if(!event.repeat){
            this.player.velocity.y += -10;
          }
          break;
        case 39:
          event.preventDefault();
          if (this.player.velocity.x < 2) {
            this.player.velocity.x += 2;
          }          
          break;
        case 40:
          event.preventDefault();
          this.player.velocity.y += 5;
          break;
        case 13:
          event.preventDefault();
          this.game.level.restartLevel();
          break;
        case 32:
          event.preventDefault();
          let newAttack = new Attack(this.game.player);
          newAttack.attackSound.play();
          this.game.player.attacks.push(newAttack);
          break;
      }
    });
    window.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          event.preventDefault();
          this.player.velocity.x = 0;
          break;
        case 38:
          event.preventDefault();
          this.player.velocity.y = 0;
          break;
        case 39:
          event.preventDefault();
          this.player.velocity.x = 0;
          break;
        case 40:
          event.preventDefault();
          break;
      }
    });
  }
}
