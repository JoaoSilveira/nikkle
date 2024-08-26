<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 152 188" title="Pilgrim">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M76 0L0 75.5L63 188V122.228L52 111.228L76.2279 87L100.456 111.228L88 123.684V188H89L152 75.5L76 0ZM75.5 32.4942L33 74.5L41 88.5L75.75 54.7429L110.5 88.5L118.5 74.5L76 32.4942V32L75.75 32.2471L75.5 32V32.4942Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
