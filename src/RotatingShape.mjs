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
        return this.rotate((x, y) => this.shape[x][this.shape.length - 1 - y])
    };


    rotate(getCell) {
        return new RotatingShape(this.shape.map((row, y) => row.map((_, x) => getCell(x, y))))
    };

    toString() {
        return this.shape.reduce((pre, cur) => `${pre}${cur.join("")}\n`, "")
    }
}