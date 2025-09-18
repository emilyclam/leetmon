
function populatePokemonList() {
  console.log("fill pokemon list")
  browser.storage.local.get({ caughtPokemon: [] }, (data) => {
    const caughtPokemon = data.caughtPokemon;
    const list = document.getElementById('pokemonList')!;  // ! = "im sure its not null"
    if (caughtPokemon.length == 0) {
      const text = document.createElement("p");
      text.textContent = "You haven't caught any pokemon yet. Time to start leetcoding!";
      document.body.append(text);
      list.style.display = 'none';
    }
    for (let i = 0; i < caughtPokemon.length; i++) {
      const sprite = document.createElement("img");
      sprite.src = caughtPokemon[i].front;
      sprite.className = 'sprite';
      list.appendChild(sprite);
      // later: add onClick to see more details
      // or maybe in the tooltip?
    }
  });
}

populatePokemonList();