<script lang="ts">
    import { Weapon } from "$lib/nikke";
    import AssaultRifle from "./AssaultRifle.svelte";
    import MachineGun from "./MachineGun.svelte";
    import RocketLauncher from "./RocketLauncher.svelte";
    import Shotgun from "./Shotgun.svelte";
    import SniperRifle from "./SniperRifle.svelte";
    import SubmachineGun from "./SubmachineGun.svelte";

    export let weapon: Weapon;
    export let correct: boolean = false;
</script>

{#if weapon === Weapon.AssaultRifle}
    <AssaultRifle {correct} />
{:else if weapon === Weapon.MachineGun}
    <MachineGun {correct} />
{:else if weapon === Weapon.RocketLauncher}
    <RocketLauncher {correct} />
{:else if weapon === Weapon.Shotgun}
    <Shotgun {correct} />
{:else if weapon === Weapon.SniperRifle}
    <SniperRifle {correct} />
{:else if weapon === Weapon.SubmachineGun}
    <SubmachineGun {correct} />
{/if}
