import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import pokeballUrl from '@/assets/pokeball.png';
import sparkleUrl from '@/assets/sparkle.png';

gsap.registerPlugin(MotionPathPlugin);

const MAX_INDEX: number = 649;

export async function getRandomPokemon(): Promise<Pokemon> {
  const id = Math.ceil(Math.random() * MAX_INDEX);
  return await Pokemon.create(id);
}

export function animateOpening(pokemon: Pokemon) {
  const sprite = document.createElement("img");
  sprite.className = "sprite";
  sprite.src = pokemon.front;
  document.body.appendChild(sprite);
  
  const text = document.createElement("p");
  text.textContent = `Oh! You encountered a wild ${pokemon.name.toUpperCase()}. Submit a solution to try and catch it!`;
  text.className = "openingText";
  document.body.appendChild(text);

  // animate pokemon walking in
  const tl = gsap.timeline();
  tl.to(sprite, {
    x: "-=100",
    duration: 3,
  })
  .to(text, {
    opacity: 1,
    duration: 0,
  })
  .to(text, {
    delay: 10,
    opacity: 0,
    duration: 1
  })
}

export function animatePokemonFleeing(pokemon: Pokemon) {
  console.log('flee')
  // sprite src = back
  // sprite moves out of screen
  // text
}

export function animateThrowPokeball(pokemon: Pokemon) {
  const pokemonSprite = document.getElementsByClassName('sprite')[0];
  const pokeball = document.createElement("img");
  pokeball.src = pokeballUrl;
  pokeball.className = 'pokeball';
  document.body.appendChild(pokeball);

  const sparkle = document.createElement("img");
  sparkle.src = sparkleUrl;
  sparkle.className = 'sparkle';
  document.body.appendChild(sparkle);

  const successText = document.createElement("p");
  successText.textContent = `Gotcha!\n${pokemon.name.toUpperCase()} was caught!`
  successText.className = 'text successText';
  document.body.appendChild(successText);

  const pokedexText = document.createElement("p");
  pokedexText.textContent = `${pokemon.name.toUpperCase()}'s data was added to your Pokédex`
  pokedexText.className = 'text pokedexText';
  document.body.appendChild(pokedexText);


  let tl = gsap.timeline();
  tl.to(pokeball, {
    duration: 0.8,
    motionPath: {
      path: [
        { x: 0, y: 0 },
        { x: 100, y: -300 },
        { x: 200, y: -100 }
      ],
      curviness: 1.5
    },
    rotation: 720,
    ease: "power1.inOut"
  })
  .to(pokemonSprite, {
    scale: 0,
    duration: 0.2
  })
  .to(pokeball, {
    y: "-40",
    duration: 0.5,
    ease: "bounce.out"
  })
  .to(pokeball, {
    delay: 0.6,
    rotation: "+=40",
    x: "+=5",
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power4.out"
  })
  .to(pokeball, {
    delay: 0.8,
    rotation: "-=40",
    x: "-=5",
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power4.out"
  })
  .to(pokeball, {
    delay: 0.5,
    filter: 'brightness(0.3)',
    duration: 0.3
  })
  .to(sparkle, {
    scale: 50,
    y: "-=30",
    duration: 0.5,
  }, "-=0.1")
  .to(sparkle, {
    duration: 0.8,
    ease: "power2.out",
    opacity: 0,
    y: "+=5"
  }, "-=0.2")
  .to(successText, {
    opacity: 1,
    duration: 0,
  })
  .to(successText, {
    delay: 2,
    opacity: 0,
    duration: 1,
  })
  .to(pokedexText, {
    opacity: 1,
    duration: 0,
  })
  .to(pokedexText, {
    delay: 2,
    opacity: 0,
    duration: 1,
  })
  .to(pokeball, {
    opacity: 0,
    duration: 3
  })
  
}
