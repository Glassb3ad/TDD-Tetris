export class ShuffleBag {
    constructor(values) {
        this.valuePool = [...values]
        this.bag = [...values]
    }

    shuffle() {
        return [...this.valuePool]
    }

    take() {
        if (this.bag.length === 0) {
            this.bag = this.shuffle()
        }
        return this.bag.pop()
    }
} 