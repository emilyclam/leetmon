import { Pokemon } from "@/components/pokemon";
import * as animate from "@/components/animations";
import './style.css';

export default defineContentScript({
  matches: ['https://leetcode.com/problems/*'],
  async main() {
    console.log("LeetMon extension loaded!");

    await injectScript('/check-submission.js', {
      keepInDom: true,
    });
    
    const pokemon: Pokemon = await Pokemon.createRandom();
    animate.opening(pokemon);

    function handleSubmission(event: MessageEvent) {
      if (event.source !== window) return; // only accept messages from our page
        if (event.data.type && event.data.type === 'LEETCODE_SUBMISSION') {
          console.log('Submission status:', event.data.status);
          if (event.data.status == "Accepted") {
            pokemon.capture();
            animate.throwPokeball(pokemon);
          } else {
            animate.pokemonFleeing(pokemon);
          }
          window.removeEventListener('message', handleSubmission);
        }
    }

    // Listen for messages from injected script
    window.addEventListener('message', handleSubmission);
  },
});

