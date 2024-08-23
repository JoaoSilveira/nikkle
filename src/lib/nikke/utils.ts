export type DescriptableItem = {
    description: string;
    description_short: string;
    image_url: string;
}

function item(description: string, description_short: string, filename: string): DescriptableItem {
    return { description, description_short, image_url: `/images/icons/${filename}.png` };
}

export const enum Rarity {
    R = 0,
    Sr = 1,
    Ssr = 2,
}

export const rarities: DescriptableItem[] = [
    item('Rare', 'R', 'R'),
    item('Super Rare', 'SR', 'Sr'),
    item('Super Super Rare', 'SSR', 'Ssr'),
];

export function rarityItem(rarity: Rarity): DescriptableItem {
    return rarities[rarity];
}

export const enum Burst {
    I = 0,
    II = 1,
    III = 2,
    A = 3,
}

export const bursts: DescriptableItem[] = [
    item('One', 'I', 'Step1'),
    item('Two', 'II', 'Step2'),
    item('Three', 'III', 'Step3'),
    item('All', 'Λ', 'StepAll'),
];

export function burstItem(burst: Burst): DescriptableItem {
    return bursts[burst];
}

export const enum Position {
    Attacker = 0,
    Supporter = 1,
    Defender = 2,
}

export const positions: DescriptableItem[] = [
    item("Attacker", "ATK", "Attacker"),
    item("Supporter", "SUP", "Supporter"),
    item("Defender", "DEF", "Defender"),
];

export function positionItem(position: Position): DescriptableItem {
    return positions[position];
}

export const enum Code {
    Fire = 0,
    Water = 1,
    Electric = 2,
    Iron = 3,
    Wind = 4,
}

export const codes: DescriptableItem[] = [
    item("Fire - H.S.T.A.", "HSTA", "Codehsta_hexagon"),
    item("Water - P.S.I.D", "PSID", "Codepsid_hexagon"),
    item("Electric - Z.E.U.S.", "ZEUS", "Codezeus_hexagon"),
    item("Iron - D.M.T.R.", "DMTR", "Codedmtr_hexagon"),
    item("Wind - A.N.M.I.", "ANMI", "Codeanmi_hexagon"),
];

export function codeItem(code: Code): DescriptableItem {
    return codes[code];
}

export const enum Weapon {
    Shotgun = 0,
    SubmachineGun = 1,
    MachineGun = 2,
    AssaultRifle = 3,
    SniperRifle = 4,
    RocketLauncher = 5,
}

export const weapons: DescriptableItem[] = [
    item("Shotgun", "SG", "Icn_weapon_sg"),
    item("Submachine Gun", "SMG", "Icn_weapon_smg"),
    item("Machine Gun", "MG", "Icn_weapon_mg"),
    item("Assault Rifle", "AR", "Icn_weapon_ar"),
    item("Sniper Rifle", "SR", "Icn_weapon_sr"),
    item("Rocket Launcher", "RL", "Icn_weapon_rl"),
];

export function weaponItem(weapon: Weapon): DescriptableItem {
    return weapons[weapon];
}

export const enum Manufacturer {
    Elysion = 0,
    Missilis = 1,
    Tetra = 2,
    Pilgrim = 3,
    Abnormal = 4,
}

export const manufacturers: DescriptableItem[] = [
    item("Elysion", "Elysion", "Elysion_Icon"),
    item("Missilis Industry", "Missilis", "Missilis_Icon"),
    item("Tetra Line", "Tetra", "Tetra_Icon"),
    item("Pilgrim", "Pilgrim", "Pilgrim_Icon"),
    item("Abnormal", "Abnormal", "Abnormal_Icon"),
];

export function manufacturerItem(manufacturer: Manufacturer): DescriptableItem {
    return manufacturers[manufacturer];
}

export type Nikke = {
    name: string,
    image_url: string;
    rarity: Rarity,
    burst: Burst,
    weapon_name?: string,
    squad: string,
    code: Code,
    weapon_type: Weapon,
    position: Position,
    manufacturer: Manufacturer,
};
