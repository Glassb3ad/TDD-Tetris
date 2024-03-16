import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotate Falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("Can be rotated left", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `....T.....
            ...TT.....
            ....T.....
            ..........
            ..........
            ..........`
        );
    });
});