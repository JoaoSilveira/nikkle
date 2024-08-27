import { type HTMLElement } from 'node-html-parser';
import { Burst, Code, Manufacturer, Nikke, Position, Rarity, Weapon } from '../src/lib/nikke';
import { fetchHtml, downloadImage, elementChildren, firstElementChild, walk } from './html-utils';

type NikkeListEntry = {
    name: string;
    url: string;
    image_url: string;
};

function parseRarity(rarity: string): Rarity | null {
    switch (rarity) {
        case 'R':
            return Rarity.R;
        case 'Sr':
            return Rarity.Sr;
        case 'Ssr':
            return Rarity.Ssr;
        default:
            return null;
    }
}

function parseBurst(burst: string): Burst | null {
    switch (burst) {
        case 'Step1':
            return Burst.I;
        case 'Step2':
            return Burst.II;
        case 'Step3':
            return Burst.III;
        case 'StepAll':
            return Burst.A;
        default:
            return null;
    }
}

function parseCode(code: string): Code | null {
    const element = /\(\w+\)/.exec(code)?.[0];

    switch (element) {
        case '(Fire)':
            return Code.Fire;
        case '(Water)':
            return Code.Water;
        case '(Electric)':
            return Code.Electric;
        case '(Iron)':
            return Code.Iron;
        case '(Wind)':
            return Code.Wind;
        default:
            return null;
    }
}

function parseWeapon(weapon: string): Weapon | null {
    switch (weapon) {
        case 'Shotgun':
            return Weapon.Shotgun;
        case 'Submachine Gun':
            return Weapon.SubmachineGun;
        case 'Machine Gun':
            return Weapon.MachineGun;
        case 'Assault Rifle':
            return Weapon.AssaultRifle;
        case 'Sniper Rifle':
            return Weapon.SniperRifle;
        case 'Rocket Launcher':
            return Weapon.RocketLauncher;
        default:
            return null;
    }
}

function parsePosition(position: string): Position | null {
    switch (position) {
        case 'Category:Attackers':
            return Position.Attacker;
        case 'Category:Supporters':
            return Position.Supporter;
        case 'Category:Defenders':
            return Position.Defender;
        default:
            return null;
    }
}

function extractNikkeList(document: HTMLElement): NikkeListEntry[] {
    const nikkes: NikkeListEntry[] = [];
    const container = walk(document.querySelector('div.lcs-container'), '$$');

    for (const card of elementChildren(container)) {
        const link = walk(card, 'vv');
        const img = firstElementChild(link);
        const image_url = img.attrs['data-src'] ?? img.attrs['src'];

        nikkes.push({
            name: img.attrs['alt'],
            url: 'https://nikke-goddess-of-victory-international.fandom.com' + link.attrs['href'],
            image_url: image_url.substring(0, image_url.indexOf('/revision/latest/')),
        });
    }

    return nikkes;
}

function extractNikke(document: HTMLElement): Omit<Nikke, 'image_url'> {
    const [tb1, tb2] = document.querySelectorAll('.pi-horizontal-group');

    let rarity = walk(tb1, '$vvvvv')?.attrs['alt'];
    let burst = walk(tb1, '$v$vvv')?.attrs['alt'];

    let code = walk(tb2, '$vvvv')?.attrs['title'];
    let weapon_type = walk(tb2, '$vv>vv')?.attrs['title'];
    let position = walk(tb2, '$v$<vv')?.attrs['title'];
    let manufacturer = walk(tb2, '$v$vv')?.attrs['title'];

    let weapon_name = walk(document.querySelector('[data-source=weaponname]')!, '$')?.textContent;
    let squad = walk(document.querySelector('[data-source=squad]')!, '$')?.textContent;
    let name = document.querySelector('[data-source=title]')?.textContent;

    return {
        name,
        rarity: parseRarity(rarity),
        burst: parseBurst(burst),
        weapon_name,
        squad,
        code: parseCode(code),
        weapon_type: parseWeapon(weapon_type),
        position: parsePosition(position),
        manufacturer,
    };
}

async function fetchNikkeList(): Promise<NikkeListEntry[]> {
    const doc = await fetchHtml('https://nikke-goddess-of-victory-international.fandom.com/wiki/Home');
    return extractNikkeList(doc);
}

async function fetchNikkeData(url: string): Promise<Omit<Nikke, 'image_url'>> {
    const doc = await fetchHtml(url);
    return extractNikke(doc);
}

async function updateData(): Promise<void> {
    const dbFile = Bun.file('./scripts/data/nikke-db.json');
    let db: Nikke[] = [];
    if (await dbFile.exists())
        db = await dbFile.json();

    const list = await fetchNikkeList();
    for (const nikke of list) {
        if (db.some(n => n.name.toLowerCase() === nikke.name.toLocaleLowerCase())) {
            console.log(nikke.name, 'in cache');
            continue;
        }

        console.log('updating', nikke.name);

        const imageFilepath = `./static/images/characters/${nikke.image_url.substring(nikke.image_url.lastIndexOf('/'))}`;
        if (!await Bun.file(imageFilepath).exists()) {
            await downloadImage(nikke.image_url, imageFilepath);
            console.log('image fetched');
        }

        const data = await fetchNikkeData(nikke.url);
        db.push({
            ...data,
            image_url: imageFilepath.substring('./static'.length),
        });
    }

    db.sort((a, b) => a.name.localeCompare(b.name));

    await Bun.write('./scripts/data/nikke-db.json', JSON.stringify(db, null, 2));
}

async function updateTsNikkeList(): Promise<void> {
    const rarities = [
        "Rarity.R",
        "Rarity.Sr",
        "Rarity.Ssr"
    ];
    const bursts = [
        "Burst.I",
        "Burst.II",
        "Burst.III",
        "Burst.A"
    ];
    const codes = [
        "Code.Fire",
        "Code.Water",
        "Code.Electric",
        "Code.Iron",
        "Code.Wind",
    ];
    const weapons = [
        "Weapon.Shotgun",
        "Weapon.SubmachineGun",
        "Weapon.MachineGun",
        "Weapon.AssaultRifle",
        "Weapon.SniperRifle",
        "Weapon.RocketLauncher",
    ];
    const positions = [
        "Position.Attacker",
        "Position.Supporter",
        "Position.Defender",
    ];
    const resolveManufacturer = (manufacturer: string): string => {
        switch (manufacturer) {
            case "Elysion":
                return "Manufacturer.Elysion";
            case "Missilis Industry":
                return "Manufacturer.Missilis";
            case "Tetra Line":
                return "Manufacturer.Tetra";
            case "Pilgrim":
                return "Manufacturer.Pilgrim";
            case "Abnormal":
                return "Manufacturer.Abnormal";
            default:
                throw new Error("Unknown manufacturer: " + manufacturer);
        }
    }

    const dbFile = await Bun.file('./scripts/data/nikke-db.json').json();
    let output =
        `import { Burst, Code, Manufacturer, Position, Rarity, Weapon, type Nikke } from "./utils";

export const nikkes: Nikke[] = [
${dbFile.map(
            n =>
                `    {
        name: "${n.name}",
        image_url: "${n.image_url}",
        rarity: ${rarities[n.rarity]},
        burst: ${bursts[n.burst]},
        weapon_name: ${!!n.weapon_name ? '"' + n.weapon_name + '"' : 'undefined'},
        squad: "${n.squad}",
        code: ${codes[n.code]},
        weapon_type: ${weapons[n.weapon_type]},
        position: ${positions[n.position]},
        manufacturer: ${resolveManufacturer(n.manufacturer)},
    }`
        )
            .join(',\n')
        }
];`;

    await Bun.write('./src/lib/nikke/list.ts', output);
}

await updateData();
await updateTsNikkeList();
