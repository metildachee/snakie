function doesNotContainSnake() {
    let x = Math.floor(Math.random() * (rows - 1));
    let y = Math.floor(Math.random() * (cols - 1));
    let barrier = [x, y];
    if (x == Math.floor(rows/2) && y == Math.floor(cols/2))
        barrier = doesNotContainSnake(); // as long as it is not in the center
    return barrier;
}

function doesNotContainBarriersOrMovingSnake() {
    let x = Math.floor(Math.random() * (rows - 1));
    let y = Math.floor(Math.random() * (cols - 1));
    let newFood = [x, y];

    if (snake.body.some(block => block.x == x && block.y == y) ||
        (barriers.container.some(block => block.x == x && block.y == y)))
        newFood = doesNotContainBarriersOrMovingSnake();
        
    return newFood;
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Barrier extends Block {
    constructor() {
        let barrier = doesNotContainSnake();
        super(barrier[0], barrier[1]);
    }
}

class Barriers {
    constructor() {
        this.container = [];
    }
    makeBarrier(num) {
        for (let i = 0; i < num; i++) {
            this.container.push(new Barrier());
        }
    }
}

class Food extends Block {
    constructor() {
        let block = doesNotContainBarriersOrMovingSnake();
        super(block[0], block[1]);
    }
}

class Foods extends Barriers {
    makeFood(num) {
        for (let i = 0; i < num; i++) {
            this.container.push(new Food());
        }
    }
    removeFood(food) {
        for (let i = 0; i < this.container.length; i++) {
            if (this.container[i].x == food.x && this.container[i].y == food.y) {
                let cell = getCell(this.container[i].x, this.container[i].y);
                cell.classList.remove("food");
                this.container.splice(i, 1);
            }
        }
    }
}