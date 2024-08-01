import { MaxAttempts } from "$lib/const";
import { getDailyGuesses } from "$lib/daily-storage";
import { type Nikke, nikkes } from "$lib/nikke";
import { pick, seedForToday } from "$lib/random";
import { derived, writable } from "svelte/store";

export const correct = writable<Nikke>(nikkes[0]);
export const guesses = writable<Nikke[]>([]);
export const remaining = writable<Nikke[]>(nikkes);
export const ended = derived([correct, guesses], ([$correct, $guesses]) => {
    return $guesses.length >= MaxAttempts || $correct.name == $guesses[0]?.name;
});
export const guessedRight = derived([correct, guesses], ([$correct, $guesses]) => $correct.name == $guesses[0]?.name);

export function startDaily(): void {
    const stored = getDailyGuesses();

    guesses.set(stored);
    remaining.set(nikkes.filter(n => stored.every(s => s.name !== n.name)));
    correct.set(pick(seedForToday(), nikkes)!);
}

export function startNewGame(nikke: Nikke): void {
    guesses.set([]);
    remaining.set(nikkes);
    correct.set(nikke);
}

export function takeGuess(nikke: Nikke): void {
    guesses.update(gs => [nikke, ...gs]);
    remaining.update(nr => nr.filter(n => n.name !== nikke.name));
}