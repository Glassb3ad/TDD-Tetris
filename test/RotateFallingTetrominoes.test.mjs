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

    test("Cant rotate right through another block", () => {
        board.drop(Tetromino.T_SHAPE);
        fallToBottom(board);
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.tick()
        board.rotateRight()

        expect(board.toString()).to.equalShape(
            `..........
           ..........
           ....T.....
           ...TTT....
           ....T.....
           ...TTT....`
        );
    });

    test("Can wall kick left side", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateRight()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.rotateLeft()
        expect(board.toString()).to.equalShape(
            `.T........
            .TT.......
            .T........
            ..........
            ..........
            ..........`
        );
    });

    test("Can wall kick right side", () => {
        board.drop(Tetromino.T_SHAPE);
        board.rotateLeft()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateRight()
        expect(board.toString()).to.equalShape(
            `........T.
            .......TT.
            ........T.
            ..........
            ..........
            ..........`
        );
    });

    test("Cant floow kick", () => {
        board.drop(Tetromino.T_SHAPE);
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.rotateLeft()

        expect(board.toString()).to.equalShape(
            `..........
           ..........
           ..........
           ..........
           ....T.....
           ...TTT....`
        );
    });
});