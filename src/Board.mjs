class Block {
  static toShape(arg) { return arg.toString().split("\n").map(a => a.split("")).filter(a => a[0]) }
}

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

  coversXY(x, y, block) {
    return (block.x <= x && x <= block.x + (block.shape[0].length - 1))
      && (y <= block.y && y >= block.y - (block.shape.length - 1))
  }

  occupiesXY(x, y, block) { return this.hasFalling() && this.coversXY(x, y, block) && block.shape[block.y - y][x - block.x] !== "." }

  occupiesX(x, block) {
    return Array(this.height).fill(0).map((_, index) => index).reduce((result, y) => result || this.occupiesXY(x, y, block), false)
  }

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    const shape = Block.toShape(c)
    this.falling = { shape, x: Math.floor((this.width / 2) - (shape[0].length / 2)), y: this.height - 1 }
  }

  moveLeft() {
    if (!this.occupiesX(0, this.falling)) {
      this.falling.x = this.falling.x - 1
    }
  }

  moveRight() {
    this.falling.x = this.falling.x + 1
  }

  moveDown() {
    this.tick()
  }

  aboveDropped(block) {
    let res = false
    this.dropped.forEach((_, key) => {
      const [x, y] = key.split("")
      if (this.occupiesXY(Number.parseInt(x), Number.parseInt(y) + 1, block)) res = true
    })
    return res
  }

  hasReachedBottom(block) {
    return Array(this.width).fill(0).map((_, index) => index).some(x => this.occupiesXY(x, 0, block))
  }

  canFall(block) {
    return !(this.hasReachedBottom(block) || this.aboveDropped(block))
  }

  addToDropped(block) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) { if (this.occupiesXY(x, y, block)) { this.dropped.set(`${x}${y}`, block.shape[block.y - y][x - block.x]) } }
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
    if (this.hasFalling() && this.occupiesXY(x, y, this.falling)) {
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
