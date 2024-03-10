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