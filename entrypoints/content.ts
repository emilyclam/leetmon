import { browser } from "wxt/browser";

import { Pokemon } from "@/components/pokemon";
import * as helpers from "@/components/helpers";
import './style.css';

export default defineContentScript({
  matches: ['*://*.google.com/', 'https://leetcode.com/problems/*'],
  async main() {
    const MAX_INDEX = 649;  // pokedex  number of last pokemon in gen5
    // bc they don't have gifs for pokemon after gen5

    console.log("LeetMon extension loaded!");
    
    const pokemon = await helpers.getRandomPokemon();
    helpers.addPokemon(pokemon);
    helpers.watchForSubmissions(pokemon);
    helpers.throwPokeball();
  },
});
