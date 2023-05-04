import Popup from "./Popup.js";

export default class popupConfirmForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cards) {
    super.open();
    this._card = cards;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._card);
    })
  }
}