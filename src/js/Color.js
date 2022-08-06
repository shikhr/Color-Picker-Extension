import { Alert } from './Alert.js';

export class Color extends Alert {
  constructor(id, value) {
    super();
    this.id = id;
    this.value = value;
    const templateElement = document.getElementById('color-template');
    this.hostElement = document.querySelector('.palette');
    const importedNode = document.importNode(templateElement.content, true);
    this.element = importedNode.firstElementChild;
    this.configure();
  }
  configure() {
    this.element.querySelector('#color-value').value = this.value;
    this.element.querySelector('#color-wrapper').style.background = this.value;
    this.element.querySelector('#label-value').textContent = this.value;
    this.element
      .querySelector('#color-value-label')
      .addEventListener('click', () => {
        this.copyToClipboard(this.value);
      });
  }

  attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}
