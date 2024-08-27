<script lang="ts">
    import { DisabledBack, DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 178 205" title="Electric - Z.E.U.S.">
    <path
        d="M15 59.9103L88.7676 17.3205L162.535 59.9103V145.09L88.7676 187.679L15 145.09V59.9103Z"
        fill={!correct ? DisabledBack : "#310030"} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 59.9102L88.7676 17.3203L162.535 59.9102V145.09L88.7676 187.68L15 145.09V59.9102ZM88.7676 0L177.535 51.25V153.75L88.7676 205L0 153.75V51.25L88.7676 0ZM98.2759 30.5464C98.7944 29.5371 100.327 30.0347 100.154 31.1562L91.1082 89.6333L121.111 89.6348C121.859 89.6348 122.343 90.4263 122.001 91.0918L78.8367 175.109C78.3181 176.118 76.7854 175.621 76.9589 174.499L86.0043 116.022L56.0012 116.021C55.2532 116.021 54.77 115.229 55.1118 114.563L98.2759 30.5464Z"
        fill={!correct ? DisabledTint : "#fe00fb"} />
</GuessIcon>
