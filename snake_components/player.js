class Tail {
  constructor(x, y, head, seg) {
    this.x = x;
    this.y = y;
    this.last_x = x;
    this.last_y = y;
    this.head = head;
    this.tail = null;
    this.segment = seg;
  }

  move() {
    this.last_x = this.x;
    this.last_y = this.y;
    this.x = this.head.last_x;
    this.y = this.head.last_y;
    if (this.tail !== null) {
      this.tail.move();
    }
  }

  add_tail(tail) {
    if (this.tail === null) {
      this.tail = tail;
      return this.tail;
    } else {
      return this.tail.add_tail(tail);
    }
  }
}

class Player extends Tail {
  constructor(snakeX, snakeY, game) {
    super(snakeX, snakeY, null, 1);
    this.length = 0;
    this.tail = null;
    this.tail_last = null;
    this.game = game;
    this.direction_code = "right";
    this.directions = [1, 0];
  }

  move() {
    this.last_x = this.x;
    this.last_y = this.y;
    this.x = this.x + this.directions[0];
    this.y = this.y + this.directions[1];
    if (this.x > this.game.length - 1) {
      this.x = 0;
    }
    if (this.y > this.game.width - 1) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = this.game.length - 1;
    }
    if (this.y < 0) {
      this.y = this.game.width - 1;
    }
    if (this.tail !== null) {
      this.tail.move();
    }
    if (this.game.is_food(this.last_x, this.last_y)) {
      this.length++;
      document.getElementById("score").textContent = "Score: " + this.length;
      var newtail_x = this.tail == null ? this.last_x : this.tail_last.last_x;
      var newtail_y = this.tail == null ? this.last_y : this.tail_last.last_y;
      var new_tail = new Tail(
        newtail_x,
        newtail_y,
        this.tail_last == null ? this : this.tail_last,
        this.length
      );
      this.tail_last = this.add_tail(new_tail);
    }
    //draw
    //this.game.box_list[this.x].children[this.y].className = 'snake';
    return this.game.is_snake(this.x, this.y);
  }

  checkValid(direction) {
    if (this.tail == null) {
      return true;
    }
    let new_x = this.x + direction[0];
    let new_y = this.y + direction[1];
    if (new_x == this.tail.x && new_y == this.tail.y) {
      return false;
    }
    return true;
  }

  left() {
    if (this.checkValid([-1, 0])) {
      this.directions = [-1, 0];
      this.direction_code = "left";
    }
  }

  right() {
    if (this.checkValid([1, 0])) {
      this.directions = [1, 0];
      this.direction_code = "right";
    }
  }

  up() {
    if (this.checkValid([0, -1])) {
      this.directions = [0, -1];
      this.direction_code = "up";
    }
  }

  down() {
    if (this.checkValid([0, 1])) {
      this.directions = [0, 1];
      this.direction_code = "down";
    }
  }
}

export default Player;
