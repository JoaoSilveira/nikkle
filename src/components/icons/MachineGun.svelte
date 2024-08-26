<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 179 179" title="Machine Gun">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M89.5 179C138.929 179 179 138.929 179 89.5C179 40.0705 138.929 0 89.5 0C40.0705 0 0 40.0705 0 89.5C0 138.929 40.0705 179 89.5 179ZM163 89.5C163 130.093 130.093 163 89.5 163C48.9071 163 16 130.093 16 89.5C16 48.9071 48.9071 16 89.5 16C130.093 16 163 48.9071 163 89.5ZM89.5 102C96.4036 102 102 96.4036 102 89.5C102 82.5964 96.4036 77 89.5 77C82.5964 77 77 82.5964 77 89.5C77 96.4036 82.5964 102 89.5 102Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
