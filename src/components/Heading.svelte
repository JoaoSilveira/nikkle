<script lang="ts">
</script>

<div class="heading">
    <img
        id="logo"
        alt="nikkle: your daily nikke"
        src="/images/ui/nikke-logo.png" />

    <div class="nikke-thumb">
        <img alt="who" src="/images/ui/qmark.png" />
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
        $size: 137px;

        display: flex;
        align-items: center;
        justify-content: center;
        width: $size;
        height: $size;
        padding: 5px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);

        img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            margin-left: 10px;
        }
    }
</style>
