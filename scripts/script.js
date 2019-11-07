window.onload = function () {
    const $canvas = document.querySelector('canvas');
    const game = new Game($canvas);
    const preGameImage = new Image();
    preGameImage.src = "./../images/pre-game.png";
    preGameImage.addEventListener( "load", () => {
      game.context.drawImage(preGameImage, 0, 0, 640,640);
    });
    document.addEventListener("keydown", function(event) {
      if(event.which === 13){
        game.startGame();
      }
    }, {once: true});
};