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

  stopBlock(block) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) { if (this.occupiesXY(x, y, block)) { this.dropped.set(`${x}${y}`, block.shape[block.y - y][x - block.x]) } }
    }
  }

  hasFalling() {
    return !!this.falling
  }

  tick() {
    if (!this.hasFalling()) return
    if (this.canOccupyBoard({ ...this.falling, y: this.falling.y - 1 })) {
      this.falling.y = this.falling.y - 1
    }
    else {
      this.stopBlock(this.falling)
      this.falling = null
    }
  }

  moveDown() {
    this.tick()
  }

  moveLeft() {
    if (this.canOccupyBoard({ ...this.falling, x: this.falling.x - 1 })) {
      this.falling.x = this.falling.x - 1
      return true
    }
  }

  moveRight() {
    if (this.canOccupyBoard({ ...this.falling, x: this.falling.x + 1 })) {
      this.falling.x = this.falling.x + 1
      return true
    }
  }

  canOccupyBoard(block) {
    return block && this.isInsideBoard(block) && !this.occupiesDropped(block)
  }

  rotateLeft() {
    this.rotate(this.falling.tetromino.rotateLeft())
  }

  rotateRight() {
    const tetromino = this.falling.tetromino.rotateRight()
    const newBlock = { ...this.falling, shape: Block.toShape(tetromino), tetromino }
    if (this.canOccupyBoard(newBlock)) {
      this.falling = newBlock
    } else {
      if (!this.isInsideBoard(newBlock)) {
        this.moveLeft()
      }
    }
  }

  rotate(tetromino) {
    const newBlock = { ...this.falling, shape: Block.toShape(tetromino), tetromino };
    if (this.canOccupyBoard(newBlock)) { this.falling = newBlock }
    else {
      if (!this.isInsideBoard(newBlock)) { this.moveRight() || this.moveLeft() }
    }
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
