import Player from './snake_components/player.js';
import Game from './snake_components/snake_game.js';

function onTimerTick() {
  if (game_over){
    alert("GAME OVER");
    game_over = false;
    document.getElementById('game_field').innerHTML = "";
    game = new Game();
    game.setup();
    document.getElementById("output").textContent = "Score: 0"
  }
  else {
    game_over = game.player.move();
    game.draw();
  }
}

var game = new Game();
game = new Game();
game.setup();
setInterval(onTimerTick, 120); // 200 milliseconds = 5 frames per sec
var game_over = false;

window.addEventListener("keydown", function(event) {
  switch (event.code){
    case 'ArrowLeft':
      game.player.left();
      break;
    case 'ArrowRight':
      game.player.right();
      break;
    case 'ArrowUp':
      game.player.up();
      break;
    case 'ArrowDown':
      game.player.down();
      break;
    default:
      break;
  }
}, true);