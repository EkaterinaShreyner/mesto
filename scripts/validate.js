// ФУКНЦИЯ ПОКАЗА ОШИБКИ В ПОЛЕ ВВОДА
function showInputError(formElement, input, errorMessage) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

// ФУКЦИЯ СКРЫТИЯ ОШИБКИ В ПОЛЕ ВВОДА
function hideInputError(formElement, input) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
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

// ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ВВОДА
function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonSubmit = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonSubmit);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      checkInputValid(formElement, input);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}

// ВАЛИДАЦИЯ ВСЕХ ФОРМ
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function(formElement) {
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

// ФУНКЦИЯ БЛОКИРОВКИ КНОПКИ SUBMIT ПРИ ХОТЯ БЫ 1 НЕВАЛИДНОМ ПОЛЕ
function toggleButtonState(inputList, buttonSubmit) {
  if (hasInputInvalid(inputList)) {
    buttonSubmit.classList.add('popup__button_disabled');
    // buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove('popup__button_disabled');
    // buttonSubmit.removeAttribute('disabled', true);
    buttonSubmit.disabled = false;
  }
}





// ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП ПРИ ПОМОЩИ ESCAPE
// function closeByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened')
//     closePopup(popupOpened);
//   }
// }
