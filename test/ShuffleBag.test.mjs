import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("Shuffle bag", () => {

    test("Shuffle bag will eventually give any value put into it", () => {
        const shuffleBag = new ShuffleBag([Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.T_SHAPE])
        const takenFromBag = []
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        expect(takenFromBag.some(tetromino => tetromino.type === "T")).to.equal(true);
    });

    test("After thtree rotations, shuffle bag has given specific value at least 3 times", () => {
        const shuffleBag = new ShuffleBag([Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.T_SHAPE])
        const takenFromBag = []
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())

        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())

        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        takenFromBag.push(shuffleBag.take())
        expect(takenFromBag.filter(tetromino => tetromino.type === "T").length).to.equal(3);
    });

    test("Order of items taken from shuffle bag varies", () => {
        const typeOfFirstValues = []
        const shuffleBag = new ShuffleBag([Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.T_SHAPE])
        typeOfFirstValues.push(shuffleBag.take().type)
        typeOfFirstValues.push(shuffleBag.take().type)
        typeOfFirstValues.push(shuffleBag.take().type)
        let foundDifferentOrder = false
        for (let i = 0; i < 100; i++) {
            const shuffleBag = new ShuffleBag([Tetromino.O_SHAPE, Tetromino.I_SHAPE, Tetromino.T_SHAPE])
            const takenFromBag = []
            takenFromBag.push(shuffleBag.take().type)
            takenFromBag.push(shuffleBag.take().type)
            takenFromBag.push(shuffleBag.take().type)
            if (takenFromBag.some((type, index) => type !== typeOfFirstValues[index])) {
                foundDifferentOrder = true
                break;
            }
        }
        expect(foundDifferentOrder).to.equal(true);
    });
});
