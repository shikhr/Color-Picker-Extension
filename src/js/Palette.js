import { Alert } from './Alert.js';
import { Color } from './Color.js';

export class Palette extends Alert {
  colors = [];
  constructor() {
    super();
    this.element = document.querySelector('.palette');
    this.pickerEle = document.getElementById('picker-button');
    this.clearEle = document.getElementById('clear-palette');
    this.configure();
    this.getStore();
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
          this.addColor(result.sRGBHex);
          this.copyToClipboard(result.sRGBHex);
          this.render();
        })
        .catch((e) => {
          alert(e);
        });
    });
    this.clearEle.addEventListener('click', () => {
      this.clearStore();
    });
  }
  render() {
    this.element.innerHTML = '';
    this.colors.forEach((color) => {
      color.attach();
    });
  }
  addColor(value) {
    const color = new Color(this.getRandomId(value), value);
    this.colorChangeHandler(color);
    this.colors.push(color);
    this.setStore();
  }
  colorChangeHandler(color) {
    color.element
      .querySelector('#color-value')
      .addEventListener('input', (e) => {
        color.value = e.target.value;
        color.configure();
        this.setStore();
      });
    color.element
      .querySelector('#color-value-delete')
      .addEventListener('click', (e) => {
        this.deleteColor(color.id);
        color.element.remove();
      });
  }
  setStore() {
    const colorsList = this.colors.map((color) => {
      return { id: color.id, value: color.value };
    });
    chrome.storage.local.set({ colors: colorsList }, () => {
      console.log('Colors are set to ' + colorsList);
    });
  }
  getStore() {
    chrome.storage.local.get(['colors'], (result) => {
      if (!result.colors) {
        return;
      }
      result.colors.forEach((color) => {
        this.addColor(color.value);
      });
      this.render();
    });
  }
  getRandomId(value) {
    return Math.random().toString() + value;
  }
  clearStore() {
    this.colors = [];
    this.setStore();
    this.render();
  }
  deleteColor(id) {
    const filtered = this.colors.filter((color) => color.id !== id);
    this.colors = filtered;
    this.setStore();
  }
}
