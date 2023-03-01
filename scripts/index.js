// для попапа 1
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
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

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

 // ПОПАП 1
profileEditButton.addEventListener ('click', function() {
  // popupEdit.classList.add('popup_opened');
  openPopup(popupEdit);
  popupInputUserName.value = userNameTitle.textContent;
  popupInputUserInfo.value = userProfileSubtitle.textContent;
});
popupButtonCloseProfile.addEventListener ('click', function() {
  // popupEdit.classList.remove('popup_opened');
  closePopup(popupEdit);
});

// ПОПАП 2
popupButtonCards.addEventListener('click', function() {
  openPopup(popupCards);
  popupInputCardName.value = '';
  popupInputCardLink.value = '';
});
popupButtonCardsClose.addEventListener ('click', function() {
  closePopup(popupCards);
});

// ОТПРАВКА ФОРМЫ 1
const popupInputUserName = document.querySelector('.popup__input_type_name');
const popupInputUserInfo = document.querySelector('.popup__input_type_info');
const popupForm = document.querySelector('.popup__form');

popupForm.addEventListener('submit', handleFormSubmit);
function handleFormSubmit (event) {
  event.preventDefault();
  userNameTitle.textContent = popupInputUserName.value;
  userProfileSubtitle.textContent = popupInputUserInfo.value;
  closePopup(popupEdit);
};

// РЕНДЕРИНГ КАРТОЧЕК
const initialCards = [
  {
    name: 'Архыз',
    alt: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    alt: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    alt: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    alt: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    alt: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    alt: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elements = document.querySelector('.elements');
const popupFormCard = document.querySelector('.popup__form_card_add');
const popupInputCardName = popupFormCard.querySelector('.popup__input_card_name');
const popupInputCardLink = popupFormCard.querySelector('.popup__input_card_link');

function createCards(name, link) {
  const cardsTemplateClone = cardsTemplate.cloneNode(true);
  const cardImage = cardsTemplateClone.querySelector('.element__image');
  const cardTitle = cardsTemplateClone.querySelector('.element__title');
  cardTitle.textContent = name;
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);

  const likeButtonElement = cardsTemplateClone.querySelector('.element__like');
  likeButtonElement.addEventListener('click', handlelikeButton);
  
  const cardButtonDelete = cardsTemplateClone.querySelector('.element__card-delete');
  cardButtonDelete.addEventListener('click', handleDeleteCard);

  // cardImage.addEventListener('click', popupImageFull);
  cardImage.addEventListener('click', function() {
    // const popupImage = document.querySelector('.popup_image');
    const imageFull = popupImage.querySelector('.popup__image-full');
    const headingFull = popupImage.querySelector('.popup__title_image-full');
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

// ДОБАЛЕНИЕ НОВОЙ КАРТОЧКИ
popupFormCard.addEventListener('submit', handleFormSubmitCard);

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value
  };
  const ooo = createCards(newCard.name, newCard.link);
  elements.prepend(ooo);
  closePopup(popupCards);
  evt.target.reset();
};

// ПОПАП 3
// function popupImageFull(link, name) {
//   imageFull.src = initialCards.link;
//   imageFull.alt = initialCards.name;
//   headingFull.textContent = initialCards.name;
//   openPopup(popupImage);
// };
popupButtonImageClose.addEventListener('click', function() {
  closePopup(popupImage);
});

// ФУНКЦИЯ ОБРАБОТЧИК ЛАЙКА
function handlelikeButton(evt) {
  const buttonLikeTarget = evt.target;
  buttonLikeTarget.classList.toggle('element__like_active');
};

// ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ 
function handleDeleteCard(evt) {
  const buttonDeleteTarget = evt.target;
  buttonDeleteTarget.closest('.element').remove();
};