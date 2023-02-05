const characters = require('../src/characters/characters.json')['water']

console.log("Generating code for InitSystem.sol")
console.log(characters);
for (var i = 0; i < characters.length; i++) {
    const c = characters[i];
    console.log(`genCharacter(playerEntity, "${c.name}", "${c.description}", "${c.cid}", gameId);`)
}