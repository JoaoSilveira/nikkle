<script lang="ts">
    import Heading from "../../components/Heading.svelte";
    import Autocomplete from "$components/Autocomplete.svelte";
    import {
        correct,
        ended,
        guessedRight,
        guesses,
        remaining,
        takeGuess,
    } from "$stores/guess-the-nikke";
    import Guess from "$components/Guess.svelte";
    import { onDestroy, onMount } from "svelte";
    import { startDaily } from "$stores/guess-the-nikke";
    import { MaxAttempts } from "$lib/const";
    import { updateGuesses } from "$lib/daily-storage";
    import type { Unsubscriber } from "svelte/store";
    import IconsDefinitions from "$components/icons/IconsDefinitions.svelte";

    onMount(() => {
        startDaily();
        unsub = guesses.subscribe((gs) => {
            updateGuesses(gs);
        });
    });
    onDestroy(() => unsub?.());

    let unsub: Unsubscriber | null = null;
    let nameInput = "";
</script>

<IconsDefinitions />
<div style="display: flex; flex-direction: column;">
    <div class="thumb">
        <Heading />

        <p>{$guesses.length} / {MaxAttempts} TRIES</p>

        {#if $ended}
            {#if $guessedRight}
                <span
                    >Congratulations, it was {$correct.name}! You got it right
                    in {$guesses.length} attempts</span>
            {:else}
                <span>Almost there! {$correct.name} was today's nikke</span>
            {/if}
        {:else}
            <Autocomplete
                items={$remaining}
                getText={(n) => n.name}
                placeholder="Guess a nikke and start the game..."
                bind:value={nameInput}
                on:input={(evt) => {
                    takeGuess(evt.detail);
                    nameInput = "";
                }}
                let:item>
                <div class="list-item">
                    <img alt={item.name} src={item.image_url} loading="lazy" />
                    <p>{item.name}</p>
                </div>
            </Autocomplete>
        {/if}
    </div>

    <div class="guess-panel">
        {#each [...$guesses] as guess (guess)}
            <Guess {guess} correct={$correct} />
        {/each}
    </div>
</div>

<style lang="scss">
    @import "../../style/var";

    .guess-panel {
        max-width: min(800px, 100%);
        padding-inline: 16px;
        padding-bottom: 8px;
        align-self: center;
        gap: 4px;
        overflow-x: auto;
        display: grid;
        grid-auto-rows: auto;
    }

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
