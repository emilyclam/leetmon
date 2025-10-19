import { browser } from "wxt/browser";

const MAX_INDEX: number = 649;

export class Pokemon {
  public readonly id: number;
  public readonly name: string;
  public readonly front: string;
  public readonly back: string;
  public captureDate: string | null;

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

  static async createRandom() {
    const id = Math.ceil(Math.random() * MAX_INDEX);
    return await Pokemon.create(id);
  }

  static createDateString() {
    const d = new Date();
    const localizedDateTime = d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    return localizedDateTime;
  }

  capture() {
    this.captureDate = Pokemon.createDateString()
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