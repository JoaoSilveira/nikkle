<script lang="ts">
    import type { DescriptableItem } from "$lib/nikke";

    export let item: DescriptableItem;
    export let correct: boolean;
</script>

<img
    class:correct
    src={item.image_url}
    title={item.description}
    alt={item.description_short}
    loading="lazy" />

<style lang="scss">
    img {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    .correct {
        outline: none;
    }
</style>
