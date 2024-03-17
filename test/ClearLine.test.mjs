import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const CUSTOM_TETROMINO_SHAPE = [[".", "T", "."], ["T", "T", "T"], [".", ".", "."]]

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
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.O_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ..........
            ........OO`
        );
    });
});