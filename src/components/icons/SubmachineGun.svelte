<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 179 178" title="Submachine Gun">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M179 89.5C179 133.293 147.548 169.739 106 177.482V161.141C138.648 153.652 163 124.42 163 89.5C163 48.9071 130.093 16 89.5 16C48.9071 16 16 48.9071 16 89.5C16 124.42 40.3519 153.652 73 161.141V177.482C31.4524 169.739 0 133.293 0 89.5C0 40.0705 40.0705 0 89.5 0C138.929 0 179 40.0705 179 89.5ZM100 88.5C100 94.2991 95.299 99 89.5 99C83.701 99 79 94.2991 79 88.5C79 82.7009 83.701 78 89.5 78C95.299 78 100 82.7009 100 88.5ZM97 107V175H82V107H97Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
