import { Helper } from './Helper.js';

import { colorStore } from './ColorStore.js';

export class Palette extends Helper {
  constructor() {
    super();
    this.element = document.querySelector('.palette');
    this.pickerEle = document.getElementById('picker-button');
    this.clearEle = document.getElementById('clear-palette');
    this.configure();
    colorStore.getStore();
  }
  configure() {
    this.pickerEle.addEventListener('click', () => {
      if (!window.EyeDropper) {
        alert('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();

      eyeDropper
        .open()
        .then((result) => {
          let colorValue = result.sRGBHex;
          // fix because EyeDropper api started returning rgb strings instead of hex
          if (colorValue.match(/^rgb/)) {
            colorValue = this.rgbToHex(colorValue);
          }
          colorStore.addColor(this.getRandomId(), colorValue);
          this.copyToClipboard(colorValue);
          colorStore.scrollToLast();
        })
        .catch((e) => {
          alert(e);
        });
    });
    this.clearEle.addEventListener('click', () => {
      colorStore.clearStore();
    });

    colorStore.addListener((colors) => {
      this.render(colors);
    });
  }
  render(colors) {
    this.element.innerHTML = '';
    colors.forEach((color) => {
      color.attach();
    });
  }
}
