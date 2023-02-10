const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');


const popupButtonClose = document.querySelector('.popup__button-close');

profileEditButton.addEventListener ('click', function() {
  popupEdit.classList.add('popup_popup_opened');
});

popupButtonClose.addEventListener ('click', function() {
  popupEdit.classList.remove('popup_popup_opened');
});

// function openPopup(popup) {
//   popup.classList.add('popup_popup_opened');  
// };

// function closePopup(popup) {
//   popup.classList.remove('popup_popup_opened');  
// };


