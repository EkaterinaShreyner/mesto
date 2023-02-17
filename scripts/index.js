const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');
const userNameTitle = document.querySelector('.profile__title');
const userProfileSubtitle = document.querySelector('.profile__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popupInputUserName.value = userNameTitle.textContent;
  popupInputUserInfo.value = userProfileSubtitle.textContent;
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

profileEditButton.addEventListener ('click', function() {
  // popupEdit.classList.add('popup_opened');
  openPopup(popupEdit);
});
popupButtonClose.addEventListener ('click', function() {
  // popupEdit.classList.remove('popup_opened');
  closePopup(popupEdit);
});

const popupInputUserName = document.querySelector('.popup__input_type_name');
const popupInputUserInfo = document.querySelector('.popup__input_type_info');

const popupForm = document.querySelector('.popup__form');
function handleFormSubmit (event) {
  event.preventDefault();
  console.log('Форма сохранена');
  userNameTitle.textContent = popupInputUserName.value;
  userProfileSubtitle.textContent = popupInputUserInfo.value;
  closePopup(popupEdit);
};
popupForm.addEventListener('submit', handleFormSubmit);

// popupInput.addEventListener('input', function (event) {
//   const value = event.target.value;
//   userNameTitle.textContent = value;
// });