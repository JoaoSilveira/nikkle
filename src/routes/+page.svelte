<script lang="ts">
    import BurstAll from "$components/icons/BurstAll.svelte";
    import BurstOne from "$components/icons/BurstOne.svelte";
    import BurstThree from "$components/icons/BurstThree.svelte";
    import BurstTwo from "$components/icons/BurstTwo.svelte";
    import Electric from "$components/icons/Electric.svelte";
    import Fire from "$components/icons/Fire.svelte";
    import Iron from "$components/icons/Iron.svelte";
    import Water from "$components/icons/Water.svelte";
    import Wind from "$components/icons/Wind.svelte";

    // import Daily from "./daily/+page.svelte";
    let things = [];
    for (let i = 0; i < 32; i++) {
        things.push(i + 1);
    }
</script>

<!-- <Daily /> -->
<div>
    <BurstAll />
    <BurstOne />
    <BurstTwo />
    <BurstThree />
</div>
<div>
    <BurstAll correct={true} />
    <BurstOne correct={true} />
    <BurstTwo correct={true} />
    <BurstThree correct={true} />
</div>
<div>
    <Wind />
    <Iron />
    <Electric />
    <Water />
    <Fire />
</div>
<div>
    <Wind correct={true} />
    <Iron correct={true} />
    <Electric correct={true} />
    <Water correct={true} />
    <Fire correct={true} />
</div>
<div>
    <Wind />
    <Iron />
    <Electric />
    <Water />
    <Fire />
</div>
<div>
    {#each things as i}
        <img src="/svg/{i}.svg" alt={i.toString()} title={i.toString()} />
    {/each}
</div>

<style>
    div {
        display: flex;
        flex-wrap: wrap;
    }

    img {
        width: 300px;
        height: 300px;
        object-fit: contain;
        border: 3px solid cyan;
        padding: 5px;
    }
</style>
