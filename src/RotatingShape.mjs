export class RotatingShape {
    shape;

    constructor(shape) {
        this.shape = shape
    }

    static fromString(shape) {
        return new RotatingShape(shape.split("\n").map(row => row.trim()))
    }

    toString() {
        return this.shape.reduce((pre, cur) => `${pre}${cur}\n`, "")
    }
}