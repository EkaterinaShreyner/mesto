const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');


profileEditButton.addEventListener ('click', function() {
  // popupEdit.classList.add('popup_popup_opened');
  openPopup(popupEdit);
});

popupButtonClose.addEventListener ('click', function() {
  // popupEdit.classList.remove('popup_popup_opened');
  closePopup(popupEdit);
});

function openPopup(popup) {
  popup.classList.add('popup_popup_opened');  
};

function closePopup(popup) {
  popup.classList.remove('popup_popup_opened');
  popupInput.value = userNameTitle.textContent;
  popupInputInfo.value = userProfileSubtitle.textContent; 
};

let userName = 'Шрейнер Екатерина';
let userInfo = 'люблю искусство';

const userNameTitle = document.querySelector('.profile__title');
userNameTitle.textContent = userName;
const userProfileSubtitle = document.querySelector('.profile__subtitle');
userProfileSubtitle.textContent = userInfo;

const popupInput = document.querySelector('.popup__input');
popupInput.value = userName;
const popupInputInfo = document.querySelector('.popup__input_info');
popupInputInfo.value = userInfo;

// const popupButtonSave = document.querySelector('.popup__button');
const popupFormContainer = document.querySelector('.popup__container');
function handleFormSubmit (event) {
  event.preventDefault();
  console.log('Форма сохранена');
  userNameTitle.textContent = popupInput.value;
  userProfileSubtitle.textContent = popupInputInfo.value;
  closePopup(popupEdit);
};
popupFormContainer.addEventListener('submit', handleFormSubmit);

// popupInput.addEventListener('input', function (event) {
//   const value = event.target.value;
//   userNameTitle.textContent = value;
// });