export class RotatingShape {
    shape;

    constructor(shape) {
        this.shape = shape
    }

    static fromString(shape) {
        return new RotatingShape(shape.split("\n").map(row => row.trim().split("")))
    }

    rotateRight() {
        const rotated = this.shape.map((row, i) => row.map((_, j) => this.shape[this.shape.length - 1 - j][i]))
        return new RotatingShape(rotated)
    };

    rotateLeft() {
        const rotated = this.shape.map((row, i) => row.map((_, j) => this.shape[j][this.shape.length - 1 - i]))
        return new RotatingShape(rotated)
    };


    toString() {
        return this.shape.reduce((pre, cur) => `${pre}${cur.join("")}\n`, "")
    }
}