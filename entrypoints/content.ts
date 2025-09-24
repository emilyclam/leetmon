import { Pokemon } from "@/components/pokemon";
import * as animate from "@/components/animations";
import './style.css';

export default defineContentScript({
  matches: ['https://leetcode.com/problems/*'],
  async main(context) {
    console.log("LeetMon extension loaded!");

    browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.problemName) {
        console.log(msg.problemName);
        // run everything below
      }
    })

    // put everything below into a function, and on startup run it once

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

function foo(problemName: string) {
  browser.storage.local.get({ encounteredPokemon: {} }, (data) => {
    if (problemName in data.encounteredPokemon) {
      // already been to this problem before
      if (data.encounteredPokemon[problemName].captureDate === undefined) {
        // pokemon hasnt been captured before --> still display it
        // run script with pokemon as data.encounteredPokemon[problemName]
      }
    } else {
      // run script as pokemon as a newly generated pokemon
      // also add that to the encounteredpokemon dict in storage
    }
  });
}

