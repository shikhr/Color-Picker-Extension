export class Alert {
  #message = '';
  #element;
  constructor() {
    this.#element = document.getElementById('alert');
  }
  pushAlert() {
    this.#element.classList.remove('hidden');
    this.#element.classList.add('slide-anim');
    setTimeout(() => {
      this.#element.classList.add('hidden');
      this.#element.classList.remove('slide-anim');
    }, 1000);
  }
  copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(
      () => {
        this.pushAlert();
      },
      () => {
        alert('Failed to copy!');
      }
    );
  }
}
