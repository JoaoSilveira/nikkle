<script lang="ts">
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 87 150" title="Rare">
    <defs>
		<linearGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#0056fb" />
            <stop offset="100%" stop-color="#00a7fd" />
		</linearGradient>
		<linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#ccc" />
            <stop offset="100%" stop-color="#808080" />
		</linearGradient>
	</defs>
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31 4L5.5 150H29L39.5 91H42.5V150H66L64.5 87.5L76.5 79L86.5 17.5L76.5 4H31ZM51 25L42.5 70.5H54.5L62 25H51Z"
        fill="#6C6C6C" />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.5 0L0 146H23.5L34 87H37V146H60.5L59 83.5L71 75L81 13.5L71 0H25.5ZM45.5 21L37 66.5H49L56.5 21H45.5Z"
        fill={correct ? "url(#Gradient1)" : "url(#Gradient2)"} />
</GuessIcon>
