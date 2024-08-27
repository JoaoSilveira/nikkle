<script>
	import Burst from "./icons/Burst.svelte";
	import Code from "./icons/Code.svelte";
	import Manufacturer from "./icons/Manufacturer.svelte";
	import Position from "./icons/Position.svelte";
	import Rarity from "./icons/Rarity.svelte";
	import Weapon from "./icons/Weapon.svelte";

	export let guess;
	export let correct;
</script>

<div class="guess">
	<img
		src="/images/characters/small/{guess.image_url}"
		alt={guess.name}
		loading="lazy"
		class:correct={guess.name === correct.name} />

	<p>{guess.name}</p>

	<Rarity
		rarity={guess.rarity}
		correct={guess.rarity === correct.rarity} />
	<Burst burst={guess.burst} correct={guess.burst === correct.burst} />
	<Code code={guess.code} correct={guess.code === correct.code} />
	<Weapon
		weapon={guess.weapon_type}
		correct={guess.weapon_type === correct.weapon_type} />
	<Position
		position={guess.position}
		correct={guess.position === correct.position} />
	<Manufacturer
		manufacturer={guess.manufacturer}
		correct={guess.manufacturer === correct.manufacturer} />
</div>

<style lang="scss">
	.guess {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 11px;
		background-color: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(3px);
		gap: 3px;

		& > p {
			padding-inline: 11px;
			flex: 1;
			white-space: nowrap;
		}

		& > img {
			width: 80px;
			height: 80px;
			object-fit: contain;
			border: 3px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
		}
	}
</style>
