const POINTS_PER_LINES = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200,
}
export class NintendoScoreSystem {
    constructor() {
        this.score = 0
        this.level = 0
    }
    update(linesCleared) {
        this.score = this.score + (POINTS_PER_LINES[linesCleared] * (this.level + 1))
    }
    getScore() {
        return this.score
    }
    setLevel(level) { this.level = level }
}