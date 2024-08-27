<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Burst Two">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#313231"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9102L88.7676 17.3206L162.535 59.9102V145.09L88.7676 187.679L15 145.09V59.9102ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM54 60H83.0947H95.1895H124.284V75.3264H113.747V135.674L124.284 135.674V151H95.1895H83.0947H54V135.674L65.4948 135.674V75.3264H54V60ZM84.6527 135.674V75.3264H94.5895V135.674H84.6527Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
