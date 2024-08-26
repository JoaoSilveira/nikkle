<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Burst One">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#313231"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9102L88.7676 17.3206L162.535 59.9102V145.09L88.7676 187.679L15 145.09V59.9102ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM109 56H66V72H78V135H66V151H109V135H98V72H109V56Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
