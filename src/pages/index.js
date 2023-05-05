import './index.css';

import {
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
import popupConfirmForm from '../components/PopupConfirm.js';
import Api from '../components/Api';

let userId;

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'eb88a784-5abe-4513-8117-377adafa9ddc',
    'Content-Type': 'application/json'
  }
});

//               РЕДАКТИРОВАНИЕ ПРОФИЛЯ 

// получить данные профиля с сервера
api.getUserInfo()
  .then((dataUser) => {
    userId = dataUser._id;
    userInfo.setUserInfo(dataUser)
    console.log(dataUser._id)
  })
  .catch((err) => {
    console.error(`Ошибка ${err}`)
  })

// функция открытия формы "Редактировать профиль"
function handleOpenProfileForm() {
  popupEditProfileClass.open();
  const profileInfo = userInfo.getUserInfo();
  popupInputUserName.value = profileInfo.name;
  popupInputUserInfo.value = profileInfo.about;
}

// функция сабмита формы "Редактировать профиль"
function handleSubmitProfileForm(formValues) {
  popupEditProfileClass.renderLoading(true)
  api.patchUserInfo(formValues)
    .then((userData) => {
      // popupEditProfileClass.renderLoading(true)
      userInfo.setUserInfo(userData)
    })
    .catch((err) => {
      console.error(`Ошибка при отправке данных о пользователе: ${err}`)
    })
    .finally(() => {
      popupEditProfileClass.renderLoading(false)
    })
}

// функция сабмита формы "Редактировать аватар"
function handleSubmitAvatarForm(formValues) {
  popupAvatarClass.renderLoading(true);
  api.patchAvatar(formValues)
    .then((userAvatar) => {
      console.log(userAvatar)
      userInfo.setUserInfo(userAvatar)
    })
    .catch((err) => {
      console.error(`Ошибка загрузки аватара пользователя: ${err}`)
    })
    .finally(() => {
      popupAvatarClass.renderLoading(false)
    })
}

//                 КАРТОЧКИ 

// функция новой карточки
const createNewCard = (cards) => {
  const card = new Card(cards, '.cards', userId, {
    
    handleCardClick: () => {
      popupImageClass.open(cards)
    },

    handleDeleteCard: () => {
      console.log(card);
      popupConfirmClass.open(card);
    },

    handleLikeButton: (card) => {
      console.log(card);
      if (!card.checkUserLike()) {
        api.putLike(card.cardId)
          .then((likes) => {
            // console.log(card)
            card.toggleLikeButton()
            card.sumLikes(likes)
          })
          .catch((err) => {
            console.error(`Ошибка установки лайка: ${err}`)
            })
      } else {
        api.deleteLike(card.cardId)
          .then((likes) => {
            card.toggleLikeButton()
            card.sumLikes(likes)
          })
          .catch((err) => {
            console.error(`Ошибка установки лайка: ${err}`)
            })
      }
    }
  });

  const cardRender = card.createCard();
  return cardRender;
};


// отрисовка массива карточек
const sectionCards = new Section({
  renderer: (cards) => createNewCard(cards)
}, '.elements');

api.getCards()
  .then((cards) => {
    sectionCards.renderItems(cards)
    console.log(cards)
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })

// функция сабмита формы "Создание карточки
function handleSubmitCardsForm(formValues) {
  popupCardsClass.renderLoading(true)
  api.postNewCard(formValues)
    .then((dataCard) => {
      console.log(dataCard)
      // console.log(dataCard.likes)
      sectionCards.addNewItem(dataCard)
    })
    .catch((err) => {
      console.error(`Ошибка добавления новой карточки: ${err}`)
    })
    .finally(() => {
      popupCardsClass.renderLoading(false)
    })
}

// функция сабмита формы удаление карточки 
const handleSubmitConfirmForm = (card) => {
  // console.log(card._cardId);
  api.deleteCard(card.cardId)
    .then(() => {
      card.deleteCard();
      popupConfirmClass.close();
    })
    .catch((err) => {
      console.error(`Ошибка удаления карточки: ${err}`)
    })
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
const popupConfirmClass = new popupConfirmForm ('.popup_confirm', handleSubmitConfirmForm);

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
popupConfirmClass.setEventListeners();
profileEditButton.addEventListener ('click', handleOpenProfileForm);
avatarAddButton.addEventListener ('click', () => {
  avatarValidate.disableSubmitButton();
  popupAvatarClass.open()
});
cardAddButton.addEventListener('click', () => {
  cardValidate.disableSubmitButton();
  popupCardsClass.open();
});
