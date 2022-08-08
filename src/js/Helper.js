export class Helper {
  #alertElement;
  #timeout;
  constructor() {
    const alertTemplate = document.getElementById('alert-template');
    const importedNode = document.importNode(alertTemplate.content, true);
    this.#alertElement = importedNode.firstElementChild;
  }
  pushAlert(message) {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
      this.#timeout = setTimeout(() => {
        this.#alertElement.remove();
      }, 1000);
    }
    this.#alertElement.textContent = message;
    document
      .querySelector('main')
      .insertAdjacentElement('afterbegin', this.#alertElement);

    this.#timeout = setTimeout(() => {
      this.#alertElement.remove();
    }, 1000);
  }
  copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(
      () => {
        this.pushAlert('Copied');
      },
      () => {
        this.pushAlert('Failed to copy!');
      }
    );
  }
  getRandomId() {
    return Math.random().toString() + new Date().toISOString();
  }
}
