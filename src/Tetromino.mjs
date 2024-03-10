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
    static O_SHAPE = new Tetromino([[".", "O", "O"], [".", "O", "O"], [".", ".", "."]])

    toString() {
        return this.shape.toString()
    }

    rotateRight() {
        return this.shape.rotateRight()
    }

    rotateLeft() {
        return new Tetromino(this.shape.rotateLeft().shape.reverse())
    }

}