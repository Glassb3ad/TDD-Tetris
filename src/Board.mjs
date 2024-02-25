export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawRow(x = 0, row = "") {
    return (x <= this.width - 1) ? this.drawRow(++x, row + ".") : row
  }

  drawBoard(y = 0, board = "") {
    return (y <= this.height - 1) ? this.drawBoard(++y, board + `${this.drawRow()}\n`) : board
  }

  toString() {
    return this.drawBoard();
  }
}
