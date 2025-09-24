import { Pokemon } from "@/components/pokemon";
import * as animate from "@/components/animations";
import './style.css';

export default defineContentScript({
  matches: ['https://leetcode.com/problems/*'],
  async main() {
    console.log("LeetMon extension loaded!");

    const problemName = document.title.slice(0, -11);
    let pokemon: Pokemon | void = await getPokemon(problemName);
    if (pokemon) {
      foo(pokemon);
    }

    browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
      if (msg.problemName) {
        // delete old items in the dom
        const oldSprite = document.getElementById('sprite');
        oldSprite?.remove();
        

        console.log(msg.problemName);
        let pokemon = await getPokemon(msg.problemName);
        if (pokemon) {
          foo(pokemon);
        }
      }
    });

    // put everything below into a function, and on startup run it once
    await injectScript('/check-submission.js', {
      keepInDom: true,
    });  
  },
});

async function getPokemon(problemName: string): Promise<Pokemon | void> {
  const data = await browser.storage.local.get({ encounteredPokemon: {} });
  if (!(problemName in data.encounteredPokemon)) {
    const pokemon = await Pokemon.createRandom();
    const updated = data.encounteredPokemon;
    updated[problemName] = pokemon;
    browser.storage.local.set({ encounteredPokemon: updated });
    return pokemon;
  }
}

function foo(pokemon: Pokemon) {
  animate.opening(pokemon);
  window.addEventListener('message', handleSubmission);

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
}

