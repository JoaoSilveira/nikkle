<script lang="ts">
    import { Position } from "$lib/nikke";
    import Attacker from "./Attacker.svelte";
    import Defender from "./Defender.svelte";
    import Supporter from "./Supporter.svelte";

    export let position: Position;
    export let correct: boolean = false;
</script>

{#if position === Position.Attacker}
    <Attacker {correct} />
{:else if position === Position.Supporter}
    <Supporter {correct} />
{:else if position === Position.Defender}
    <Defender {correct} />
{/if}
