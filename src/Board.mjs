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

  fallingOccupiesXY(x, y) {
    return this.falling &&
      (this.falling.x <= x && x <= this.falling.x + (this.falling.c[0].length - 1))
      && (y <= this.falling.y && y >= this.falling.y - (this.falling.c.length - 1))
  }

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    const shape = c.toString().split("\n").map(a => a.split("")).filter(a => a[0])
    this.falling = { c: shape, x: Math.floor((this.width / 2) - (shape[0].length / 2)), y: this.height - 1 }
  }

  canFall(x, y) {
    return this.falling.y === 0 || this.dropped.has(`${x}${y - 1}`)
  }

  tick() {
    if (this.canFall(this.falling.x, this.falling.y)) {
      this.dropped.set(`${this.falling.x}${this.falling.y}`, this.falling.c)
      this.falling = null
    }
    else this.falling.y--
  }

  hasFalling() {
    return !!this.falling
  }

  drawXY(x, y) {
    if (this.fallingOccupiesXY(x, y)) {
      return this.falling.c[this.falling.y - y][x - this.falling.x]
    }
    if (this.dropped.has(`${x}${y}`)) { return this.dropped.get(`${x}${y}`) }
    return "."
  }

  drawRow(x = 0, y = this.height, row = "") {
    if (x >= this.width) return row
    return this.drawRow(x + 1, y, row + this.drawXY(x, y))
  }

  drawBoard(y = this.height - 1, board = "") {
    return (y >= 0) ? this.drawBoard(y - 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
