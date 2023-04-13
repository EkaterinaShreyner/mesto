import {
  initialCards,
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
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Popup from './Popup.js';

const popupEditProfileClass = new Popup('.popup_edit-profile');
const popupCardsClass = new Popup('.popup_cards');

popupEditProfileClass.setEventListeners();
popupCardsClass.setEventListeners();

const profileValidate = new FormValidator(validationConfig, 'form-edit-profile');
const cardValidate = new FormValidator(validationConfig, 'form-cards');
profileValidate.enableValidation();
cardValidate.enableValidation();

// ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ 
function createNewCard(cardElement) {
  const card = new Card(cardElement, '.cards');
  const cardRender = card.createCard();
  elements.append(cardRender);
};

// ОТРИСОВКА ИСХОДНОГО МАССИВА
initialCards.forEach((item) => {
  // const card = new Card(item, '.cards');
  // const cardRender = card.createCard();
  // elements.append(cardRender);
  createNewCard(item);
});

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП НA OVERLAY
// function closePopupByOverlay() {
//   const popupList = Array.from(document.querySelectorAll('.popup'));
//   popupList.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_opened'));
//       closePopup(evt.target);
//     })
//   });
// }

// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП НА КЛАВИШУ ESC
// function closePopupByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened')
//     closePopup(popupOpened);
//   }
// }

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПОВ
// export default function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
//   popup.addEventListener('mousedown', closePopupByOverlay);
// }
// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
//   popup.addEventListener('mousedown', closePopupByOverlay);
// }

// ФУНКЦИЯ ОТПРАВКА ФОРМЫ 1
function submitEditProfileForm (event) {
  event.preventDefault();
  userNameTitle.textContent = popupInputUserName.value;
  userProfileSubtitle.textContent = popupInputUserInfo.value;
  closePopup(popupEditProfile);
};

// ФУНКЦИЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ ПОЛЬЗОВАТЕЛЕМ
function submitCardsForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value
  };
  // const card = new Card(newCard, '.cards');
  // const cardRender = card.createCard();
  // elements.prepend(cardRender);
  createNewCard(newCard);
  
  closePopup(popupCards);
  evt.target.reset();
  // buttonSubmitCard.disabled = true;
  // buttonSubmitCard.classList.add('popup__button_disabled');
  // _activeSubmitButton(buttonSubmitCard, validationConfig);
  cardValidate.disableSubmitButton();
};

popupFormEditProfile.addEventListener('submit', submitEditProfileForm);
popupFormCard.addEventListener('submit', submitCardsForm);

// ПОПАП 1
profileEditButton.addEventListener ('click', function() {
  // popupEditprofile.classList.add('popup_opened');
  // openPopup(popupEditProfile);
  popupEditProfileClass.open();
  popupInputUserName.value = userNameTitle.textContent;
  popupInputUserInfo.value = userProfileSubtitle.textContent;
});
popupButtonCloseProfile.addEventListener ('click', function() {
  // popupEditProfile.classList.remove('popup_opened');
  // closePopup(popupEditProfile);
    popupEditProfileClass.close();
});

// ПОПАП 2
popupButtonCards.addEventListener('click', function() {
  // openPopup(popupCards);
  popupCardsClass.open()
  popupFormCard.reset();
  
});
popupButtonCardsClose.addEventListener ('click', function() {
  // closePopup(popupCards);
  popupCardsClass.close();
});

// ЗАКРЫТИЕ ПОПАП 3
popupButtonImageClose.addEventListener('click', function() {
  closePopup(popupImage);
});