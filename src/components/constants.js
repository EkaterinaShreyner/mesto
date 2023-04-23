export const initialCards = [
  {
    name: 'ГМИИ имени Пушкина',
    alt: 'ГМИИ имени Пушкина',
    link: './image/pushkin.png'
  },
  {
    name: 'ГЭС 2',
    alt: 'ГЭС 2',
    link: './image/ges2.png'
  },
  {
    name: 'Эрмитаж',
    alt: 'Эрмитаж',
    link: './image/Hermitage.png'
  },
  {
    name: 'Русский Музей',
    alt: 'Русский музей',
    link: './image/Russkiy.png'
  },
  {
    name: 'Гараж',
    alt: 'Гараж',
    link: './image/garage.png'
  },
  {
    name: 'Екатериниский Дворец',
    alt: 'Екатериниский Дворец',
    link: './image/dvorEkaterina.jpeg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');

export const popupFormEditProfile = document.forms['form-edit-profile'];
export const popupFormCard = document.forms['form-cards'];
export const popupInputUserName = popupFormEditProfile.querySelector('.popup__input_type_name');
export const popupInputUserInfo = popupFormEditProfile.querySelector('.popup__input_type_info');
export const popupInputCardName = popupFormCard.querySelector('.popup__input_card_name');
export const popupInputCardLink = popupFormCard.querySelector('.popup__input_card_link');
