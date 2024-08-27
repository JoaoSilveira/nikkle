<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Water - P.S.I.D.">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#001933"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9102L88.7676 17.3203L162.535 59.9102V145.09L88.7676 187.68L15 145.09V59.9102ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM106 119.343C106 134.618 93.4639 147 77.9999 147C62.5359 147 49.9999 134.618 49.9999 119.343C49.9999 104.068 73.0231 59 77.9999 59C81.9323 59 106 104.068 106 119.343ZM127.955 83C127.955 89.0752 123.03 94 116.955 94C110.88 94 105.955 89.0752 105.955 83C105.955 76.9248 115 59 116.955 59C118.5 59 127.955 76.9248 127.955 83Z"
        fill={!correct ? DisabledTint : "#007cfe"} />
</GuessIcon>
