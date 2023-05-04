export default class Card {
  constructor(data, templateSelector, userId, {handleCardClick, handleDeleteCard}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id; //id карточки
    this._likes = data.likes; // св-во карточки, содержащее массив пользователей поставивших лайк
    this._ownerId = data.owner._id; // id пользователя 
    this._userId = userId; // мой id
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
    this._cardLikes = this._item.querySelector('.element__likes');
    this._cardLikes.textContent = this._likes.length;

    // установка корзины на моих карточках
    if (this._ownerId != this._userId) {
      this._cardElementDelete.remove()
    }

    this._setEventListeners();
   
    return this._item;
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle('element__like_active');
  }

  // _handleDeleteCard() {
  //   this._item.remove();
  // }

  deleteCard() {
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

