import { DailyGuessesKey, DailySeedKey } from "./const";
import { nikkes, type Nikke } from "./nikke";
import { seedForToday } from "./random";

export function getDailyGuesses(): Nikke[] {
    const seed = localStorage.getItem(DailySeedKey);

    if (!seed) {
        return [];
    }

    if (parseInt(seed) != seedForToday()) {
        return [];
    }

    const guesses = localStorage.getItem(DailyGuessesKey);
    if (guesses) {
        try {
            const names = JSON.parse(guesses);

            if (!Array.isArray(names))
                throw new Error();

            const allString = names.every(n => typeof n === 'string');
            if (!allString)
                throw new Error();

            const allFound = names.every(name => nikkes.some(n => n.name === name));
            if (!allFound)
                throw new Error();

            return names.map(name => nikkes.find(n => n.name === name)!);
        } catch (err) {
            console.error('invalid guesses on local storage. Starting anew.');
        }
    }

    return [];
}

export function updateGuesses(nikkes: Nikke[]): void {
    localStorage.setItem(DailySeedKey, seedForToday().toString());
    localStorage.setItem(DailyGuessesKey, JSON.stringify(nikkes.map(n => n.name)));
}