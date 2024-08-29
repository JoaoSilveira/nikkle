import { Burst, Code, Manufacturer, Rarity, Weapon } from '../src/lib/nikke';
import { Result } from './result';

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
