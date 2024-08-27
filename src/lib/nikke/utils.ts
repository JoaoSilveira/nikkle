export const enum Rarity {
    R = 0,
    Sr = 1,
    Ssr = 2,
}

export const enum Burst {
    I = 0,
    II = 1,
    III = 2,
    A = 3,
}

export const enum Position {
    Attacker = 0,
    Supporter = 1,
    Defender = 2,
}

export const enum Code {
    Fire = 0,
    Water = 1,
    Electric = 2,
    Iron = 3,
    Wind = 4,
}

export const enum Weapon {
    Shotgun = 0,
    SubmachineGun = 1,
    MachineGun = 2,
    AssaultRifle = 3,
    SniperRifle = 4,
    RocketLauncher = 5,
}

export const enum Manufacturer {
    Elysion = 0,
    Missilis = 1,
    Tetra = 2,
    Pilgrim = 3,
    Abnormal = 4,
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
