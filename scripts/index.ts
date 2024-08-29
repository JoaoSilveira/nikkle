import { type HTMLElement } from 'node-html-parser';
import { Burst, Code, Manufacturer, Nikke, Position, Rarity, Weapon } from '../src/lib/nikke';
import { fetchHtml, downloadImage, walk, children, firstChild, lastChild } from './html-utils';
import { makeObj, Result } from './result';
import { parseBurst, parseCode, parseManufacturer, parsePosition, parseRarity, parseWeapon } from './parsers';
import { $ } from 'bun';

const Paths = {
   fandomBase: 'https://nikke-goddess-of-victory-international.fandom.com',
   database: './scripts/data/nikke-db.json',
   imageBase: './static/images/characters',

   get fandomHome(): string {
      return this.urlFromPath('/wiki/Home');
   },

   urlFromPath(path: string): string {
      return this.fandomBase + path;
   },

   imageBig(filename: string): string {
      return this.imageBase + `/big/${filename}`;
   },

   imageSmall(filename: string): string {
      return this.imageBase + `/small/${filename}`;
   },
};

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
      weapon_name?: string;
      squad: string;
      code: Code;
      weapon_type: Weapon;
      position: Position;
      manufacturer: Manufacturer;
   };
   'final': {
      name: string;
      image_url: string;
      rarity: Rarity;
      burst: Burst;
      weapon_name?: string;
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
            .map(Paths.urlFromPath),
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

async function fetchNikkeList(): Promise<Nikke['list-entry'][]> {
   const doc = await fetchHtml(Paths.fandomHome);
   return extractNikkeList(doc);
}

async function fetchNikkeData(url: string): Promise<ReturnType<typeof extractNikke>> {
   const doc = await fetchHtml(url);
   return extractNikke(doc);
}

async function updateImages(url: string, filename: string): Promise<void> {
   const bigPath = Paths.imageBig(filename);
   const bigFile = Bun.file(bigPath);

   if (await bigFile.exists()) {
      return;
   }

   await downloadImage(url, bigPath);
   await $`magick convert "${bigPath}" -resize 80x80 "${Paths.imageSmall(filename)}"`;
}

async function updateData(): Promise<void> {
   const dbFile = Bun.file(Paths.database);
   let db: Nikke['final'][] = [];
   if (await dbFile.exists())
      db = await dbFile.json();

   const list = await fetchNikkeList();
   console.group('Updating nikke list');
   for (const nikke of list) {
      if (db.some(n => n.name.toLocaleLowerCase() === nikke.name.toLocaleLowerCase())) {
         console.log(nikke.name, 'in cache');
         continue;
      }

      console.log('updating', nikke.name);

      const imageFilename = nikke.image_url.substring(nikke.image_url.lastIndexOf('/'));

      await Promise.all([
         updateImages(nikke.image_url, imageFilename),
         fetchNikkeData(nikke.url).then(res => {
            if (res.isOk) {
               db.push({
                  ...res.unwrap(),
                  image_url: imageFilename,
               });
            } else {
               console.error(res.unwrapErr());
            }
         })
      ]);
   }
   console.groupEnd();

   db.sort((a, b) => a.name.localeCompare(b.name));

   await Bun.write(Paths.database, JSON.stringify(db, null, 2));
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
   const manufacturers = [
      "Manufacturer.Elysion",
      "Manufacturer.Missilis",
      "Manufacturer.Tetra",
      "Manufacturer.Pilgrim",
      "Manufacturer.Abnormal",
   ];

   const dbFile = await Bun.file('./scripts/data/nikke-db.json').json() as Nikke['final'][];
   const template = await Bun.file('./list-template.txt').text();

   const items = dbFile.map(n => {
      const lines = [
         `name: "${n.name}"`,
         `image_url: "${n.image_url}"`,
         `rarity: ${rarities[n.rarity]}`,
         `burst: ${bursts[n.burst]}`,
         `weapon_name: "${n.weapon_name}"`,
         `squad: "${n.squad}"`,
         `code: ${codes[n.code]}`,
         `weapon_type: ${weapons[n.weapon_type]}`,
         `position: ${positions[n.position]}`,
         `manufacturer: ${manufacturers[n.manufacturer]}`,
      ].filter(l => !(!n.weapon_name && l.startsWith("weapon_name:")))
         .map(l => '        ' + l)
         .join(',\n');

      return ['    {', lines, '    }'].join('\n');
   }).join(',\n');

   await Bun.write('./src/lib/nikke/list.ts', template.replace('#CONTENTS#', items));
}

await updateData();
await updateTsNikkeList();
