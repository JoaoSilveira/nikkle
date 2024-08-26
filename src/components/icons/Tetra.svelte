<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 179 192" title="Tetra Line">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M90.8971 0H27.8971L10 39H71V146H108V39H143.594L168.5 0H105.5H90.8971ZM18 165H87.5L71 192H0L18 165ZM109 165H178.5L162 192H91L109 165Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
