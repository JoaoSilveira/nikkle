<script lang="ts">
    import Heading from "../components/Heading.svelte";

    import Autocomplete from "$components/Autocomplete.svelte";
</script>

<div class="thumb column">
    <Heading />

    <p>0 / 6 TRIES</p>

    <Autocomplete />
</div>

<style>
    p {
        color: white;
        align-self: center;
        margin-block: 32px 16px;
        font-size: 1.15rem;
    }

    .thumb {
        align-self: center;
        max-width: 800px;
        width: calc(100cqw - 32px);
        margin-block: 36px;
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
    }

</style>
