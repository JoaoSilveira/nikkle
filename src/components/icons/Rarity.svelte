<script lang="ts">
    import { Rarity } from "$lib/nikke";
    import R from "./R.svelte";
    import Sr from "./Sr.svelte";
    import Ssr from "./Ssr.svelte";

    export let rarity: Rarity;
    export let correct: boolean = false;
</script>

{#if rarity === Rarity.R}
    <R {correct} />
{:else if rarity === Rarity.Sr}
    <Sr {correct} />
{:else if rarity === Rarity.Ssr}
    <Ssr {correct} />
{/if}
