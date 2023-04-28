import './index.css';

import {
  initialCards,
  validationConfig,
  profileEditButton,
  cardAddButton,
  popupInputUserName,
  popupInputUserInfo,
  popupInputUserAvatar,
  avatarAddButton,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api';
// import { reject, resolve } from 'core-js/fn/promise';
// import { reverse } from 'core-js/core/array';
// import { data } from 'autoprefixer';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc',
    'Content-Type': 'application/json'
  }
});



function getProfileInfo(){
fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
  headers: {
    authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc'
  }
})
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    // container.insertAdjacentHTML('afterbegin', markup);
  });
}
getProfileInfo();

//  отправка данных профиля
  fetch('https://mesto.nomoreparties.co/v1/cohort-65/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Екатерина Шрейнер',
    about: 'люблю искусство',
    avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg'
  })
});



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
  // console.log(userInfo);
  userInfo.setUserInfo(formValues);
}

// функция открытия формы "Редактировать аватар"
function handleOpenAvatarForm() {
  popupAvatarClass.open();
  // const profileInfo = userInfo.getUserInfo();
  // popupInputUserName.value = profileInfo.name;
  // popupInputUserInfo.value = profileInfo.info;
  // popupInputUserAvatar.value = profileInfo.avatar;
  console.log('click');
}

// функция сабмита формы "Редактировать аватар"
function handleSubmitAvatarForm() {
  console.log('submit');
}

//                 КАРТОЧКИ 

api.getCards()
  .then((cards) => {
    sectionCards.renderItems(cards)
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })

// функция новой карточки
const createNewCard = (cards) => {
  const card = new Card(cards, '.cards', 
  {handleCardClick: () => {popupImageClass.open()}
  });
  const cardRender = card.createCard();
  return cardRender;
};

// отрисовка массива карточек
const sectionCards = new Section({
  renderer: (cards) => createNewCard(cards)
}, '.elements');

// const sectionCards = new Section({
//   renderer: (cards) => {
//     return createNewCard(cards)
//   }
// }, '.elements');

// функция сабмита формы "Создание карточки"
function handleSubmitCardsForm(formValues) {
  const cardItem = {
    name: formValues.title,
    link: formValues.link
  };
  sectionCards.addNewItem(createNewCard(cardItem));
}

//               ЭКЗЕМПЛЯРЫ КЛАССОВ ПОПАП  

const userInfo = new UserInfo({
  nameProfileSelector: '.profile__title',
  infoProfileSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});
const popupEditProfileClass = new PopupWithForm('.popup_edit-profile', handleSubmitProfileForm);
const popupCardsClass = new PopupWithForm('.popup_cards', handleSubmitCardsForm);
const popupImageClass = new PopupWithImage('.popup_image');
const popupAvatarClass = new PopupWithForm('.popup_avatar', handleSubmitAvatarForm);

//                 ВАЛИДАЦИЯ ФОРМ 

const profileValidate = new FormValidator(validationConfig, 'form-edit-profile');
const cardValidate = new FormValidator(validationConfig, 'form-cards');
const avatarValidate = new FormValidator(validationConfig, 'form-avatar');
profileValidate.enableValidation();
cardValidate.enableValidation();
avatarValidate.enableValidation();

//                СЛУШАТЕЛИ СОБЫТИЙ           

popupEditProfileClass.setEventListeners();
popupCardsClass.setEventListeners();
popupImageClass.setEventListeners();
popupAvatarClass.setEventListeners();
avatarAddButton.addEventListener ('click', handleOpenAvatarForm);
profileEditButton.addEventListener ('click', handleOpenProfileForm);
cardAddButton.addEventListener('click', function() {
  cardValidate.disableSubmitButton();
  popupCardsClass.open();
});