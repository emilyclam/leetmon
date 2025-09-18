import { browser } from "wxt/browser";

function populatePokemonList() {
  browser.storage.local.get({ caughtPokemon: [] }, (data) => {
    const caughtPokemon = data.caughtPokemon;
    const list = document.getElementsByClassName('pokemonList')[0];
    if (caughtPokemon.length == 0) {
      const text = document.createElement("p");
      text.textContent = "You haven't caught any pokemon yet. Time to start leetcoding!";
      document.body.append(text);
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