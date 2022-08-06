export class Helper {
  #alertElement;
  constructor() {
    this.#alertElement = document.getElementById('alert');
  }
  pushAlert(message) {
    this.#alertElement.textContent = message;
    this.#alertElement.classList.remove('hidden');
    this.#alertElement.classList.add('slide-anim');
    setTimeout(() => {
      this.#alertElement.classList.add('hidden');
      this.#alertElement.classList.remove('slide-anim');
    }, 1000);
  }
  copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(
      () => {
        this.pushAlert('Copied');
      },
      () => {
        alert('Failed to copy!');
      }
    );
  }
}
