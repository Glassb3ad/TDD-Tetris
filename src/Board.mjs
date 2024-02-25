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

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    this.falling = { c, x: 1, y: this.height - 1 }
  }

  tick() {
    if (this.falling.y === 0) {
      this.dropped.set(`${this.falling.x}${this.falling.y}`, this.falling.c)
      this.falling = null
    }
    else this.falling.y--
  }

  hasFalling() {
    return !!this.falling
  }

  drawRow(x = 0, y = this.height, row = "") {
    if (x >= this.width) return row
    if (this.falling?.x === x && this.falling?.y === y) return this.drawRow(x + 1, y, row + this.falling.c)
    if (this.dropped.has(`${x}${y}`)) { return this.drawRow(x + 1, y, row + this.dropped.get(`${x}${y}`)) }
    return this.drawRow(x + 1, y, row + ".")
  }

  drawBoard(y = this.height - 1, board = "") {
    return (y >= 0) ? this.drawBoard(y - 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
