import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import pokeballUrl from '@/assets/pokeball.png';

export async function getRandomPokemon(): Promise<Pokemon> {
  const id = Math.ceil(Math.random() * 649);
  return await Pokemon.create(id);
}

export async function addPokemon(pokemon: Pokemon) {
  const sprite = document.createElement("img");
  sprite.className = "sprite";
  sprite.src = pokemon.front;
  document.body.appendChild(sprite);
  pokemon.capture();
  return pokemon;
}

export function watchForSubmissions(pokemon: Pokemon) {
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

export function throwPokeball() {
  gsap.registerPlugin(MotionPathPlugin);

  const pokeball = document.createElement("img");
  pokeball.src = pokeballUrl;
  pokeball.className = 'pokeball';
  document.body.appendChild(pokeball);

  gsap.to(pokeball, {
    duration: 0.8,
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: 200, y: -150 },
        { x: 400, y: 0 }
      ],
      curviness: 1.5
    },
    rotation: 720,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(pokeball, {
        y: "50",
        duration: 0.5,
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(pokeball, {
            delay: 0.3,
            rotation: "+=40",
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power4.out"
          })
        }
      });
    }
  });
}
