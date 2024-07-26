<script lang="ts">
    import Navbar from "$components/Navbar.svelte";
    import "$style/global.scss";
</script>

<div class="content">
    <Navbar />

    <slot />
</div>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
    }
</style>
