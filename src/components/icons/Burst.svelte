<script lang="ts">
    import { Burst } from "$lib/nikke";
    import BurstAll from "./BurstAll.svelte";
    import BurstOne from "./BurstOne.svelte";
    import BurstThree from "./BurstThree.svelte";
    import BurstTwo from "./BurstTwo.svelte";

    export let burst: Burst;
    export let correct: boolean = false;
</script>

{#if burst === Burst.I}
    <BurstOne {correct} />
{:else if burst === Burst.II}
    <BurstTwo {correct} />
{:else if burst === Burst.III}
    <BurstThree {correct} />
{:else if burst === Burst.A}
    <BurstAll {correct} />
{/if}
