<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 78 187" title="Missilis Industry">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.1628 6.88372L0 0V187H30V45L39 54L48 45V187H78V0L66.8372 6.88372L39 23L11.1628 6.88372Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
