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

  drop(c) {
    if (this.hasFalling()) {
      throw new Error("already falling")
    }
    const shape = Block.toShape(c)
    this.falling = { shape, x: Math.floor((this.width / 2) - (shape[0].length / 2)), y: this.height - 1, tetromino: c }
  }

  hasFalling() {
    return !!this.falling
  }

  tick() {
    if (!this.hasFalling()) return
    if (this.canMoveDown(this.falling)) {
      this.falling.y = this.falling.y - 1
    }
    else {
      this.stopBlock(this.falling)
      this.falling = null
    }
  }

  stopBlock(block) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) { if (this.occupiesXY(x, y, block)) { this.dropped.set(`${x}${y}`, block.shape[block.y - y][x - block.x]) } }
    }
  }

  moveDown() {
    this.tick()
  }

  canMoveDown(block) {
    return this.isInsideBoard({ ...block, y: block.y - 1 }) && !this.hasBlockDown(block)
  }

  hasBlockDown(block) {
    let res = false
    this.dropped.forEach((_, key) => {
      const [x, y] = key.split("")
      if (this.occupiesXY(Number.parseInt(x), Number.parseInt(y) + 1, block)) res = true
    })
    return res
  }

  moveLeft() {
    if (this.canMoveLeft({ ...this.falling, x: this.falling.x - 1 })) {
      this.falling.x = this.falling.x - 1
    }
  }

  canMoveLeft(block) {
    return block && this.isInsideBoard(block) && !this.occupiesDropped(block)
  }

  hasBlockLeft(block) {
    let res = false
    this.dropped.forEach((_, key) => {
      const [x, y] = key.split("")
      if (this.occupiesXY(Number.parseInt(x) + 1, Number.parseInt(y), block)) res = true
    })
    return res
  }

  moveRight() {
    if (this.canMoveRight({ ...this.falling, x: this.falling.x + 1 })) {
      this.falling.x = this.falling.x + 1
    }
  }

  canMoveRight(block) {
    return block && this.isInsideBoard(block) && !this.occupiesDropped(block)
  }

  hasBlockRight(block) {
    let res = false
    this.dropped.forEach((_, key) => {
      const [x, y] = key.split("")
      if (this.occupiesXY(Number.parseInt(x) - 1, Number.parseInt(y), block)) res = true
    })
    return res
  }

  rotateLeft() {
    const tetromino = this.falling.tetromino.rotateLeft()
    this.falling.tetromino = tetromino
    this.falling.shape = Block.toShape(tetromino)
  }

  rotateRight() {
    const tetromino = this.falling.tetromino.rotateRight()
    this.falling.tetromino = tetromino
    this.falling.shape = Block.toShape(tetromino)
  }

  occupiesX(x, block) {
    return Array(this.height).fill(0).map((_, index) => index).reduce((result, y) => result || this.occupiesXY(x, y, block), false)
  }

  occupiesXY(x, y, block) { return this.hasFalling() && this.coversXY(x, y, block) && block.shape[block.y - y][x - block.x] !== "." }

  coversXY(x, y, block) {
    return (block.x <= x && x <= block.x + (block.shape[0].length - 1))
      && (y <= block.y && y >= block.y - (block.shape.length - 1))
  }

  isInsideBoard(block) {
    let result = true
    for (let y = 0; y < block.shape.length; y++) {
      for (let x = 0; x < block.shape[0].length; x++) {
        if (block.shape[y][x] !== "." && (x + block.x >= this.width || x + block.x < 0 || block.y - y < 0)) { result = false }
      }
    }
    return result
  }

  occupiesDropped(block) {
    let result = false
    for (let y = 0; y < block.shape.length; y++) {
      for (let x = 0; x < block.shape[0].length; x++) {
        if (block.shape[y][x] !== "." && this.dropped.has(`${x + block.x}${block.y - y}`)) { result = true }
      }
    }
    return result
  }

  drawBoard(y = this.height - 1, board = "") {
    return (y >= 0) ? this.drawBoard(y - 1, board + `${this.drawRow(0, y)}\n`) : board
  }

  drawRow(x = 0, y = this.height, row = "") {
    if (x >= this.width) return row
    return this.drawRow(x + 1, y, row + this.getXY(x, y))
  }

  getXY(x, y) {
    if (this.hasFalling() && this.occupiesXY(x, y, this.falling)) {
      return this.falling.shape[this.falling.y - y][x - this.falling.x]
    }
    if (this.dropped.has(`${x}${y}`)) { return this.dropped.get(`${x}${y}`) }
    return "."
  }

  toString() {
    return this.drawBoard();
  }
}
