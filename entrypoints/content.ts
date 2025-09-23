import { Pokemon } from "@/components/pokemon";
import * as helpers from "@/components/helpers";
import './style.css';

export default defineContentScript({
  matches: ['https://leetcode.com/problems/*'],
  async main() {
    console.log("LeetMon extension loaded!");

    await injectScript('/check-submission.js', {
      keepInDom: true,
    });
    
    const pokemon: Pokemon = await helpers.getRandomPokemon();
    helpers.animateOpening(pokemon);

    // Listen for messages from injected script
    window.addEventListener('message', (event) => {
      if (event.source !== window) return; // only accept messages from our page
      if (event.data.type && event.data.type === 'LEETCODE_SUBMISSION') {
        console.log('Submission status:', event.data.status);
        if (event.data.status == "Accepted") {
          console.log('accepted');
          pokemon.capture();
          animateThrowPokeball(pokemon);
        } else {
          console.log('not accepted');
          animatePokemonFleeing(pokemon);
        }
      }
    });
    
  },
});
