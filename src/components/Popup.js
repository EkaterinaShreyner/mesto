class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__button-close');
  }

   open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
   }

   close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
   }
   
   _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      // const popupOpened = document.querySelector('.popup_opened');
      // this.close(popupOpened);
      this.close();
    }
   }

   _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
   }

   setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
   }
}

export default Popup;