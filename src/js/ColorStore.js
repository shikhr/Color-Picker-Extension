import { Color } from './Color.js';
import { Helper } from './Helper.js';

class ColorStore extends Helper {
  #listeners = [];
  #colors = [];
  static #instance;

  addListener(listenerFn) {
    this.#listeners.push(listenerFn);
  }

  static getInstance() {
    if (this.#instance) {
      return this.#instance;
    } else {
      this.#instance = new ColorStore();
      return this.#instance;
    }
  }
  addColor(id, value) {
    const color = new Color(id, value);
    this.#colors.push(color);
    this.setStore();
    this.renderColors();
  }
  deleteColor(id) {
    const filtered = this.#colors.filter((color) => color.id !== id);
    this.#colors = filtered;
    this.setStore();
    this.renderColors();
  }
  renderColors() {
    this.#updateListeners();
  }
  scrollToLast() {
    this.#colors.at(-1).scroll();
  }

  setStore() {
    const colorsList = this.#colors.map((color) => {
      return { id: color.id, value: color.value };
    });
    chrome.storage.sync.set({ colors: colorsList }, () => {
      console.log('set ' + colorsList);
    });
  }

  getStore() {
    chrome.storage.sync.get(['colors'], (result) => {
      if (!result.colors) {
        return;
      }
      result.colors.forEach((color) => {
        console.log(color.id, color.value);
        this.addColor(color.id, color.value);
      });
      this.renderColors();
    });
  }
  clearStore() {
    this.#colors = [];
    this.setStore();
    this.renderColors();
  }
  #updateListeners() {
    for (const listenerFn of this.#listeners) {
      listenerFn(this.#colors.slice());
    }
  }
}

const colorStore = ColorStore.getInstance();

export { colorStore, ColorStore };
