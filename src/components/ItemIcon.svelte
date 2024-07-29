<script lang="ts">
    import type { DescriptableItem } from "$lib/nikke";

    export let item: DescriptableItem;
    export let correct: boolean;
</script>

<div class="wrap" class:correct>
    <img
        src={item.image_url}
        title={item.description}
        alt={item.description_short} />
</div>

<style lang="scss">
    @use "sass:color";

    .wrap {
        width: 60px;
        height: 60px;

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

            & > img {
                filter: grayscale(100%);
                opacity: .7;
            }
        }
    }

    img {
        width: 54px;
        height: 54px;
        padding: 4px;
        object-fit: contain;
    }
</style>
