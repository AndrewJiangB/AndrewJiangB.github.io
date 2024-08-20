function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Box {
  constructor(x, y, component, game, type = "ground") {
    this.x = x;
    this.y = y;
    this.className = type;
    this.component = component;
    this.game = game;
    this.component.className = this.className;
    this.component.onclick = () => {
      if (this.className == "ground" && this.game.max_count > 0) {
        this.className = "life";
        this.component.className = "life";
        this.game.max_count -= 1;
      } else if (this.className == "life") {
        this.className = "ground";
        this.component.className = "ground";
      }

      if (document.getElementById("info")) {
        document.getElementById("info").innerText =
          "Lyfe left: " + this.game.max_count;
      }
    };
  }

  render() {
    return this.component;
  }
}

export default class LifeGame {
  constructor() {
    this.width = 10;
    this.length = 10;
    this.box_list = [];
    this.max_count = 10;
  }

  setup() {
    var div_el;
    var div_row;
    var game_field = document.getElementById("game_field");

    let max_placed = document.createElement("p");
    max_placed.innerText = "Lyfe left: " + this.max_count;
    max_placed.id = "info";
    document.getElementById("info_banner").appendChild(max_placed);

    for (var l = 0; l < this.length; l++) {
      let box_row = [];
      //Generate Row
      div_row = document.createElement("div");
      div_row.className = "row";
      for (var w = 0; w < this.width; w++) {
        //Generate column
        div_el = document.createElement("div");
        div_el.className = "ground";

        // Generate Container Object
        let box = new Box(l, w, div_el, this);
        box_row.push(box);

        //Add to row node
        div_row.appendChild(div_el);
      }
      this.box_list.push(box_row);
      game_field.appendChild(div_row);
    }
  }

  start() {
    if (document.getElementById("info")) {
      document.getElementById("info").innerText =
        "Lyfe left: " + this.max_count;
    }

    let next_state = [];
    this.box_list.forEach((row, l) => {
      let next_row = [];
      row.forEach((box, w) => {
        let count = 0;
        let neighbors = [
          [l - 1, w - 1],
          [l - 1, w],
          [l - 1, w + 1],
          [l, w - 1],
          [l, w + 1],
          [l + 1, w - 1],
          [l + 1, w],
          [l + 1, w + 1],
        ];

        neighbors.forEach(([l, w]) => {
          if (
            l >= 0 &&
            l < this.box_list.length &&
            w >= 0 &&
            w < this.box_list[0].length
          ) {
            if (this.box_list[l][w].className == "life") {
              count++;
            }
          }
        });
        if (count > 1 && count < 3) {
          next_row.push(
            new Box(l, w, this.box_list[l][w].component, this, "life")
          );
        } else {
          next_row.push(new Box(l, w, this.box_list[l][w].component, this));
        }
      });
      next_state.push(next_row);
    });

    this.box_list = next_state;
  }
}
