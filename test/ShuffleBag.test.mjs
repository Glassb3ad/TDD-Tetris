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
});
