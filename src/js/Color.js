import { Helper } from './Helper.js';
import { colorStore } from './ColorStore.js';

export class Color extends Helper {
  #id;
  constructor(id, value) {
    super();
    this.#id = id;
    this.value = value;
    this.hostElement = document.querySelector('.palette');
    const templateElement = document.getElementById('color-template');
    const importedNode = document.importNode(templateElement.content, true);
    this.element = importedNode.firstElementChild;
    this.#setValues();
    this.#configure();
  }
  get id() {
    return this.#id;
  }
  scroll() {
    this.element.scrollIntoView({
      behavior: 'smooth',
    });
  }
  #setValues() {
    this.element.querySelector('.color-value').value = this.value;
    this.element.querySelector('.color-wrapper').style.background = this.value;
    this.element.querySelector('.label-value').textContent = this.value;
  }
  #configure() {
    this.element
      .querySelector('.color-value-label')
      .addEventListener('click', () => {
        this.copyToClipboard(this.value);
      });
    this.element
      .querySelector('.color-value')
      .addEventListener('input', (e) => {
        this.value = e.target.value;
        this.#setValues();
        colorStore.setStore();
      });
    this.element
      .querySelector('.color-value-delete')
      .addEventListener('click', () => {
        colorStore.deleteColor(this.#id);
        this.element.remove();
      });
  }

  attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
