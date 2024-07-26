import { nikkes } from "$lib/nikke";
import { pick, seedForToday } from "$lib/random";
import { readable } from "svelte/store";

export const nikke = readable(pick(seedForToday(), nikkes));