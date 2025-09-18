import { Pokemon } from "@/components/pokemon";
import * as helpers from "@/components/helpers";
import './style.css';

export default defineContentScript({
  matches: ['*://*.google.com/', 'https://leetcode.com/problems/*'],
  async main() {
    console.log("LeetMon extension loaded!");
    
    const pokemon: Pokemon = await helpers.getRandomPokemon();
    helpers.animateOpening(pokemon);
    const submitBtn = document.querySelector('button[data-e2e-locator="console-submit-button"]')!;
    submitBtn.addEventListener('click', () => helpers.watchForSubmissions(pokemon));
  },
});
