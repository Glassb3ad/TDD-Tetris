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
    this.falling = { c, x: 1, y: 0 }
  }

  tick() {
    this.falling.y++
  }

  hasFalling() {
    return !!this.falling
  }

  drawRow(x = 0, y = 0, row = "") {
    if (x >= this.width) return row
    if (this.falling?.x === x && this.falling?.y === y) return this.drawRow(x + 1, y, row + this.falling.c)
    return this.drawRow(x + 1, y, row + ".")
  }

  drawBoard(y = 0, board = "") {
    return (y <= this.height - 1) ? this.drawBoard(y + 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
