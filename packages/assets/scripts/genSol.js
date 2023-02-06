const characters = require('../src/characters/characters.json')

console.log("Generating code for InitSystem.sol")

for (const [element, elementCharacters] of Object.entries(characters)) {
    console.log(`\n\nGenerating ${element} characters`);
    for (var i = 0; i < elementCharacters.length; i++) {
        const c = elementCharacters[i];
        console.log(`genCharacter(playerEntity, "${c.name}", "${c.description}", "${c.cid}", gameId);`)
    }
}
  