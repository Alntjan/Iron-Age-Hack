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
            if(!this.collideAttack()){
                this.position.x  -= 5;
            }
        } else {
            if(!this.collideAttack()){
                this.position.x  += 5;
            }
        }
        if(this.position.x > 640 || this.position.x < 0){
            this.player.attacks.splice(0,1);
        }
    }

    collideAttack(){
        let arrayOfBugs = this.player.game.level.bugsArray;
        for(let bug = 0; bug < arrayOfBugs.length; bug++){
            if(this.position.x > arrayOfBugs[bug].position.x && this.position.x < arrayOfBugs[bug].position.x + 32 && this.position.y > arrayOfBugs[bug].position.y && this.position.y < arrayOfBugs[bug].position.y + 50){
                arrayOfBugs[bug].health -= 5;
                this.player.attacks.splice(0,1);
                if (arrayOfBugs[bug].health <= 0) {
                    arrayOfBugs[bug].deadSound.play();
                    this.player.game.level.bugsArray.splice(bug,1);
                } else {
                    arrayOfBugs[bug].hurtSound.play();
                }
                return true;
            } 
        }
    }
}