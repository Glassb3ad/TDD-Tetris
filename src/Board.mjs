export class Board {
  width;
  height;
  falling;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    this.falling = { c, x: 1, y: this.height - 1 }
  }

  tick() {
    this.falling.y--
  }

  hasFalling() {
    return !!this.falling
  }

  drawRow(x = 0, y = this.height, row = "") {
    if (x >= this.width) return row
    if (this.falling?.x === x && this.falling?.y === y) return this.drawRow(x + 1, y, row + this.falling.c)
    return this.drawRow(x + 1, y, row + ".")
  }

  drawBoard(y = this.height - 1, board = "") {
    return (y >= 0) ? this.drawBoard(y - 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
