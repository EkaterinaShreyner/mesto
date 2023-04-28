export default class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._item.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    // this._cardImage.setAttribute('src', this._link);
    // this._cardImage.setAttribute('alt', this._name);
    this._item.querySelector('.element__title').textContent = this._name;
    // this._cardTitle = this._item.querySelector('.element__title');
    // this._cardTitle.textContent = this._name;
    this._cardLikeButton = this._item.querySelector('.element__like');
    this._cardElementDelete = this._item.querySelector('.element__card-delete');

    this._setEventListeners();
   
    return this._item;
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle('element__like_active');
  }

  _handleDeleteCard() {
    this._item.remove();
  }
 
  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

