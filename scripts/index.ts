import { type HTMLElement } from 'node-html-parser';
import { Burst, Code, Manufacturer, Nikke, Position, Rarity, Weapon } from '../src/lib/nikke';
import { fetchHtml, downloadImage, elementChildren, firstElementChild, walk } from './html-utils';

type Nikke = {
    'list-entry': {
        name: string;
        url: string;
        image_url: string;
    };
    'extracted': {
        name: string;
        rarity: Rarity;
        burst: Burst;
        weapon_name: string | undefined;
        squad: string;
        code: Code;
        weapon_type: Weapon;
        position: Position;
        manufacturer: Manufacturer;
    };
};

function extractNikkeList(document: HTMLElement): Nikke['list-entry'][] {
    const nikkes: Nikke['list-entry'][] = [];
    let groupActive = false;
    let container = Result
        .FromNullish(document.querySelector('div.lcs-container'), "cannot find 'div.lcs-container' in document")
        .flatMap(walk('$$'))
        .map(children);

    for (const card of container.orDefault([])) {
        const link = walk('vv')(card).mapErr(e => 'could not find <a>: ' + e);
        const img = link.flatMap(firstChild);

        const result = makeObj({
            name: img
                .mapErr(err => 'missing <img>: ' + err)
                .flatMap(e => Result.FromNullish(e.attrs['alt'], 'missing "alt" attribute on image tag')),
            url: link
                .mapErr(err => 'missing <a>: ' + err)
                .flatMap(e => Result.FromNullish(e.attrs['href'], 'missing "href" attribute on link'))
                .map(href => 'https://nikke-goddess-of-victory-international.fandom.com' + href),
            image_url: img
                .mapErr(err => 'missing <img>: ' + err)
                .flatMap(e => Result.FromNullish(e.attrs['data-src'] ?? e.attrs['src'], 'could not find image url'))
                .map(url => url.substring(0, url.indexOf('/revision/latest/'))),
        });

        if (result.isOk)
            nikkes.push(result.unwrap());
        else {
            groupActive = true;
            console.group('extract nikke list');
            console.error(result.unwrapErr());
        }
    }

    if (groupActive)
        console.groupEnd();

    return nikkes;
}

type ExtractErr = Partial<
    Record<keyof Omit<Nikke['extracted'], 'weapon_name'>, string>
>;
function extractNikke(document: HTMLElement): Result<Nikke['extracted'], ExtractErr> {
    const [tb1, tb2] = document.querySelectorAll('.pi-horizontal-group');

    const obj = {
        name: Result
            .FromNullish(
                document.querySelector('[data-source=title]'),
                'could not find [data-source=title] in document'
            )
            .map(e => e.textContent),
        rarity: walk('$vvvvv')(tb1)
            .flatMap(e => Result.FromNullish(e.attrs['alt'], 'missing "alt" attribute'))
            .flatMap(parseRarity),
        burst: walk('$v$vvv')(tb1)
            .flatMap(e => Result.FromNullish(e.attrs['alt'], 'missing "alt" attribute'))
            .flatMap(parseBurst),
        weapon_name: Result
            .FromNullish(
                document.querySelector('[data-source=weaponname]'),
                'could not find [data-source=weaponname] in document'
            )
            .flatMap(lastChild)
            .map((e): string | undefined => e.textContent)
            .orDefault(undefined),
        squad: Result
            .FromNullish(
                document.querySelector('[data-source=squad]'),
                'could not find [data-source=squad] in document'
            )
            .flatMap(lastChild)
            .map((e): string => e.textContent),
        code: walk('$vvvv')(tb2)
            .flatMap(e => Result.FromNullish(e.attrs['title'], 'missing "title" attribute'))
            .flatMap(parseCode),
        weapon_type: walk('$vv>vv')(tb2)
            .flatMap(e => Result.FromNullish(e.attrs['title'], 'missing "title" attribute'))
            .flatMap(parseWeapon),
        position: walk('$v$<vv')(tb2)
            .flatMap(e => Result.FromNullish(e.attrs['title'], 'missing "title" attribute'))
            .flatMap(parsePosition),
        manufacturer: walk('$v$vv')(tb2)
            .flatMap(e => Result.FromNullish(e.attrs['title'], 'missing "title" attribute'))
            .flatMap(parseManufacturer),
    };
    return makeObj(obj);
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
