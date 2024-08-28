import { Burst, Code, Manufacturer, Position, Rarity, Weapon } from './nikke-types';
import { Result } from './Result';

/**
 * Parses a rarity string and returns a `Result` object.
 *
 * @param rarity The rarity string to parse (e.g., "R", "Sr", "Ssr").
 * @returns A `Result` object containing the parsed `Rarity` value or an error message if the rarity is unknown.
 */
export function parseRarity(rarity: string): Result<Rarity, string> {
   switch (rarity) {
      case 'R':
         return Result.Ok(Rarity.R);
      case 'Sr':
         return Result.Ok(Rarity.Sr);
      case 'Ssr':
         return Result.Ok(Rarity.Ssr);
      default:
         return Result.Err(`unknown rarity '${rarity}'`);
   }
}

/**
 * Parses a burst string and returns a `Result` object.
 *
 * @param burst The burst string to parse (e.g., "Step1", "Step2", "Step3", "StepAll").
 * @returns A `Result` object containing the parsed `Burst` value or an error message if the burst is unknown.
 */
export function parseBurst(burst: string): Result<Burst, string> {
   switch (burst) {
      case 'Step1':
         return Result.Ok(Burst.I);
      case 'Step2':
         return Result.Ok(Burst.II);
      case 'Step3':
         return Result.Ok(Burst.III);
      case 'StepAll':
         return Result.Ok(Burst.A);
      default:
         return Result.Err(`unknown burst '${burst}'`);
   }
}

/**
 * Parses an element code string and returns a `Result` object.
 *
 * @param code The element code string to parse (e.g., "(Fire)", "(Water)", etc.).
 * @returns A `Result` object containing the parsed `Code` value or an error message if the element code is unknown.
 */
export function parseCode(code: string): Result<Code, string> {
   const element = /\(\w+\)/.exec(code)?.[0];

   switch (element) {
      case '(Fire)':
         return Result.Ok(Code.Fire);
      case '(Water)':
         return Result.Ok(Code.Water);
      case '(Electric)':
         return Result.Ok(Code.Electric);
      case '(Iron)':
         return Result.Ok(Code.Iron);
      case '(Wind)':
         return Result.Ok(Code.Wind);
      default:
         return Result.Err(`unknown element code '${element}'`);
   }
}

/**
 * Parses a weapon string and returns a `Result` object.
 *
 * @param weapon The weapon string to parse (e.g., "Shotgun", "Submachine Gun", etc.).
 * @returns A `Result` object containing the parsed `Weapon` value or an error message if the weapon is unknown.
 */
export function parseWeapon(weapon: string): Result<Weapon, string> {
   switch (weapon) {
      case 'Shotgun':
         return Result.Ok(Weapon.Shotgun);
      case 'Submachine Gun':
         return Result.Ok(Weapon.SubmachineGun);
      case 'Machine Gun':
         return Result.Ok(Weapon.MachineGun);
      case 'Assault Rifle':
         return Result.Ok(Weapon.AssaultRifle);
      case 'Sniper Rifle':
         return Result.Ok(Weapon.SniperRifle);
      case 'Rocket Launcher':
         return Result.Ok(Weapon.RocketLauncher);
      default:
         return Result.Err(`unknown weapon '${weapon}'`);
   }
}

/**
 * Parses a position string and returns a `Result` object.
 *
 * @param position The position string to parse (e.g., "Category:Attackers", "Category:Supporters", etc.).
 * @returns A `Result` object containing the parsed `Position` value or an error message if the position is unknown.
 */
export function parsePosition(position: string): Result<Position, string> {
   switch (position) {
      case 'Category:Attackers':
         return Result.Ok(Position.Attacker);
      case 'Category:Supporters':
         return Result.Ok(Position.Supporter);
      case 'Category:Defenders':
         return Result.Ok(Position.Defender);
      default:
         return Result.Err(`unknown position '${position}'`);
   }
}

/**
 * Parses a manufacturer string and returns a `Result` object.
 *
 * @param manufacturer The manufacturer string to parse (e.g., "Elysion", "Missilis Industry", etc.).
 * @returns A `Result` object containing the parsed `Manufacturer` value or an error message if the manufacturer is unknown.
 */
export function parseManufacturer(manufacturer: string): Result<Manufacturer, string> {
   switch (manufacturer) {
      case 'Elysion':
         return Result.Ok(Manufacturer.Elysion);
      case 'Missilis Industry':
         return Result.Ok(Manufacturer.Missilis);
      case 'Tetra Line':
         return Result.Ok(Manufacturer.Tetra);
      case 'Pilgrim':
         return Result.Ok(Manufacturer.Pilgrim);
      case 'Abnormal':
         return Result.Ok(Manufacturer.Abnormal);
      default:
         return Result.Err(`unknown manufacturer '${manufacturer}'`);
   }
}
















import { NodeType, parse, type HTMLElement } from 'node-html-parser';
import { Result, type FailingMapper } from './Result';

/**
 * Fetches the HTML content of a given URL and parses it into an HTMLElement.
 *
 * @async
 * @param {string} url - The URL of the HTML document to fetch.
 * @returns {Promise<HTMLElement>} A Promise that resolves to the parsed HTMLElement.
 */
export async function fetchHtml(url: string): Promise<HTMLElement> {
   const response = await fetch(url);
   return parse(await response.text());
}

/**
 * Downloads an image from a given URL and saves it to a specified file.
 *
 * @async
 * @param {string} url - The URL of the image to download.
 * @param {string} file - The path to the file where the image will be saved.
 * @returns {Promise<void>} A Promise that resolves when the download is complete.
 */
export async function downloadImage(url: string, file: string): Promise<void> {
   const response = await fetch(url);
   await Bun.write(file, await response.arrayBuffer());
}

/**
 * Returns an array of all child elements of a given HTMLElement.
 *
 * @param {HTMLElement} el - The HTMLElement whose child elements to retrieve.
 * @returns {HTMLElement[]} An array of the child elements.
 */
export function children(element: HTMLElement): HTMLElement[] {
   return element.childNodes
      .filter(c => c.nodeType === NodeType.ELEMENT_NODE) as HTMLElement[];
}

/**
 * Finds the first child element of a given HTML element.
 *
 * @param element The HTML element to search.
 * @returns A `Result` object containing the first child element as a success or an error message if no child element is found.
 */
export function firstChild(element: HTMLElement): Result<HTMLElement, string> {
   for (const child of element.childNodes) {
      if (child.nodeType === NodeType.ELEMENT_NODE)
         return Result.Ok(child as HTMLElement);
   }

   return Result.Err("element has no HTMLElement child");
}

/**
 * Finds the last child element of a given HTML element.
 *
 * @param element The HTML element to search.
 * @returns A `Result` object containing the last child element as a success or an error message if no child element is found.
 */
export function lastChild(element: HTMLElement): Result<HTMLElement, string> {
   for (let i = element.childNodes.length - 1; i >= 0; i--) {
      if (element.childNodes[i].nodeType === NodeType.ELEMENT_NODE)
         return Result.Ok(element.childNodes[i] as HTMLElement);
   }

   return Result.Err("element has no HTMLElement child");
}

/**
 * Defines a function that navigates an HTML element tree based on a given direction string.
 *
 * The direction string can contain the following characters:
 *  - `^`: Move to the parent element.
 *  - `>`: Move to the next sibling element.
 *  - `<`: Move to the previous sibling element.
 *  - `v`: Move to the first child element.
 *  - `$`: Move to the last child element.
 *
 * This function is a `FailingMapper` because it can potentially fail due to missing elements
 * in the navigation path specified by the direction string.
 *
 * @param directions A string containing navigation directions.
 * @returns A function that takes an HTML element and returns a `Result` object.
 *  - The success value is the HTML element reached after navigation.
 *  - The error value is a message indicating the missing element along the path.
 */
export function walk(directions: string): FailingMapper<HTMLElement, HTMLElement, string> {
   return ((el: HTMLElement): Result<HTMLElement, string> => {
      let aux: Result<HTMLElement, string> = Result.Ok(el);

      for (let i = 0; i < directions.length; i++) {
         const dir = directions.charAt(i);

         if (aux.isErr)
            break;

         switch (dir) {
            case '^':
               aux = aux.map(e => e.parentNode);
               break;
            case '>':
               aux = aux.flatMap(e => Result.FromNullish(
                  e.nextElementSibling,
                  `missing next sibling at path '${i === 0 ? 'root' : directions.substring(0, i)}'`
               ));
               break;
            case '<':
               aux = aux.flatMap(e => Result.FromNullish(
                  e.previousElementSibling,
                  `missing previous sibling at path '${i === 0 ? 'root' : directions.substring(0, i)}'`
               ));
               break;
            case 'v':
               aux = aux.flatMap(e => firstChild(e)
                  .mapErr(() => `missing child at path '${i === 0 ? 'root' : directions.substring(0, i)}'`)
               );
               break;
            case '$':
               aux = aux.flatMap(e => lastChild(e)
                  .mapErr(() => `missing child at path '${i === 0 ? 'root' : directions.substring(0, i)}'`)
               );
               break;
         }
      }

      return aux;
   });
}











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