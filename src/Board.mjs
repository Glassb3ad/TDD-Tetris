export class Board {
  width;
  height;
  falling;
  dropped;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.dropped = new Map();
  }

  coversXY(x, y, falling) {
    return (falling.x <= x && x <= falling.x + (falling.shape[0].length - 1))
      && (y <= falling.y && y >= falling.y - (falling.shape.length - 1))
  }

  occupyXY(x, y, falling) { return this.hasFalling() && this.coversXY(x, y, falling) && falling.shape[falling.y - y][x - falling.x] !== "." }

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    const shape = c.toString().split("\n").map(a => a.split("")).filter(a => a[0])
    this.falling = { shape, x: Math.floor((this.width / 2) - (shape[0].length / 2)), y: this.height - 1 }
  }

  fallingAboveDropped(falling) {
    let res = false
    this.dropped.forEach((_, key) => {
      const [x, y] = key.split("")
      if (this.occupyXY(Number.parseInt(x), Number.parseInt(y) + 1, falling)) res = true
    })
    return res
  }

  hasReachedBottom(falling) {
    return Array(this.width).fill(0).map((_, index) => index).some(x => this.occupyXY(x, 0, falling))
  }

  canFall(block) {
    return !(this.hasReachedBottom(block) || this.fallingAboveDropped(block))
  }

  addToDropped(block) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) { if (this.occupyXY(x, y, block)) { this.dropped.set(`${x}${y}`, block.shape[block.y - y][x - block.x]) } }
    }
  }

  tick() {
    if (!this.hasFalling()) return
    if (this.canFall(this.falling)) {
      this.falling.y = this.falling.y - 1
    }
    else {
      this.addToDropped(this.falling)
      this.falling = null
    }
  }

  hasFalling() {
    return !!this.falling
  }


  getXY(x, y) {
    if (this.hasFalling() && this.occupyXY(x, y, this.falling)) {
      return this.falling.shape[this.falling.y - y][x - this.falling.x]
    }
    if (this.dropped.has(`${x}${y}`)) { return this.dropped.get(`${x}${y}`) }
    return "."
  }

  drawRow(x = 0, y = this.height, row = "") {
    if (x >= this.width) return row
    return this.drawRow(x + 1, y, row + this.getXY(x, y))
  }

  drawBoard(y = this.height - 1, board = "") {
    return (y >= 0) ? this.drawBoard(y - 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
