<script lang="ts">
    import { Manufacturer } from "$lib/nikke";
    import Abnormal from "./Abnormal.svelte";
    import Elysion from "./Elysion.svelte";
    import Missilis from "./Missilis.svelte";
    import Pilgrim from "./Pilgrim.svelte";
    import Tetra from "./Tetra.svelte";

    export let manufacturer: Manufacturer;
    export let correct: boolean = false;
</script>

{#if manufacturer === Manufacturer.Elysion}
    <Elysion {correct} />
{:else if manufacturer === Manufacturer.Missilis}
    <Missilis {correct} />
{:else if manufacturer === Manufacturer.Tetra}
    <Tetra {correct} />
{:else if manufacturer === Manufacturer.Pilgrim}
    <Pilgrim {correct} />
{:else if manufacturer === Manufacturer.Abnormal}
    <Abnormal {correct} />
{/if}
