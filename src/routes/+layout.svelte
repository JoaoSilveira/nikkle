<script lang="ts">
    import Navbar from "$components/Navbar.svelte";
    import "$style/global.scss";

    export const prerender = true;
</script>

<div class="content">
    <Navbar />

    <slot />
</div>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        height: 100cqh;
        overflow-y: auto;
    }
</style>
