class Attack {
    constructor(player){
        this.player = player;
        this.damage = 10;
        this.position = {
            x: this.player.position.x+16,
            y: this.player.position.y+30
        };
        this.direction = this.player.direction;
        this.attackSound = new Audio();
        this.attackSound.src = "../sounds/attack.wav";
    }

    drawAttack(){
        let context = this.player.game.context;
        context.save();
        context.beginPath();
        context.fillStyle="#ABD7FF";
        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
        context.arc(this.position.x, this.position.y, 7, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
        context.restore();
    }

    updateAttack(){
        if (this.direction === 'left') {
            if(this.collideAttack()){

            } else {
                this.position.x  -= 5;
            }
        } else {
            if(this.collideAttack()){
                
            } else {
                this.position.x  += 5;
            }
        }
    }

    collideAttack(){
        for(let bug of this.player.game.level.bugsArray){
            if(this.position.x > bug.position.x && this.position.x < bug.position.x + 32 && this.position.y > bug.position.y && this.position.y < bug.position.y + 50){
                bug.health -= 5;
                this.player.attacks.splice(this);
                if (bug.health <= 0) {
                    bug.deadSound.play();
                    this.player.game.level.bugsArray.splice(bug);
                } else {
                    bug.hurtSound.play();
                }
                return true;
            } 
        }
    }
}