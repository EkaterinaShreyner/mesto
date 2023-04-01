import {initialCards} from './constants.js';
// const cardsTemplate = document.querySelector('.cards').content;
// const cardsTemplateClone = cardsTemplate.cloneNode(true);
// const cardImage = cardsTemplateClone.querySelector('.element__image');
// const cardTitle = cardsTemplateClone.querySelector('.element__title');
const popupImage = document.querySelector('.popup_image');
const imageFull = popupImage.querySelector('.popup__image-full');
const headingFull = popupImage.querySelector('.popup__title_image-full');

class Card {
  // constructor(data, templateSelector) {
  //   this._name = data.name;
  //   this._link = data.link
  //   this._templateSelector = templateSelector;
  // }
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link
    this._templateSelector = templateSelector;
  }

  _getTemplateCard() {
    const cardsTemplate = document.querySelector(this._templateSelector).content;
    cardsTemplate.querySelector('.element').cloneNode(true);
    
    return cardsTemplate;
  }

  createCard() {
    this._item = this._getTemplateCard();
    this._setEventListeners();
    this._item.querySelector('.element__image').setAttribute('src', this._link);
    this._item.querySelector('.element__title').textContent = this._name;
    // this._item.querySelector('.element__image').alt = this._name;
    this._item.querySelector('.element__image').setAttribute('alt', this._name);
    this._cardLikeButton = this._item.querySelector('.element__like');
    this._cardElementDelete = this._item.querySelector('.element__card-delete');
    
    return this._item;
  }
  
  /*_openPopup() {
    imageFull.src = this._link;
    headingFull.textContent = this._name;
    popupImage.classList.add('popup_opened');
  }*/

  _handleLikeButton() {
    // this._item.querySelector('.element__like').classList.toggle('element__like_active');
    this._cardLikeButton.classList.toggle('element__like_active');

    
  }

  _handleDeleteCard() {
    // this._item.querySelector('.element__card-delete').closest('.element').remove();
    this._cardElementDelete.closest('.element').remove();
  }
 
  _setEventListeners() {
    this._item.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._item.querySelector('.element__card-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._item.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup();
    });
  }
}

const card = new Card('гг', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', '.cards');
const renderCard = card.createCard();
  // console.log(this);
document.querySelector('.elements').prepend(renderCard);

// initialCards.forEach((item) => {
//   const card = new Card(item, '.cards');
//   const renderCard = card.createCard();
//   // console.log(this);
//   document.querySelector('.elements').prepend(renderCard);
// });