<script lang="ts">
    import { DisabledBack } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct;
</script>

<GuessIcon {correct} viewBox="0 0 217 153" title="Super Super Rare">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M161.5 4L136 150H159.5L170 91H173V150H196.5L195 87.5L207 79L217 17.5L207 4H161.5ZM181.5 25L173 70.5H185L192.5 25H181.5Z"
        fill={correct ? "#6C6C6C" : DisabledBack} />
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M156 0L130.5 146H154L164.5 87H167.5V146H191L189.5 83.5L201.5 75L211.5 13.5L201.5 0H156ZM176 21L167.5 66.5H179.5L187 21H176Z"
        fill={correct ? "url(#ssr-url)" : "url(#ssr-off)"} />
    <path
        d="M143 52H121L123 29L119.5 25.5L115 29L109 69H128L137.5 79.5L128 140.5L115 152.5H82.5L72 138L77 107H99.5L96 132H106.5L112.5 89H94.5L82.5 76L92 19L106.5 6H137.5L148 19L143 52Z"
        fill={correct ? "#6C6C6C" : DisabledBack} />
    <path
        d="M138 46H116L118 23L114.5 19.5L110 23L104 63H123L132.5 73.5L123 134.5L110 146.5H77.5L67 132L72 101H94.5L91 126H101.5L107.5 83H89.5L77.5 70L87 13L101.5 0H132.5L143 13L138 46Z"
        fill={correct ? "url(#ssr-url)" : "url(#ssr-off)"} />
    <path
        d="M76 52H54L56 29L52.5 25.5L48 29L42 69H61L70.5 79.5L61 140.5L48 152.5H15.5L5 138L10 107H32.5L29 132H39.5L45.5 89H27.5L15.5 76L25 19L39.5 6H70.5L81 19L76 52Z"
        fill={correct ? "#6C6C6C" : DisabledBack} />
    <path
        d="M71 46H49L51 23L47.5 19.5L43 23L37 63H56L65.5 73.5L56 134.5L43 146.5H10.5L0 132L5 101H27.5L24 126H34.5L40.5 83H22.5L10.5 70L20 13L34.5 0H65.5L76 13L71 46Z"
        fill={correct ? "url(#ssr-url)" : "url(#ssr-off)"} />
</GuessIcon>
