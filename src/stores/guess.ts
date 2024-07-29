import type { Nikke } from "$lib/nikke";
import { writable } from "svelte/store";

export const guesses = writable<Nikke[]>([]);
export const max_guesses = 6;

export function reset() {
    guesses.set([]);
}

export function pushGuess(guess: Nikke) {
    guesses.update(guesses => ([...guesses, guess]));
}