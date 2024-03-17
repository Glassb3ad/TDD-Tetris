const LEVEL_POINTS_MAP = {
    1: (l) => 40 * (l + 1),
    2: (l) => 100 * (l + 1),
    3: (l) => 300 * (l + 1),
    4: () => 1200
}
export class NintendoScoreSystem {
    constructor() {
        this.score = 0
        this.level = 0
    }
    update(linesCleared) {
        this.score = this.score + LEVEL_POINTS_MAP[linesCleared](this.level)
    }
    getScore() {
        return this.score
    }
    setLevel(level) { this.level = level }
}