<script lang="ts">
    export let correct: boolean;
    export let viewBox: string;
    export let title: string;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    class:correct
    {viewBox}
    fill="none">
    <title>{title}</title>
    <slot />
</svg>

<style lang="scss">
    @use "sass:color";

    svg {
        width: 60px;
        height: 60px;
        padding: 4px;

        &.correct {
            $base: #449b20;
            background-color: color.change($base, $alpha: 0.3);
            border: 3px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 1px
                color.change($base, $alpha: 0.75, $whiteness: 35%);
        }

        &:not(.correct) {
            $base: #ad2f2b;
            background-color: color.change($base, $alpha: 0.3);
            border: 3px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 1px
                color.change($base, $alpha: 0.75, $whiteness: 35%);
        }
    }
</style>
