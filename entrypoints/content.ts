import { browser } from "wxt/browser";
import { Pokemon } from "../components/pokemon";
import './style.css';
import pokeballUrl from '~/assets/pokeball.png';

export default defineContentScript({
  matches: ['*://*.google.com/*', 'https://leetcode.com/problems/*'],
  async main() {
    const MAX_INDEX = 649;  // pokedex  number of last pokemon in gen5
    // bc they don't have gifs for pokemon after gen5

    console.log("LeetMon extension loaded!");


    async function getRandomPokemon() {
      const id = Math.ceil(Math.random() * MAX_INDEX);
      return await Pokemon.create(id);
    }

    async function addPokemon() {
      const pokemon = await getRandomPokemon();
      const sprite = document.createElement("img");
      sprite.className = "sprite";
      sprite.src = pokemon.front;
      document.body.appendChild(sprite);
      pokemon.capture();
      return pokemon;
    }

    function watchForSubmissions(pokemon: Pokemon) {
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

    function throwPokeball() {
      const pokeball = document.createElement("img");
      pokeball.src = pokeballUrl;
      pokeball.className = 'pokeball';
      document.body.appendChild(pokeball);
    }

    const pokemon = await addPokemon();
    watchForSubmissions(pokemon);
    throwPokeball();
  },
});
