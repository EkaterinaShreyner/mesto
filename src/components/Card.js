export default class Card {
  constructor(data, templateSelector, userId, {handleCardClick, handleDeleteCard, handleLikeButton}) {
    this._name = data.name;
    this._link = data.link;
    this.cardId = data._id; //id карточки
    this._likes = data.likes; // св-во карточки, содержащее массив пользователей поставивших лайк
    this._ownerId = data.owner._id; // id пользователя 
    this._userId = userId; // мой id
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
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
    this._cardLikeButton = this._item.querySelector('.element__like');
    this._cardElementDelete = this._item.querySelector('.element__card-delete');
    this._cardLikes = this._item.querySelector('.element__likes');
    this._cardLikes.textContent = this._likes.length;

    // установка корзины на моих карточках
    if (this._ownerId != this._userId) {
      this._cardElementDelete.remove()
    }

    if (this.checkUserLike()) {
      this.like()
    } else {
      this.removeLike()
    }

    this._setEventListeners();
   
    return this._item;
  }

  // проверка лайка
  checkUserLike() {
    return this._likes.some((likes) => likes._id === this._userId);
  } 

  sumLikes(likes) {
    this._cardLikes.textContent = likes.likes.length;
    this._likes = likes.likes;
  }

  like() {
    this._cardLikeButton.classList.add('element__like_active', true);
  }

  removeLike() {
    this._cardLikeButton.classList.remove('element__like_active', true);
  }

  deleteCard() {
    this._item.remove();
  }

  _setEventListeners = () => {
    this._cardLikeButton.addEventListener('click', () => {
      // this._handleLikeButton(this._cardId);
      this._handleLikeButton(this);
    });
    this._cardElementDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}

