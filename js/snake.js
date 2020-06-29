let htmlPage = window.getComputedStyle(document.querySelector("html"));
var cols = parseInt(htmlPage.getPropertyValue("--cols"));
var rows = parseInt(htmlPage.getPropertyValue("--rows"));

class Snake {
  constructor() {
    let head = new Block(Math.floor(rows/2), Math.floor(cols/2));
    this.head = head;
    this.body = [];
    this.body.push(this.head);
    this.points = 0;
  }
  expand() {
    let block = new Block();
    switch(currKey) {
        case "ArrowLeft":
            block.x = this.head.x;
            block.y = this.head.y + 1;
            break;
        case "ArrowUp":
            block.x = this.head.x + 1;
            block.y = this.head.y;
            break;
        case "ArrowRight":
            block.x = this.head.x;
            block.y = this.head.y - 1;
            break;
        case "ArrowDown":
            block.x = this.head.x - 1;
            block.y = this.head.y;
            break;
    }
    for (let i = 0; i < lvls[mode].expandFactor; i++) {
        this.points++;
        this.body.push(block);
    }
  }
  
  move(requestedAction) {
    let addBlock = new Block();
    switch(requestedAction) {
        case "ArrowLeft":
            if (prevKey == "ArrowRight") return this.move(currKey = prevKey);
            addBlock.x = snake.head.x;
            addBlock.y = snake.head.y - 1;
            break;
        case "ArrowUp":
            if (prevKey == "ArrowDown") return this.move(currKey = prevKey);
            addBlock.x = snake.head.x - 1;
            addBlock.y = snake.head.y;
            break;
        case "ArrowRight":
            if (prevKey == "ArrowLeft") return this.move(currKey = prevKey);
            addBlock.x = snake.head.x;
            addBlock.y = snake.head.y + 1;
            break;
        case "ArrowDown":
            if (prevKey == "ArrowUp") return this.move(currKey = prevKey);
            addBlock.x = snake.head.x + 1;
            addBlock.y = snake.head.y;
            break;
        default: return this.move(currKey = prevKey);
    }
    let lastBlock = this.body.pop();
    getCell(lastBlock.x, lastBlock.y).classList.remove("snake");
    this.body.unshift(addBlock);
    this.head = addBlock;
    prevKey = currKey;
  }

  hitBorder() {
    return ((this.head.y < 0) ||
            (this.head.y >= cols) ||
            (this.head.x < 0) ||
            (this.head.x >= rows));
  }

  hits(arr) { return arr.container.some(block=> block.x == this.head.x && block.y == this.head.y) };

  onBody() {
    for (let i = 1; i < this.body.length; i++) {
        if (this.head.x == this.body[i].x && this.head.y == this.body[i].y)
            return true;
    }
    return false;
  }
}