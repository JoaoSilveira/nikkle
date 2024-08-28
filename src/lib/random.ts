function xorShift(seed: number) {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;

    // keep in 32 bits
    return seed & 0xFFFFFFFF;
}

export function seedForToday() {
    const date = new Date();

    return date.getUTCDate() + date.getUTCMonth() * 12 + date.getUTCFullYear() * 12 * 32;
}

export function intRange(seed: number, min: number, max: number): number {
    const number = xorShift(seed);
    const range = (max - min);

    return (number % range) + min;
}

export function pick<T>(seed: number, list: T[]): T | null {
    if (list.length <= 0) return null;

    return list[intRange(seed, 0, list.length)];
}

export class DailyRandom {

    #seed: number;

    constructor() {
        this.#seed = seedForToday();
    }

    next(min: number, max: number) {
        this.#seed = xorShift(this.#seed);

        return intRange(this.#seed, min, max);
    }

    pick<T>(list: T[]): T | null {
        if (!list || list.length < 1) return null;

        return list[this.next(0, list.length)];
    }
}