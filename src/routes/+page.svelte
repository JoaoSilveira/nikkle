<script lang="ts">
    import { nikkes } from "$lib/nikke";
    import { DailyRandom } from "$lib/random";
    import Autocomplete from "../components/Autocomplete.svelte";
    import Guess from "../components/Guess.svelte";

    const nikkeList = nikkes;
    const rand = new DailyRandom();
    const correct = new DailyRandom().pick(nikkeList);
    let guesses = [];
    let guess;
</script>

<div class="environment column">
    <img
        id="brand-logo"
        src="https://placehold.co/600x200?text=Nikkle"
        alt="Nikkle: the daily nikke"
        title="Nikkle: the daily nikke" />
    <div class="row">
        <Autocomplete
            placeholder="Guess the name"
            items={nikkeList}
            getText={(n) => n.name}
            let:item
            bind:value={guess}
            on:input={(evt) => {
                guesses = [evt.detail, ...guesses];
                guess = null;
            }}>
            <div class="dropdown-item">
                <img src={item.image_url} alt={item.name} />
                <p>{item.name}</p>
            </div>
        </Autocomplete>
        <button type="button">Guess</button>
    </div>
    <div class="column gap">
        {#each guesses as guess}
            <Guess {guess} {correct} />
        {/each}
    </div>
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .environment {
        max-width: 800px;
        margin-inline: auto;
        padding: 10px;
    }

    .column {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .row {
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    #brand-logo {
        margin-block: 30px;
        object-fit: none;
        object-position: center;
        height: 200px;
    }

    .dropdown-item {
        display: flex;
        flex-direction: 1;
        gap: 13px;
        align-items: center;
    }

    .dropdown-item > img {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        box-shadow:
            rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
            rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    }

    .dropdown-item > p {
        margin: 0;
        padding: 0;
        flex: 1;
        text-align: left;
    }

    .gap {
        gap: 11px;
    }
</style>
