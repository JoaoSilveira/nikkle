<script>
    import { DisabledTint } from "$lib/const";
    import GuessIcon from "./GuessIcon.svelte";

    export let correct = false;
</script>

<GuessIcon {correct} viewBox="0 0 241 179" title="Rocket Launcher">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28 0H0V18H28V28V46H45H69V28H45V18V0H28ZM69 63H28V81H69V63ZM0 179H28H45V161V151H69V133H45H28V151V161H0V179ZM69 98H28V116H69V98ZM139 89.5C139 99.7173 130.717 108 120.5 108C110.283 108 102 99.7173 102 89.5C102 79.2827 110.283 71 120.5 71C130.717 71 139 79.2827 139 89.5ZM241 0H213H196V18V28H172V46H196H213V28V18H241V0ZM213 63H172V81H213V63ZM213 179H241V161H213V151V133H196H172V151H196V161V179H213ZM213 98H172V116H213V98Z"
        fill={!correct ? DisabledTint : "white"} />
</GuessIcon>
