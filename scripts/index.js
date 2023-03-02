// для попапа 1
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupButtonCloseProfile = document.querySelector('.popup__button-close');
const userNameTitle = document.querySelector('.profile__title');
const userProfileSubtitle = document.querySelector('.profile__subtitle');
// для попапа 2
const popupCards = document.querySelector('.popup_cards');
const popupButtonCards = document.querySelector('.profile__add-button');
const popupButtonCardsClose = popupCards.querySelector('.popup__button-close');
// для попапа 3
const popupImage = document.querySelector('.popup_image');
const popupButtonImageClose = popupImage.querySelector('.popup__button-close');
const imageFull = popupImage.querySelector('.popup__image-full');
const headingFull = popupImage.querySelector('.popup__title_image-full');
// шаблон карточки
const cardsTemplate = document.querySelector('.cards').content;
// для отправки формы 1
const popupInputUserName = document.querySelector('.popup__input_type_name');
const popupInputUserInfo = document.querySelector('.popup__input_type_info');
const popupFormEditProfile = document.forms['form-edit-profile'];
// для рендеринга карточек
const elements = document.querySelector('.elements');
const popupFormCard = document.forms['form-cards'];
const popupInputCardName = popupFormCard.querySelector('.popup__input_card_name');
const popupInputCardLink = popupFormCard.querySelector('.popup__input_card_link');

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// ФУКНЦИЯ РЕНДЕРИНГ КАРТОЧЕК
function createCards(name, link) {
  const cardsTemplateClone = cardsTemplate.cloneNode(true);
  const cardImage = cardsTemplateClone.querySelector('.element__image');
  const cardTitle = cardsTemplateClone.querySelector('.element__title');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);

  const likeButtonElement = cardsTemplateClone.querySelector('.element__like');
  likeButtonElement.addEventListener('click', handleLikeButton);
  
  const cardButtonDelete = cardsTemplateClone.querySelector('.element__card-delete');
  cardButtonDelete.addEventListener('click', handleDeleteCard);

  cardImage.addEventListener('click', function() {
    imageFull.src = link;
    imageFull.alt = name;
    headingFull.textContent = name;
    openPopup(popupImage);
  });
  return cardsTemplateClone;
};

initialCards.forEach(function(card) {
  elements.append(createCards(card.name, card.link));
});

// ФУНКЦИЯ ОТПРАВКА ФОРМЫ 1
function submitEditProfileForm (event) {
  event.preventDefault();
  userNameTitle.textContent = popupInputUserName.value;
  userProfileSubtitle.textContent = popupInputUserInfo.value;
  closePopup(popupEditProfile);
};

// ФУНКЦИЯ ОБРАБОТЧИК ЛАЙКА
function handleLikeButton(evt) {
  const buttonLikeTarget = evt.target;
  buttonLikeTarget.classList.toggle('element__like_active');
};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ 
function handleDeleteCard(evt) {
  const buttonDeleteTarget = evt.target;
  buttonDeleteTarget.closest('.element').remove();
};

// ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value
  };
  const cardRender = createCards(newCard.name, newCard.link);
  elements.prepend(cardRender);
  closePopup(popupCards);
  evt.target.reset();
};

popupFormEditProfile.addEventListener('submit', submitEditProfileForm);
popupFormCard.addEventListener('submit', handleFormSubmitCard);

// ПОПАП 1
profileEditButton.addEventListener ('click', function() {
  // popupEdit.classList.add('popup_opened');
  openPopup(popupEditProfile);
  popupInputUserName.value = userNameTitle.textContent;
  popupInputUserInfo.value = userProfileSubtitle.textContent;
});
popupButtonCloseProfile.addEventListener ('click', function() {
  // popupEdit.classList.remove('popup_opened');
  closePopup(popupEditProfile);
});

// ПОПАП 2
popupButtonCards.addEventListener('click', function() {
  openPopup(popupCards);
  popupFormCard.reset();
});
popupButtonCardsClose.addEventListener ('click', function() {
  closePopup(popupCards);
});

// ЗАКРЫТИЕ ПОПАП 3
popupButtonImageClose.addEventListener('click', function() {
  closePopup(popupImage);
});