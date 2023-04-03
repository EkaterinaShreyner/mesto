import {initialCards} from './constants.js';
// import {popupImage, imageFull, headingFull} from './index.js';
// import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link
    this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    const cardsTemplate = document.querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardsTemplate;
  }

  createCard() {
    this._item = this._getTemplateCard();
    // this._item.querySelector('.element__image').setAttribute('src', this._link);
    // this._item.querySelector('.element__image').setAttribute('alt', this._name);

    // this._cardElement = this._item.querySelector('.element__image');
    // this._cardElement.src = this._link;
    // this._cardElement.alt = this._name;
    this._item.querySelector('.element__title').textContent = this._name;
    this._item.querySelector('.element__image').src = this._link;
    this._item.querySelector('.element__image').alt = this._name;
    this._cardLikeButton = this._item.querySelector('.element__like');
    this._cardElementDelete = this._item.querySelector('.element__card-delete');

    this._setEventListeners();
   
    return this._item;
  }
  
  _handlePopupImage() {
    imageFull.src = this._link;
    headingFull.textContent = this._name;
    openPopup(popupImage);
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._cardElementDelete.closest('.element').remove();
    // this._item.remove();
  }
 
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._item.querySelector('.element__image').addEventListener('click', () => {
      this._handlePopupImage();
    });
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '.cards');
  const renderCard = card.createCard();
  document.querySelector('.elements').append(renderCard);
});



// const card = new Card('ff', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', '.cards');
// const renderCard = card.createCard();
// document.querySelector('.elements').prepend(renderCard);
