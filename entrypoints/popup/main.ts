function populateInfoSection(pokemon: Pokemon) {
  const sprite = document.querySelector('#infoSection img')! as HTMLImageElement;
  const name = document.querySelector('#name')!;
  const caughtProblem = document.querySelector('#caughtProblem')!;
  const caughtDate = document.querySelector('#caughtDate')!;
  
  sprite.src = pokemon.front;
  name.textContent = `${pokemon.name}`;
  caughtDate.textContent = `captured on ${pokemon.captureDate!.toString()}`;
}

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
      sprite.addEventListener('click', () => populateInfoSection(caughtPokemon[i]));
      list.appendChild(sprite);
      // later: add onClick to see more details
      // or maybe in the tooltip?
    }

    populateInfoSection(caughtPokemon[0]);
  });
}

populatePokemonList();