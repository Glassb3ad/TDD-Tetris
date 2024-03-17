import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { NintendoScoreSystem } from "../src/NintendoScoreSystem.mjs";

class SimpleScoreSystem {
    constructor() {
        this.score = 0
    }
    update(clearedLines) {
        this.score = this.score + clearedLines
    }

    getScore() {
        return this.score
    }
}

function fallToBottom(board) {
    for (let i = 0; i < 10; i++) {
        board.tick();
    }
}

describe("Game allows score counting", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("Update methdod of subscribed score system is not called if no line is cleared", () => {
        const scoreCounter = new SimpleScoreSystem()
        board.subscribe(scoreCounter);
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ..........
            IIII......`
        );
        expect(scoreCounter.getScore()).to.equal(0)
    });

    test("Update methdon of subscribed score system is called when line is cleared", () => {
        const scoreCounter = new SimpleScoreSystem()
        board.subscribe(scoreCounter);
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
        expect(scoreCounter.getScore()).to.equal(1)
    });

    test("Update methdod of subscribed score system is called for each cleared line", () => {
        const scoreCounter = new SimpleScoreSystem()
        board.subscribe(scoreCounter);
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
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
            ..........`
        );
        expect(scoreCounter.getScore()).to.equal(2)
    });
});

describe("Nintendo scoring system", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    test("One cleared line equals 40 point increase", () => {
        const scoreCounter = new NintendoScoreSystem()
        board.subscribe(scoreCounter);
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
        expect(scoreCounter.getScore()).to.equal(40)
    });

    test("Clearing 2 lines equals 100 point increase", () => {
        const scoreCounter = new NintendoScoreSystem()
        board.subscribe(scoreCounter);
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
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
            ..........`
        );
        expect(scoreCounter.getScore()).to.equal(100)
    });

    test("Clearing 3 lines equals 300 point increase", () => {
        const scoreCounter = new NintendoScoreSystem()
        board.subscribe(scoreCounter);
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ..........
            ........II`
        );
        expect(scoreCounter.getScore()).to.equal(300)
    });

    test("Clearing 4 lines equals 1200 point increase", () => {
        const scoreCounter = new NintendoScoreSystem()
        board.subscribe(scoreCounter);
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveLeft()
        board.moveLeft()
        board.moveLeft()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        board.moveRight()
        fallToBottom(board)
        board.drop(Tetromino.I_SHAPE);
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.moveRight()
        board.rotateLeft()
        fallToBottom(board)
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ..........
            ..........
            ..........`
        );
        expect(scoreCounter.getScore()).to.equal(1200)
    });
});