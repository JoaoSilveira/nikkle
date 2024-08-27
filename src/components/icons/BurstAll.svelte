<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Burst All">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#313231"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM111 56H67V72H79.638L51.1963 133H38V149H82V133H71.9091L89.25 93.0756L106.591 133H96V149H140V133H127.304L98.862 72H111V56Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
