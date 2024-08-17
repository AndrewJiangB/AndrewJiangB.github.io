import Player from './player.js';

/**
 * Returns a random integer between 0 (inclusive) and the given maximum (exclusive).
 *
 * @param {number} max - The maximum value (exclusive) for the random integer.
 * @return {number} A random integer between 0 and max.
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  export default class Game {
    constructor() {
      this.width = 10;
      this.length = 10;
      this.box_list = [];
      this.snake_made = false;
      this.food_made = false;
      this.startingX = null;
      this.startingY = null;
      this.foodX = null;
      this.foodY = null;
      this.player = null;
    }
    
    /**
     * Initializes the game by creating the game field and setting up the snake and food.
     *
     * @return {void}
     */
    setup(){
      var div_el;
      var div_row;
      var game_field = document.getElementById("game_field"); 
      
      for (var l=0; l<this.length; l++){
        //Generate Row
        div_row = document.createElement('div');
        div_row.className = 'row';
        for (var w=0; w<this.width; w++){
          //Generate column
          div_el = document.createElement('div');
          var rand_int = getRandomInt(33)
          if (rand_int==1 && this.snake_made==false){
            div_el.className = 'snake';
            this.snake_made = true;
          }
          else if (rand_int==2 && this.food_made==false){
            div_el.className = 'food';
            this.food_made = true;
          }
          else if (l == this.length - 1 && this.snake_made==false){
            div_el.className = 'snake';
            this.snake_made = true;
          }
          else if (l==this.length - 2 && this.food_made == false){
            div_el.className = 'food';
            this.food_made = true;
          }
          else{
            div_el.className = 'ground';
          }
  
          //Note down food and snake coordinates
          if (div_el.className=='food'){
            this.foodX = l;
            this.foodY = w;
          }
          else if (div_el.className=='snake'){
            this.startingX = l;
            this.startingY = w;
          }
  
          //Add to row node
          div_row.appendChild(div_el);
        }
        //Add to game_field node
        this.box_list.push(div_row);
        game_field.appendChild(div_row);
      }
      
      this.player = new Player(this.startingX, this.startingY, this)
      //this.player.add_tail(new Tail(this.player.x-1, this.player.y-1, this.player));
    }
  
    draw() {
      for (var l=0; l<this.length; l++){
        for (var w=0; w<this.width; w++){
          this.box_list[l].children[w].className = 'ground';
        }
      }
      this.box_list[this.foodX].children[this.foodY].className = 'food';
      this.box_list[this.player.x].children[this.player.y].className = 'snake';
      var player_tail = this.player.tail;
      while (player_tail !== null){
        this.box_list[player_tail.x].children[player_tail.y].className = 'snake';
        player_tail = player_tail.tail;
      }
    }
    
    make_food(){
      this.foodX = getRandomInt(this.length);
      this.foodY = getRandomInt(this.width);
      while (this.is_snake(this.foodX, this.foodY)){
        this.foodX = getRandomInt(this.length);
        this.foodY = getRandomInt(this.width);
      }
      
        //draw
        //this.box_list[this.foodX].children[this.foodY].className = 'food';
    }
  
    is_food(x, y){
      if (this.foodX == x && this.foodY == y){
        this.make_food();
        return true;
      }
      return false;
    }
  
    is_snake(x, y){
      /** This is just itself why would this work?
      if (this.player.x == x && this.player.y == y){
        return true;
      }
      **/
      var next = this.player.tail;
      while (next !== null) {
        if (next.x == x && next.y == y){
          return true;
        }
        next = next.tail;
      }
      return false;
    }
  
  }