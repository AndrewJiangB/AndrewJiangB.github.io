import Player from './snake_components/player.js';
import SnakeGame from './snake_components/snake_game.js';

var globalIntervalContainer = null;

document.getElementById("snek").onclick = function() {

  function onSnakeTimerTick(game, game_over) {
    if (game_over){
      alert("GAME OVER");
      game_over = false;
      document.getElementById('game_field').innerHTML = "";
      game = new SnakeGame();
      game.setup();
      document.getElementById("output").textContent = "Score: 0"
    }
    else {
      game_over = game.player.move();
      game.draw();
    }
  }
  
  document.getElementById('game_field').innerHTML = "";
  clearInterval(globalIntervalContainer);

  var game = new SnakeGame();
  var game_over = false;
  game.setup();
  globalIntervalContainer = setInterval(() => onSnakeTimerTick(game, game_over), 120); // 200 milliseconds = 5 frames per sec
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
}

document.getElementById("lyfe").onclick = function() {
  document.getElementById('game_field').innerHTML = "";
  clearInterval(globalIntervalContainer);
}