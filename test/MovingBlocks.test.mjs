import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Tetromino2 } from "../src/Tetromino.mjs";

describe("Falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("Can be moved left", () => {
        board.drop(Tetromino2.T_SHAPE);
        board.moveLeft()
        expect(board.toString()).to.equalShape(
            `..TTT.....
            ...T......
            ..........
            ..........
            ..........
            ..........`
        );
    });

    test("Can be moved right", () => {
        board.drop(Tetromino2.T_SHAPE);
        board.moveRight()
        expect(board.toString()).to.equalShape(
            `....TTT...
             .....T....
             ..........
             ..........
             ..........
             ..........`
        );
    });

    test("Can be moved down", () => {
        board.drop(Tetromino2.T_SHAPE);
        board.moveDown()
        expect(board.toString()).to.equalShape(
            `..........
            ...TTT....
            ....T.....
            ..........
            ..........
            ..........`
        );
    });

    test("cannot be moved left beyond the board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        expect(board.toString()).to.equalShape(
            `.T........
            TTT.......
            ..........
            ..........
            ..........
            ..........`
        );
    });

    test("cannot be moved right beyond the board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        expect(board.toString()).to.equalShape(
            `........T.
            .......TTT
            ..........
            ..........
            ..........
            ..........`
        );
    });

    test("cannot be moved down beyond the board", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ....T.....
            ...TTT....`
        );
        expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });

    test("cannot be moved left through other blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        board.drop(Tetromino.T_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveLeft()

        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ......T...
            ....TTTT..
            ...TTT....`
        );
    });

    test("cannot be moved right through other blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveRight()
        board.moveRight()
        board.moveDown()

        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveRight()

        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ....T.....
            ...TTTT...
            .....TTT..`
        );
    });

    test("cannot be moved down through other blocks", () => {
        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        board.drop(Tetromino.T_SHAPE);
        board.moveDown()
        board.moveDown()
        board.moveDown()
        board.moveDown()

        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ....T.....
            ...TTT....
            ....T.....
            ...TTT....`
        );
        expect(board.hasFalling(), "the block should stop moving").to.be.false;
    });
});