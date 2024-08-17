import Player from './snake_components/player.js';
import SnakeGame from './snake_components/snake_game.js';

var globalIntervalContainer = null;

document.getElementById("snek").onclick = function() {

  var game;
  document.getElementById("snek").style.backgroundColor = "#7fb3ee";
  document.getElementById("lyfe").style.backgroundColor = "lightblue";

  function onSnakeTimerTick(game) {
    if (game.game_over){

      document.getElementById("info").textContent = "GAME OVER"
      if (!document.getElementById("new_game_button")){
        var new_game_button = document.createElement('h1');
        new_game_button.innerText = "NEW GAME";
        new_game_button.id = "new_game_button";
        new_game_button.onclick = function() {
          teardown_game_state();
          setup_game_state();
        }
        document.getElementById("info_banner").appendChild(new_game_button);
      }

    }
    else {
      game.set_game_over(game.player.move());
      game.draw();
    }
  }
  
  function setup_game_state() {
    var new_game_field = document.createElement('div');
    new_game_field.id = "game_field";
    document.getElementById("game_container").appendChild(new_game_field);

    var new_score_field = document.createElement('p');
    new_score_field.innerText = "Score: 0";
    new_score_field.id = "score";
    document.getElementById("info_banner").appendChild(new_score_field);

    var info_field = document.createElement('p');
    info_field.id = "info";
    document.getElementById("info_banner").appendChild(info_field);
  
    game = new SnakeGame();
    game.setup();
    globalIntervalContainer = setInterval(() => onSnakeTimerTick(game), 120); // 200 milliseconds = 5 frames per sec
  }

  function teardown_game_state() {
    clearInterval(globalIntervalContainer);
    document.getElementById("score") && document.getElementById("score").remove();
    document.getElementById("new_game_button") && document.getElementById("new_game_button").remove();
    document.getElementById("game_field") && document.getElementById("game_field").remove();
    document.getElementById("info") && document.getElementById("info").remove();
  }

  teardown_game_state();
  setup_game_state();

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

  document.getElementById("snek").style.backgroundColor = "lightblue";
  document.getElementById("lyfe").style.backgroundColor = "#7fb3ee";

  document.getElementById('game_container').innerHTML = "";
  document.getElementById('info_banner').innerHTML = "";
  clearInterval(globalIntervalContainer);
}