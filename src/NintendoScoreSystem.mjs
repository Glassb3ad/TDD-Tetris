const LEVEL_ZERO_MAP = {
    1: 40,
    2: 100
}
export class NintendoScoreSystem {
    constructor() { this.score = 0 }
    update(linesCleared) {
        this.score = this.score + LEVEL_ZERO_MAP[linesCleared]
    }
    getScore() {
        return this.score
    }
}