export class ShuffleBag {

    constructor(values) {
        this.valuePool = [...values]
        this.bag = this.shuffle()
    }

    shuffle() {
        return this.valuePool
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    take() {
        if (this.bag.length === 0) {
            this.bag = this.shuffle()
        }
        return this.bag.pop()
    }
} 