MAX_INDEX = 649;  // pokedex  number of last pokemon in gen5

console.log("LeetMon extension loaded!");
class Pokemon {
  constructor(id, name, front, back) {
    this.id = id;
    this.name = name;
    this.front = front;
    this.back = back;
    this.captureDate = null;
    // maybe: also save the problem that you got it from?
  }

  static async create(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    let gifs = data.sprites.versions['generation-v']['black-white']['animated']
    return new Pokemon(id, data.name, gifs['front_default'], gifs['back_default']);
  }

  capture() {
    console.log('capture!');
    this.captureDate = new Date();
    chrome.storage.local.get({ caughtPokemon: [] }, (data) => {
      const updated = data.caughtPokemon;
      updated.push(this);
      chrome.storage.local.set({ caughtPokemon: updated });
    });
  }
}

async function getRandomPokemon() {
  const id = Math.ceil(Math.random() * MAX_INDEX);
  return await Pokemon.create(id);
}

async function addPokemon() {
  const pokemon = await getRandomPokemon();
  const sprite = document.createElement("img");
  sprite.className = "sprite";
  sprite.src = pokemon.front;
  console.log(pokemon);
  document.body.appendChild(sprite);
  pokemon.capture();
  console.log(pokemon);
  return pokemon;
}

function watchForSubmissions(pokemon) {
  const targetNode = document.body;
  const observer = new MutationObserver(() => {
    const resultEl = document.querySelector('span[data-e2e-locator="submission-result"]');
    if (resultEl && resultEl.textContent.includes("Accepted")) {
      console.log("problem successfully solved!");
      pokemon.capture();
    }
  });

  observer.observe(targetNode, { childList: true, subtree: true });
}

console.log(test)
const pokemon = addPokemon();
watchForSubmissions(pokemon);