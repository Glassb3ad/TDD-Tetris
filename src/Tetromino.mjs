import { RotatingShape } from "./RotatingShape.mjs";

const T_SHAPE_DIRECTION_MAP = {
    "UP": [["T", "T", "T"], [".", "T", "."], [".", ".", "."]],
    "LEFT": [[".", "T", "."], [".", "T", "T"], [".", "T", "."]],
    "DOWN": [[".", "T", "."], ["T", "T", "T"], [".", ".", "."]],
    "RIGHT": [[".", "T", "."], ["T", "T", "."], [".", "T", "."]],
}
export class Tetromino {
    shape;
    constructor(shape, direction) {
        this.shape = new RotatingShape(shape)
        this.direction = direction || "UP"
    }

    static T_SHAPE = new Tetromino([[".", "T", "."], ["T", "T", "T"], [".", ".", "."]])
    static I_SHAPE = new Tetromino([
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."]
    ])
    static O_SHAPE = new Tetromino([[".", "O", "O"], [".", "O", "O"], [".", ".", "."]])

    rotateDirectionLeft(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": new Tetromino(shapeDirectionMap.LEFT, "LEFT")
            case "LEFT": new Tetromino(shapeDirectionMap.DOWN, "DOWN")
            case "DOWN": new Tetromino(shapeDirectionMap.RIGHT, "RIGHT")
            case "RIGHT": new Tetromino(shapeDirectionMap.UP, "UP")
        }
    }
    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        if (this.shape.shape.some(a => a.includes("O"))) return this
        if (this.shape.shape[1][2] === "I") return this.rotateLeft()
        return new Tetromino(this.shape.rotateRight().shape)
    }

    rotateLeft() {
        if (this.shape.shape[2][0] === "I") return this.rotateRight()
        if (this.shape.shape.some(a => a.includes("O"))) return this
        return new Tetromino(this.shape.rotateLeft().shape)
    }
}

export class Tetromino2 {
    shape;
    constructor(shape, direction) {
        this.shape = new RotatingShape(shape)
        this.direction = direction || "UP"
    }

    static T_SHAPE = new Tetromino([[".", "T", "."], ["T", "T", "T"], [".", ".", "."]])
    static I_SHAPE = new Tetromino([
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."]
    ])
    static O_SHAPE = new Tetromino([[".", "O", "O"], [".", "O", "O"], [".", ".", "."]])

    rotateDirectionLeft(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": new Tetromino(shapeDirectionMap.LEFT, "LEFT")
            case "LEFT": new Tetromino(shapeDirectionMap.DOWN, "DOWN")
            case "DOWN": new Tetromino(shapeDirectionMap.RIGHT, "RIGHT")
            case "RIGHT": new Tetromino(shapeDirectionMap.UP, "UP")
        }
    }
    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        if (this.shape.shape.some(a => a.includes("O"))) return this
        if (this.shape.shape[1][2] === "I") return this.rotateLeft()
        return new Tetromino(this.shape.rotateRight().shape)
    }

    rotateLeft() {
        if (this.shape.shape[2][0] === "I") return this.rotateRight()
        if (this.shape.shape.some(a => a.includes("O"))) return this
        return new Tetromino(this.shape.rotateLeft().shape)
    }
}
