import { RotatingShape } from "./RotatingShape.mjs";

const I_SHAPE_DIRECTION_MAP = {
    "LEFT": [
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", ".", ".", "."]
    ],
    "UP": [
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."]
    ],
    "RIGHT": [
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", "I", ".", "."],
        [".", ".", ".", ".", "."]
    ],
    "DOWN": [
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."]
    ],
}

const T_SHAPE_DIRECTION_MAP = {
    "UP": [["T", "T", "T"], [".", "T", "."], [".", ".", "."]],
    "LEFT": [[".", "T", "."], [".", "T", "T"], [".", "T", "."]],
    "DOWN": [[".", "T", "."], ["T", "T", "T"], [".", ".", "."]],
    "RIGHT": [[".", "T", "."], ["T", "T", "."], [".", "T", "."]],
}

const O_SHAPE_DIRECTION_MAP = {
    "UP": [[".", "O", "O"], [".", "O", "O"], [".", ".", "."]],
    "LEFT": [[".", "O", "O"], [".", "O", "O"], [".", ".", "."]],
    "DOWN": [[".", "O", "O"], [".", "O", "O"], [".", ".", "."]],
    "RIGHT": [[".", "O", "O"], [".", "O", "O"], [".", ".", "."]],
}

const getDirectionMap = (type) => {
    switch (type) {
        case ("T"): return T_SHAPE_DIRECTION_MAP
        case ("I"): return I_SHAPE_DIRECTION_MAP
    }
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
    constructor(shape, direction, type) {
        this.shape = new RotatingShape(shape)
        this.direction = direction || "UP"
        this.type = type
    }

    static T_SHAPE = new Tetromino2(T_SHAPE_DIRECTION_MAP.UP, null, "T")
    static I_SHAPE = new Tetromino2(I_SHAPE_DIRECTION_MAP.UP, null, "I")
    static O_SHAPE = new Tetromino2([[".", "O", "O"], [".", "O", "O"], [".", ".", "."]], null, "O")

    rotateDirectionLeft(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": return new Tetromino2(shapeDirectionMap.LEFT, "LEFT", tetromino.type)
            case "LEFT": return new Tetromino2(shapeDirectionMap.DOWN, "DOWN", tetromino.type)
            case "DOWN": return new Tetromino2(shapeDirectionMap.RIGHT, "RIGHT", tetromino.type)
            case "RIGHT": return new Tetromino2(shapeDirectionMap.UP, "UP", tetromino.type)
        }
    }

    rotateDirectionRight(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": return new Tetromino2(shapeDirectionMap.RIGHT, "RIGHT", tetromino.type)
            case "RIGHT": return new Tetromino2(shapeDirectionMap.DOWN, "DOWN", tetromino.type)
            case "DOWN": return new Tetromino2(shapeDirectionMap.LEFT, "LEFT", tetromino.type)
            case "LEFT": return new Tetromino2(shapeDirectionMap.UP, "UP", tetromino.type)
        }
    }

    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        if (this.type === "O") return this
        if (this.type) return this.rotateDirectionRight(this, getDirectionMap(this.type))
    }

    rotateLeft() {
        if (this.type === "O") return this
        if (this.type) return this.rotateDirectionLeft(this, getDirectionMap(this.type))
    }
}
