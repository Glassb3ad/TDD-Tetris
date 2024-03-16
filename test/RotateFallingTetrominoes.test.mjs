import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

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

    test("Block can be rotated right", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight()
        expect(board.toString()).to.equalShape(
            `....T.....
            ....TT....
            ....T.....
            ..........
            ..........
            ..........`
        );
    });

    test("Cant rotate left through another block", () => {
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
            `..........
           ..........
           ....T.....
           ...TTT....
           ....T.....
           ...TTT....`
        );
    });
});