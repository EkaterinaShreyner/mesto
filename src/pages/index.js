import './index.css';

import {
  initialCards,
  validationConfig,
  profileEditButton,
  cardAddButton,
  popupInputUserName,
  popupInputUserInfo,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//               РЕДАКТИРОВАНИЕ ПРОФИЛЯ 

// функция открытия формы "Редактировать профиль"
function handleOpenProfileForm() {
  popupEditProfileClass.open();
  const profileInfo = userInfo.getUserInfo();
  popupInputUserName.value = profileInfo.name;
  popupInputUserInfo.value = profileInfo.info;
}

// функция сабмита формы "Редактировать профиль"
function handleSubmitProfileForm(formValues) {
  userInfo.setUserInfo(formValues);
}

//                СОЗДАНИЕ КАРТОЧКИ 

// функция сабмита формы "Создание карточки"
function handleSubmitCardsForm(formValues) {
  const cardItem = {
    name: formValues.title,
    link: formValues.link
  };
  sectionCards.addNewItem(createNewCard(cardItem));
}

// функция новой карточки
const createNewCard = (item) => {
  const card = new Card(item, '.cards', 
  {handleCardClick: () => {popupImageClass.open(item)}
  });
  const cardRender = card.createCard();
  return cardRender;
};

// функция создания карточек и отрисовка исходного массива
const sectionCards = new Section({
  items: initialCards,
  renderer: (item) => {
    sectionCards.addItem(createNewCard(item));
  }
}, '.elements');
sectionCards.renderItems();

//               ЭКЗЕМПЛЯРЫ КЛАССОВ ПОПАП  

const userInfo = new UserInfo({
  nameProfileSelector: '.profile__title',
  infoProfileSelector: '.profile__subtitle'
});
const popupEditProfileClass = new PopupWithForm('.popup_edit-profile', handleSubmitProfileForm);
const popupCardsClass = new PopupWithForm('.popup_cards', handleSubmitCardsForm);
const popupImageClass = new PopupWithImage('.popup_image');

//                 ВАЛИДАЦИЯ ФОРМ 

const profileValidate = new FormValidator(validationConfig, 'form-edit-profile');
const cardValidate = new FormValidator(validationConfig, 'form-cards');
profileValidate.enableValidation();
cardValidate.enableValidation();

//                СЛУШАТЕЛИ СОБЫТИЙ           

popupEditProfileClass.setEventListeners();
popupCardsClass.setEventListeners();
popupImageClass.setEventListeners(); 
profileEditButton.addEventListener ('click', handleOpenProfileForm);
cardAddButton.addEventListener('click', function() {
  cardValidate.disableSubmitButton();
  popupCardsClass.open();
});