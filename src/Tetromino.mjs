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

const J_SHAPE_DIRECTION_MAP = {
    "UP": [[".", ".", "."], ["J", "J", "J"], [".", ".", "J"]],
    "RIGHT": [[".", "J", "."], [".", "J", "."], ["J", "J", "."]],
    "LEFT": [[".", "J", "J"], [".", "J", "."], [".", "J", "."]],
    "DOWN": [["J", ".", "."], ["J", "J", "J"], [".", ".", "."]],
}

const L_SHAPE_DIRECTION_MAP = {
    "UP": [[".", ".", "."], ["L", "L", "L"], ["L", ".", "."]],
    "RIGHT": [["L", "L", "."], [".", "L", "."], [".", "L", "."]],
    "LEFT": [[".", "L", "."], [".", "L", "."], [".", "L", "L"]],
    "DOWN": [[".", ".", "L"], ["L", "L", "L"], [".", ".", "."]],


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
        case ("J"): return J_SHAPE_DIRECTION_MAP
        case ("L"): return L_SHAPE_DIRECTION_MAP
        case ("O"): return O_SHAPE_DIRECTION_MAP
    }
}
export class Tetromino {
    shape;
    constructor(shape, direction, type) {
        this.shape = new RotatingShape(shape)
        this.direction = direction || "UP"
        this.type = type
    }

    static T_SHAPE = new Tetromino(T_SHAPE_DIRECTION_MAP.UP, null, "T")
    static I_SHAPE = new Tetromino(I_SHAPE_DIRECTION_MAP.UP, null, "I")
    static O_SHAPE = new Tetromino(O_SHAPE_DIRECTION_MAP.UP, null, "O")
    static J_SHAPE = new Tetromino(J_SHAPE_DIRECTION_MAP.UP, null, "J")
    static L_SHAPE = new Tetromino(L_SHAPE_DIRECTION_MAP.UP, null, "L")

    rotateDirectionLeft(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": return new Tetromino(shapeDirectionMap.LEFT, "LEFT", tetromino.type)
            case "LEFT": return new Tetromino(shapeDirectionMap.DOWN, "DOWN", tetromino.type)
            case "DOWN": return new Tetromino(shapeDirectionMap.RIGHT, "RIGHT", tetromino.type)
            case "RIGHT": return new Tetromino(shapeDirectionMap.UP, "UP", tetromino.type)
        }
    }

    rotateDirectionRight(tetromino, shapeDirectionMap) {
        switch (tetromino.direction) {
            case "UP": return new Tetromino(shapeDirectionMap.RIGHT, "RIGHT", tetromino.type)
            case "RIGHT": return new Tetromino(shapeDirectionMap.DOWN, "DOWN", tetromino.type)
            case "DOWN": return new Tetromino(shapeDirectionMap.LEFT, "LEFT", tetromino.type)
            case "LEFT": return new Tetromino(shapeDirectionMap.UP, "UP", tetromino.type)
        }
    }

    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        if (this.type) return this.rotateDirectionRight(this, getDirectionMap(this.type))
        return new Tetromino(this.shape.rotateRight().shape)
    }

    rotateLeft() {
        if (this.type) return this.rotateDirectionLeft(this, getDirectionMap(this.type))
        return new Tetromino(this.shape.rotateLeft().shape)
    }
}
