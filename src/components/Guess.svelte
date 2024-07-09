<script>
	export let guess;
	export let correct;

	function rarityDesc(rarity) {
		switch (rarity) {
			case 0:
				return "R";
			case 1:
				return "Sr";
			case 2:
				return "Ssr";
		}
	}

	function burstDesc(rarity) {
		switch (rarity) {
			case 0:
				return "I";
			case 1:
				return "II";
			case 2:
				return "III";
			case 3:
				return "A";
		}
	}

	function codeDesc(rarity) {
		switch (rarity) {
			case 0:
				return "Fire";
			case 1:
				return "Water";
			case 2:
				return "Electric";
			case 3:
				return "Iron";
			case 4:
				return "Wind";
		}
	}

	function weaponTypeDesc(rarity) {
		switch (rarity) {
			case 0:
				return "SG";
			case 1:
				return "SMG";
			case 2:
				return "MG";
			case 3:
				return "AR";
			case 4:
				return "SR";
			case 5:
				return "RL";
		}
	}

	function positionDesc(rarity) {
		switch (rarity) {
			case 0:
				return "ATK";
			case 1:
				return "SUP";
			case 2:
				return "DEF";
		}
	}

	function manufacturerDesc(manufacturer) {
		return manufacturer.split(' ')[0];
	}
</script>

<div class="guess">
	<img
		src={guess.image_url}
		alt={guess.name}
		class:correct={guess.name === correct.name} />
	<p class="grow">{guess.name}</p>
	<img
		class:correct={guess.rarity === correct.rarity}
		src="https://placehold.co/50x50?text={rarityDesc(guess.rarity)}"
		alt={rarityDesc(guess.rarity)}/>
	<img
		class:correct={guess.burst === correct.burst}
		src="https://placehold.co/50x50?text={burstDesc(guess.burst)}"
		alt={burstDesc(guess.burst)}/>
	<img
		class:correct={guess.code === correct.code}
		src="https://placehold.co/50x50?text={codeDesc(guess.code)}"
		alt={codeDesc(guess.code)}/>
	<img
		class:correct={guess.weapon_type === correct.weapon_type}
		src="https://placehold.co/50x50?text={weaponTypeDesc(guess.weapon_type)}"
		alt={weaponTypeDesc(guess.weapon_type)}/>
	<img
		class:correct={guess.position === correct.position}
		src="https://placehold.co/50x50?text={positionDesc(guess.position)}"
		alt={positionDesc(guess.position)}/>
	<img
		class:correct={guess.manufacturer === correct.manufacturer}
		src="https://placehold.co/50x50?text={manufacturerDesc(guess.manufacturer)}"
		alt={guess.manufacturer}/>
</div>

<style lang="scss">
	.guess {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		padding: 11px;
		background-color: rgba(255,255,255, 0.05);
		gap: 3px;

		&>p {
			padding-inline: 11px;
		}

		&>img.correct {
			box-shadow: 0 0 5px 3px green;
		}
	}

	.grow {
		flex: 1;
	}
</style>