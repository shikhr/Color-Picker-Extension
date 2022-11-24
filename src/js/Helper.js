export class Helper {
  #alertElement;
  #timeout;
  constructor() {
    const alertTemplate = document.getElementById('alert-template');
    const importedNode = document.importNode(alertTemplate.content, true);
    this.#alertElement = importedNode.firstElementChild;
    this.alertCol = {
      dark: '#ffffff',
      light: '#000000',
    };
  }
  pushAlert(message, value = '#000000') {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
      this.#timeout = setTimeout(() => {
        this.#alertElement.remove();
      }, 1000);
    }

    this.#alertElement.textContent = message;
    this.#alertElement.style.background = value;
    this.#alertElement.style.color = this.alertCol[this.lightOrDark(value)];

    document
      .querySelector('main')
      .insertAdjacentElement('afterbegin', this.#alertElement);

    this.#timeout = setTimeout(() => {
      this.#alertElement.remove();
    }, 1000);
  }

  copyToClipboard(value) {
    console.log(this.lightOrDark(value));
    navigator.clipboard.writeText(value).then(
      () => {
        this.pushAlert('Copied', value);
      },
      () => {
        this.pushAlert('Failed to copy!');
      }
    );
  }
  getRandomId() {
    return Math.random().toString() + new Date().toISOString();
  }

  rgbToHex(c) {
    return (
      '#' + c.match(/\d+/g).map((x) => (+x).toString(16).padStart(2, 0)).join``
    );
  }

  lightOrDark(color) {
    let r, g, b;
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +(
        '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    // HSP equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }
}
