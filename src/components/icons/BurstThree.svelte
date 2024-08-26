<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Burst Three">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#313231"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9102L88.7676 17.3206L162.535 59.9102V145.09L88.7676 187.679L15 145.09V59.9102ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM68 57H38V72.3264H49.4948V132.674L38 132.674V148H68H79.1895H98H109.189H139.189V132.674L128.653 132.674V72.3264H139.189V57H109.189H98H79.1895H68ZM109.495 72.3264V132.674L109.189 132.674L98.6527 132.674V72.3264H109.189H109.495ZM79.4948 72.3264V132.674L79.1895 132.674L68.6527 132.674V72.3264H79.1895H79.4948Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
