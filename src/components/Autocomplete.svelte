<script lang="ts" generics="T">
	import { createEventDispatcher } from "svelte";

	export let name = "";
	export let placeholder = "";
	export let items: T[] = [];
	export let value: string = "";
	export let selectedItem: T | null = null;
	export let getText: (item: T) => string;

	const dispatch = createEventDispatcher<{ input: T }>();

	let dropdownPosition: ["up" | "down", "left" | "right"] | null = null;
	let selectedIndex: number | null = null;
	let dropdown: HTMLDivElement | null = null;
	let wrapper: HTMLDivElement | null = null;

	function closeDropdown() {
		dropdownPosition = null;
		selectedIndex = null;
	}

	function openDropdown() {
		checkDialogPosition();
	}

	function valueChange(newValue: T | null) {
		value = !!newValue ? getText(newValue) : "";
		closeDropdown();
	}

	function focusAtIndex(container: HTMLElement, index: number) {
		const element = container.children.item(index);

		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}

	function selectIndex(index: number) {
		const max = filteredItems.length;
		index = index < 0 ? 0 : index;
		index = index >= max ? max - 1 : index;

		selectedIndex = index;
		focusAtIndex(dropdown!, selectedIndex);
	}

	function makeSelection(selectedValue: T) {
		selectedItem = selectedValue;
		value = getText(selectedValue);

		dispatch("input", selectedItem);
		closeDropdown();
		// value = "";
	}

	function inputKeyDown(event: KeyboardEvent) {
		if (event.code === "Escape" || filteredItems.length === 0) {
			closeDropdown();
			return;
		}

		openDropdown();

		switch (event.code) {
			case "ArrowUp":
				selectIndex(selectedIndex == null ? -1 : selectedIndex - 1);
				break;
			case "ArrowDown":
				selectIndex(selectedIndex == null ? 0 : selectedIndex + 1);
				break;
			case "Enter":
				makeSelection(filteredItems[selectedIndex ?? 0]);
				break;
			default:
				return;
		}
		event.preventDefault();
	}

	function checkFocusOut(event: FocusEvent) {
		let target = event.relatedTarget as HTMLElement | null;

		while (target != null) {
			if (target === wrapper) return;

			target = target.parentElement;
		}

		closeDropdown();
	}

	function checkDialogPosition() {
		if (!(dropdown && wrapper)) return;

		const bodyRect = document.body.getBoundingClientRect();
		const dialogRect = dropdown.getBoundingClientRect();
		const inputRect = wrapper.getBoundingClientRect();

		const vertical =
			inputRect.bottom + dialogRect.height <= bodyRect.height
				? "down"
				: "up";
		const horizontal =
			inputRect.left + dialogRect.width <= bodyRect.width
				? "left"
				: "right";

		dropdownPosition = [vertical, horizontal];
	}

	$: filteredItems = items.filter((i) => {
		const t = getText(i).toLowerCase();
		const f = value.toLowerCase();

		return f === "" || t.includes(f);
	});
	$: {
		void filteredItems;
		selectedIndex = null;
	}
	$: valueChange(selectedItem);
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	on:focusin={openDropdown}
	on:focusout={checkFocusOut}>
	<input
		type="text"
		{placeholder}
		{name}
		autocomplete="off"
		bind:value
		on:click={openDropdown}
		on:keydown={inputKeyDown} />

	<div
		bind:this={dropdown}
		class="dialog"
		class:open={dropdownPosition != null}
		class:top={dropdownPosition?.[0] === "up"}
		class:bottom={dropdownPosition?.[0] === "down"}
		class:left={dropdownPosition?.[1] === "left"}
		class:right={dropdownPosition?.[1] === "right"}>
		{#each filteredItems as item, i (item)}
			<button
				tabindex="-1"
				type="button"
				class:selected={i === selectedIndex}
				on:click|stopPropagation={() => makeSelection(item)}>
				<slot {item}>
					<p>{item}</p>
				</slot>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	input {
		display: block;
		width: 100%;
		color: white;
		font-family: "Suit", sans-serif;

		margin: 0;
		padding: 8px 16px;
		font-size: 1rem;
		line-height: 1;
		outline: none;

		background: none;
		border: 3px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);

		&:focus {
			background-color: rgba(255, 255, 255, 0.05);
			border: 3px solid rgba(255, 255, 255, 0.15);
			box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
		}

		&::placeholder {
			font-family: "Suit", sans-serif;
		}
	}

	.wrapper {
		position: relative;
		display: content;

		& > .dialog {
			position: absolute;
			visibility: collapse;
			z-index: 1;
			max-height: min(500px, 40vh);
			min-width: 200px;
			overflow-y: auto;

			width: calc(100% + 2px);

			display: flex;
			flex-direction: column;
			align-items: stretch;
			justify-content: stretch;

			background-color: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(3px);
			&.open {
				visibility: visible;
			}

			&.top {
				bottom: calc(100% + 1px);
			}

			&.bottom {
				top: calc(100% + 1px);
			}

			&.left {
				left: -1px;
			}

			&.right {
				right: -1px;
			}

			& > button {
				border-radius: 0;
				border: none;
				outline: none;
				background-color: transparent;
				margin: 0;
				padding: 10px 5px;

				&:hover, &.selected {
					background-color: rgba(255, 255, 255, 0.1);
				}
			}
		}
	}
</style>
