import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    constructor(shape) {
        this.shape = new RotatingShape(shape)
    }
    static T_SHAPE = new Tetromino([[".", "T", "."], ["T", "T", "T"], [".", ".", "."]])
    static I_SHAPE = new Tetromino([
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."]
    ])

    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        return this.shape.rotateRight()
    }

    rotateLeft() {
        return this.shape.rotateLeft()
    }

}