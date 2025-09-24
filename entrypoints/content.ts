import { Pokemon } from "@/components/pokemon";
import * as animate from "@/components/animations";
import './style.css';

export default defineContentScript({
  matches: ['https://leetcode.com/problems/*'],
  async main() {
    console.log("LeetMon extension loaded!");

    let handler: (event: MessageEvent) => void;
    let problemName: string;
    let pokemon: Pokemon | void;

    problemName = document.title.slice(0, -11);
    pokemon = await encounterPokemon(problemName);
    if (pokemon) {
      handler = run(pokemon);   
    }

    browser.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
      if (msg.type == "NEW_PROBLEM") {
        // delete old items in the dom
        const oldSprite = document.getElementById('sprite');
        oldSprite?.remove();
        window.removeEventListener('message', handler);

        problemName = document.title.slice(0, -11);
        pokemon = await encounterPokemon(problemName);
        if (pokemon) {
          handler = run(pokemon);
        }
      }
    });

    // script to detect new submission results (sends message)
    await injectScript('/check-submission.js', { keepInDom: true });  
  },
});

async function encounterPokemon(problemName: string): Promise<Pokemon | void> {
  const data = await browser.storage.local.get({ encounteredPokemon: {} });
  if (!(problemName in data.encounteredPokemon)) {
    const pokemon = await Pokemon.createRandom();
    const updated = data.encounteredPokemon;
    updated[problemName] = pokemon;
    browser.storage.local.set({ encounteredPokemon: updated });
    return pokemon;
  }
}

function run(pokemon: Pokemon) {
  animate.opening(pokemon);
  const handler = createSubmissionHandler(pokemon);
  window.addEventListener('message', handler);
  return handler;
}

function createSubmissionHandler(pokemon: Pokemon) {
  const handler = (event: MessageEvent) => {
  if (event.source !== window) return; // only accept messages from our page
    if (event.data.type && event.data.type === 'LEETCODE_SUBMISSION') {
      if (event.data.status == "Accepted") {
        pokemon.capture();
        animate.throwPokeball(pokemon);
      } else {
        animate.pokemonFleeing(pokemon);
      }
      window.removeEventListener('message', handler);
    }
  }
  return handler;
}

