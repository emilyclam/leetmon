import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import pokeballUrl from '@/assets/pokeball.png';
import sparkleUrl from '@/assets/sparkle.png';

gsap.registerPlugin(MotionPathPlugin);

// should i create a helper function for creating text? since it's the same 4 lines repeated...

export function opening(pokemon: Pokemon) {
  const sprite = document.createElement("img");
  sprite.id = "sprite";
  sprite.src = pokemon.front;
  document.body.appendChild(sprite);
  
  const text = document.createElement("p");
  text.textContent = `Oh! You encountered a wild ${pokemon.name.toUpperCase()}. Submit a solution to try and catch it!`;
  text.className = "pokemonText";
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
  .then(() => {
    text.remove();
  });
}

export function pokemonFleeing(pokemon: Pokemon) {
  const pokemonSprite = document.getElementById('sprite') as HTMLImageElement;
  pokemonSprite.src = pokemon.back;

  const fleeText = document.createElement("p");
  fleeText.textContent = `Oh no! The wild ${pokemon.name.toUpperCase()} fled!`;
  fleeText.className = 'pokemonText';
  fleeText.style.opacity = '0';
  document.body.appendChild(fleeText);

  let tl = gsap.timeline();
  tl.to(pokemonSprite, {
    delay: 1,
    x: "+=200",
    duration: 3
  })
  .to(fleeText, {
    opacity: 1,
    duration: 0
  }, "-=2")
  .to(fleeText, {
    delay: 2,
    opacity: 0,
    duration: 1,
  })
  .then(() => {
    pokemonSprite.remove();
    fleeText.remove();
  });
  
}

export function throwPokeball(pokemon: Pokemon) {
  const pokemonSprite = document.getElementById('sprite');
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
  successText.className = 'pokemonText';
  document.body.appendChild(successText);

  const pokedexText = document.createElement("p");
  pokedexText.textContent = `${pokemon.name.toUpperCase()}'s data was added to your Pokédex`
  pokedexText.className = 'pokemonText';
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
  .then(() => {
    pokemonSprite?.remove();
    pokeball.remove();
    sparkle.remove();
    successText.remove();
    pokedexText.remove();
  });
  
}
