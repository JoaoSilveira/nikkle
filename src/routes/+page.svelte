<script lang="ts">
    import Heading from "../components/Heading.svelte";
    import Autocomplete from "$components/Autocomplete.svelte";
    import {
        guesses,
        max_guesses,
        pushGuess as makeGuess,
    } from "$stores/guess";
    import { nikke } from "$stores/daily";
    import { nikkes } from "$lib/nikke";
    import Guess from "$components/Guess.svelte";
</script>

<div style="display: flex; flex-direction: column;">
    <div class="thumb">
        <Heading />

        <p>{$guesses.length} / {max_guesses} TRIES</p>

        <Autocomplete
            items={nikkes}
            getText={(n) => n.name}
            placeholder="Guess a nikke and start the game..."
            on:input={(evt) => makeGuess(evt.detail)}
            let:item>
            <div class="list-item">
                <img alt={item.name} src={item.image_url} loading="lazy" />
                <p>{item.name}</p>
            </div>
        </Autocomplete>
    </div>

    <div style="max-width: 800px; width: calc(100cqw); align-self: center; gap:4px;display:flex;flex-direction:column;">
        {#each [...$guesses].reverse() as guess (guess.name)}
            <Guess {guess} correct={$nikke} />
        {/each}
    </div>
</div>

<style lang="scss">
    @import "../style/var";

    .list-item {
        display: flex;
        align-items: center;
        gap: 16px;

        & > img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border: 3px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        & > p {
            line-height: 1;
            margin: 0;
            padding: 0;
        }
    }

    p {
        color: $color;
        align-self: center;
        margin-block: 32px 16px;
        font-size: 1.15rem;
    }

    .thumb {
        display: flex;
        flex-direction: column;
        align-self: center;
        max-width: 560px;
        width: calc(100cqw - 32px);
        margin-block: 16px;
        padding: 16px;
        background-color: rgba(0, 0, 0, 0.75);
        box-shadow: 0 0 7px rgba(0, 0, 0, 0.4);
        position: relative;

        &::after {
            content: "";
            position: absolute;
            backdrop-filter: blur(3px);
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
