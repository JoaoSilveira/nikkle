<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Iron - D.M.T.R.">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#311c00"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM85.1673 71.75L63.0836 59L41 71.75V97.25L63.0836 110L85.1673 97.25V71.75ZM137.167 71.75L115.084 59L93 71.75V97.25L115.084 110L137.167 97.25V71.75ZM89.5 103L111.584 115.75V141.25L89.5 154L67.4164 141.25V115.75L89.5 103Z"
        fill={!correct ? DisabledTint : "#ff9200"} />
</GuessIcon>
