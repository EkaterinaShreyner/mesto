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

// const testpopup = document.getElementById('test');
const popupList = document.querySelectorAll('.popup');

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП ПРИ ПОМОЩИ ESCAPE
// const popupList = Array.from(document.querySelectorAll('.popup'));
// popupList.forEach(function(document) {
//   document.addEventListener('keydown', closeByEsc);
// });

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}



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
function submitCardsForm(evt) {
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
popupFormCard.addEventListener('submit', submitCardsForm);

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



// const popupForms = document.querySelector('.popup__form');
// const popupInputs = popupForms.querySelector('.popup__input');
// const textError = popupFormCard.querySelector('.popup__input-error');

// ФУКНЦИЯ ПОКАЗА ОШИБКИ В ПОЛЕ ВВОДА
function showInputError(formElement, input, errorMessage) {
  // const errorElement = formElement.querySelector(`.${input.id}-error`);
  const errorElement = formElement.querySelector('.popup__input-error');
  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}
// ФУКЦИЯ СКРЫТИЯ ОШИБКИ В ПОЛЕ ВВОДА
function hideInputError(formElement, input) {
  const errorElement = formElement.querySelector('.popup__input-error');
  // const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}
// ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ВВОДА
function checkInputValid(formElement, input) {
  if (!(input.validity.valid)) {
    showInputError(formElement, input, input.validationMessage);
  } else {
    hideInputError(formElement, input);
  }
}
// popupInputs.addEventListener('input', function() {
//   checkInputValid(popupForms, popupInputs);
// });

// ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ВВОДА
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // const buttonSubmit = formElement.querySelectorAll('.popup__button');
  // toggleButtonState(inputList, buttonSubmit);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      checkInputValid(formElement, input);
      // toggleButtonState(inputList, buttonSubmit);
    });
  });
}
// setEventListener(popupForms);

// ВАЛИДАЦИЯ ВСЕХ ФОРМ
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function(formElement) {
    // formElement.addEventListener('submit', function(evt) {
    //   evt.preventDefault();
    // });
    setEventListener(formElement);
  });
}
enableValidation();

// ФУНКЦИЯ ПРОВЕРКА НА ХОТЯ БЫ 1 ПОЛЕ ВВОДА 
function hasInputInvalid(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
}

// ФУНКЦИЯ БЛОКИРОВКИ КНОПКИ SUBMIT
// function toggleButtonState(inputList, buttonSubmit) {
//   if (hasInputInvalid(inputList)) {
//     buttonSubmit.classList.add('popup__button_disabled');
//   } else {
//     buttonSubmit.classList.remove('popup__button_disabled');
//   }
// }

