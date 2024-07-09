function xorShift(seed: number) {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;

    // keep in 32 bits
    return seed & 0xFFFFFFFF;
}

function seedForToday() {
    const date = new Date();

    return date.getDate() + date.getMonth() * 12 + date.getFullYear() * 12 * 32;
}

export class DailyRandom {

    #seed: number;

    constructor() {
        this.#seed = seedForToday();
    }

    next(lower: number, high: number) {
        const range = high - lower;

        this.#seed = xorShift(this.#seed);

        return lower + (this.#seed % range);
    }

    pick<T>(list: T[]): T | null {
        if (!list || list.length < 1) return null;

        return list[this.next(0, list.length)];
    }
}