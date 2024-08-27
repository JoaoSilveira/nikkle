<script lang="ts">
    import { Code } from "$lib/nikke";
    import Electric from "./Electric.svelte";
    import Fire from "./Fire.svelte";
    import Iron from "./Iron.svelte";
    import Water from "./Water.svelte";
    import Wind from "./Wind.svelte";

    export let code: Code;
    export let correct: boolean = false;
</script>

{#if code === Code.Electric}
    <Electric correct={correct} />
{:else if code === Code.Fire}
    <Fire correct={correct} />
{:else if code === Code.Iron}
    <Iron correct={correct} />
{:else if code === Code.Water}
    <Water correct={correct} />
{:else if code === Code.Wind}
    <Wind correct={correct} />
{/if}
