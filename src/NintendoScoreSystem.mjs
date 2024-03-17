export class NintendoScoreSystem {
    constructor() { this.score = 0 }
    update(linesCleared) { this.score = this.score + 40 }
    getScore() { return this.score }
}