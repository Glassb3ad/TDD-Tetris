export class RotatingShape {
    shape;

    constructor(shape) {
        this.shape = shape
    }

    static fromString(shape) {
        return new RotatingShape(shape.split("\n").map(row => row.trim().split("")))
    }

    rotateRight() {
        return this.arrange((x, y) => this.shape[this.shape.length - 1 - x][y])
    };

    rotateLeft() {
        return this.arrange((x, y) => this.shape[x][this.shape.length - 1 - y])
    };

    arrange(getCell) {
        return new RotatingShape(this.shape.map((row, y) => row.map((_, x) => getCell(x, y))))
    };

    toString() {
        return this.shape.reduce((pre, cur) => `${pre}${cur.join("")}\n`, "")
    }
}