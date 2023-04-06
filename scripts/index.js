import {
  validationConfig,
  popupEditProfile,
  popupCards,
  popupImage,
  profileEditButton,
  popupButtonCards,
  popupButtonCloseProfile,
  popupButtonCardsClose,
  popupButtonImageClose,
  userNameTitle,
  userProfileSubtitle,
  popupInputUserName,
  popupInputUserInfo,
  popupInputCardName,
  popupInputCardLink,
  popupFormEditProfile,
  popupFormCard,
  elements,
} from './constants.js';
import formValidator from './formValidator.js';
import Card from './card.js';

const profileValidate = new formValidator(validationConfig, 'form-edit-profile');
const cardValidate = new formValidator(validationConfig, 'form-cards');
profileValidate.enableValidation();
cardValidate.enableValidation();

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП НA OVERLAY И КЛАВИШУ ESC
function closeOverlayAndEsc(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    // evt.target.classList.remove('popup_opened');
    closePopup(evt.target);
  }
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOverlayAndEsc);
  popup.addEventListener('mousedown', closeOverlayAndEsc);
}
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOverlayAndEsc);
  popup.removeEventListener('mousedown', closeOverlayAndEsc);
}

// ФУНКЦИЯ ОТПРАВКА ФОРМЫ 1
function submitEditProfileForm (event) {
  event.preventDefault();
  userNameTitle.textContent = popupInputUserName.value;
  userProfileSubtitle.textContent = popupInputUserInfo.value;
  closePopup(popupEditProfile);
};

// ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
function submitCardsForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value
  };
  // const cardRender = createCards(newCard.name, newCard.link);
  const card = new Card(newCard, '.cards');
  const cardRender = card.createCard();

  elements.prepend(cardRender);
  closePopup(popupCards);
  evt.target.reset();
  // buttonSubmitCard.disabled = true;
  // buttonSubmitCard.classList.add('popup__button_disabled');
  // _activeSubmitButton(buttonSubmitCard, validationConfig);
  cardValidate.activeSubmitButton();
};

popupFormEditProfile.addEventListener('submit', submitEditProfileForm);
popupFormCard.addEventListener('submit', submitCardsForm);

// ПОПАП 1
profileEditButton.addEventListener ('click', function() {
  // popupEditprofile.classList.add('popup_opened');
  openPopup(popupEditProfile);
  popupInputUserName.value = userNameTitle.textContent;
  popupInputUserInfo.value = userProfileSubtitle.textContent;
});
popupButtonCloseProfile.addEventListener ('click', function() {
  // popupEditProfile.classList.remove('popup_opened');
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