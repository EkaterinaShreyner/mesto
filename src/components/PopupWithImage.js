import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageFull = this._popup.querySelector('.popup__image-full');
    this._headingFull = this._popup.querySelector('.popup__title_image-full');
  }

  open(item) {
    super.open();
    this._imageFull.src = item.link;
    this._imageFull.alt = item.name;
    this._headingFull.textContent = item.name;
  }
}

export default PopupWithImage;