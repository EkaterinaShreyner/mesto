export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._arrayItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._arrayItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }

  addNewItem(item) {
    this._container.prepend(item);
  }

}