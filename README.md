# 🧙🏻‍♂️Artifacts Controller 🎮
### Basic JS controller for [Artifacts MMORPG](https://www.artifactsmmo.com/)

Use `.env.example` to populate a `.env` file with your token and character name, but the `API_BASE_URL` can stay the same
Run `npm i` in root to install dependencies

Call different functions from the CLI, each endpoint can take in a character name to override the one in the `.env` file easily.
Commands might look like `node action/move.js character=Fart x=2 y=1`, but each different file should have an example at the top of how it might be used! 

Check out the `package.json` file for some more scripts I included to make actions a little easier too! Commands like `npm run gather10` to gather 10 of something (with cooldown, logging and error handling, ooh!)

Single count actions supported so far:
- Move (`x` and`y` args)
- Basic POST actions without an HTTP body:
  - Rest
  - Gathering
  - Fight
- Crafting (item `code` arg)
- Unequip (`slot` arg)
- Equip (item `code` and `slot` args)
- Delete (item `code` and `count` args)
- Recycle (item `code` and `count` args)
- Use (item `code` and `count` args)

Action loops supported so far:
- Basic actions:
  - Rest
  - Gathering
  - Fight
- Fight & Rest 

Artifact's returned error statuses aren't the most helpful, so having [these docs in particular](https://api.artifactsmmo.com/docs/#/) to accompany you helps debug. Turns out there just wasn't enough wood in my inventory to craft and not a genuine 478 status error.

Have funnnnnnnn 

![Screenshot 2025-02-24 at 9 05 24 PM](https://github.com/user-attachments/assets/8fc93922-6d96-428f-bfab-aaa826550cd4)
