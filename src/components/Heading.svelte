<script lang="ts">
    import { correct, ended } from "$stores/guess-the-nikke";
</script>

<div class="heading">
    <img
        id="logo"
        alt="nikkle: your daily nikke"
        src="/images/ui/nikke-logo.png" />

    <div class="nikke-thumb">
        {#if $ended}
            <img
                alt={$correct.name}
                src={$correct.image_url}
                title={$correct.name} />
        {:else}
            <img
                class="unknown"
                alt="unknown nikke"
                src="/images/ui/qmark.png"
                title="Guess todays nikke" />
        {/if}
    </div>
</div>

<style lang="scss">
    @import "../style/var";

    .heading {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    #logo {
        display: block;
        width: 100%;
        max-width: 350px;
        align-self: center;
    }

    .nikke-thumb {
        $size: 120px;

        display: flex;
        align-items: center;
        justify-content: center;
        width: $size;
        height: $size;
        border: 3px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;

            &.unknown {
                margin-left: 12px;
                padding: 8px;
            }
        }
    }
</style>
