import { browser } from "wxt/browser";

export class Pokemon {
  public readonly id: number;
  public readonly name: string;
  public readonly front: string;
  public readonly back: string;
  public captureDate: Date | null;

  constructor(id: number, name: string, front: string, back: string) {
    this.id = id;
    this.name = name;
    this.front = front;
    this.back = back;
    this.captureDate = null;
    // maybe: also save the problem that you got it from?
  }

  static async create(id: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    let gifs = data.sprites.versions['generation-v']['black-white']['animated']
    return new Pokemon(id, data.name, gifs['front_default'], gifs['back_default']);
  }

  capture() {
    this.captureDate = new Date();
    browser.storage.local.get({ caughtPokemon: [] }, (data) => {
      const updated = data.caughtPokemon;
      updated.push(this);
      browser.storage.local.set({ caughtPokemon: updated });
    });
  }

  flee() {
    console.log('the pokemon fled!');
    // idt i need this
  }
}