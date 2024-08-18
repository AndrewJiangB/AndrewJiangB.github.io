function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Box {
  constructor(x, y, component, type = "ground") {
    this.x = x;
    this.y = y;
    this.className = type;
    this.component = component;
    this.component.className = this.className;
    this.component.onclick = () => {
      if (this.className == "ground") {
        this.className = "life";
        this.component.className = "life";
      } else if (this.className == "life") {
        this.className = "ground";
        this.component.className = "ground";
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
  }

  setup() {
    var div_el;
    var div_row;
    var game_field = document.getElementById("game_field");

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
        let box = new Box(l, w, div_el);
        box_row.push(box);

        //Add to row node
        div_row.appendChild(div_el);
      }
      this.box_list.push(box_row);
      game_field.appendChild(div_row);
    }
  }

  start() {
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
          next_row.push(new Box(l, w, this.box_list[l][w].component, "life"));
        }
        // else if ( count == 3 && this.box_list[l][w].className == "life") {
        //     next_row.push(new Box(l, w, this.box_list[l][w].component, "life"));
        // } 
        else {
          next_row.push(new Box(l, w, this.box_list[l][w].component));
        }
      });
      next_state.push(next_row);
    });

    this.box_list = next_state;
  }
}
