export class ShuffleBag {
    constructor(values) {
        this.valuePool = [...values]
        this.bag = [...values]
    }

    take() { return this.bag.pop() }
} 