# WIP

For now the data has been extracted but it is not organized/documented in any way.

## Task List

- Misc
    - [ ] Resize images to _~expected_ size to consume less data
- Documentation
    - [x] Write basic README
    - [ ] Add images to better present the game
    - [ ] Write a PLANNING file to organize, and plan, things out
    - [ ] License?
    - [ ] Contribute?
    - [ ] Guidelines?
- Data extraction
    - [x] Extract meaningful quantity of data
    - [ ] Organize scrapper to run by command line (no source code modifications to perform actions)
    - [ ] Write JSON schema of the data
    - [ ] Document utility functions and exposed CLI
- Game
    - [x] Write seeded PRNG function that changes every day.
    - [ ] Write the game flow
    - [x] Design mobile and desktop user interface
    - [ ] Schematize componentization of UI items
    - [x] Create autocomplete/dropdown component for nikke input
      - [ ] Mobile is a bit cluncky, check it out
    - [ ] ~~Style components to look simmilar to the game~~
    - [x] Persist guesses in `localStorage`

## Future plans

- Add a never ending mode, where the player can play as many times as they want
- Add a share results option (in a way that doesn't spoil the answer)
- Add a mode to guess the _"nikke of the day"_'s weapon name (after finishing the daily mode)
- Add a mode to guess the _"nikke of the day"_'s squad name (after finishing the daily mode)

# Nikkle

*Your daily nikke*

Nikkle is a game where you guess the right nikke. Each attempt will show what's right or wrong with your guess, get it right in 6 attempts and you win!

The name comes from joining the words *nikke* and *wordle* (and sounds like nickel), and the inspiration comes from [Genshindle](https://us.genshindle.com) and [Loldle](https://loldle.net)

## How to play

Start with a random guess, let's say `Snow White`. The game will show you what's right with this guess (it's a SSR, Code Iron, Pilgrim, ..., etc). Make new educated guesses. Rinse and repeat until you get it right or have no attempts left.

# Data

The character data and images are scrapped from the wiki. Fonts come from [skuqre's repo](https://github.com/skuqre/nikke-font-generator)