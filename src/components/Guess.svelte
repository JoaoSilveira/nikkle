<script>
	import {
		burstItem,
		codeItem,
		manufacturerItem,
		positionItem,
		rarityItem,
		weaponItem,
	} from "$lib/nikke";
	import ItemIcon from "./ItemIcon.svelte";

	export let guess;
	export let correct;
</script>

<div class="guess">
	<img
		src={guess.image_url}
		alt={guess.name}
		loading="lazy"
		class:correct={guess.name === correct.name} />

	<p class="grow">{guess.name}</p>

	<ItemIcon
		item={rarityItem(guess.rarity)}
		correct={guess.rarity === correct.rarity} />
	<ItemIcon
		item={burstItem(guess.burst)}
		correct={guess.burst === correct.burst} />
	<ItemIcon
		item={codeItem(guess.code)}
		correct={guess.code === correct.code} />
	<ItemIcon
		item={weaponItem(guess.weapon_type)}
		correct={guess.weapon_type === correct.weapon_type} />
	<ItemIcon
		item={positionItem(guess.position)}
		correct={guess.position === correct.position} />
	<ItemIcon
		item={manufacturerItem(guess.manufacturer)}
		correct={guess.manufacturer === correct.manufacturer} />
</div>

<style lang="scss">
	.guess {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		padding: 11px;
		background-color: rgba(255, 255, 255, 0.05);
		gap: 3px;

		& > p {
			padding-inline: 11px;
		}

		& > img {
			width: 50px;
			height: 50px;
			object-fit: contain;
		}
	}

	.grow {
		flex: 1;
	}
</style>
