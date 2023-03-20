// ФУКНЦИЯ ПОКАЗА ОШИБКИ В ПОЛЕ ВВОДА
function showInputError(formElement, input, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// ФУКЦИЯ СКРЫТИЯ ОШИБКИ В ПОЛЕ ВВОДА
function hideInputError(formElement, input, config) {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// ВАЛИДАЦИЯ ОДНОГО ПОЛЯ ВВОДА
function checkInputValid(formElement, input, config) {
  if (!(input.validity.valid)) {
    showInputError(formElement, input, input.validationMessage, config);
  } else {
    hideInputError(formElement, input, config);
  }
}

// ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ВВОДА
function setEventListener(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, config);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      checkInputValid(formElement, input, config);
      toggleButtonState(inputList, buttonSubmit, config);
    });
  });
}

// ФУНКЦИЯ ПРОВЕРКА НА ХОТЯ БЫ 1 ПОЛЕ ВВОДА 
function hasInputInvalid(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
}

// ФУНКЦИЯ ВКЛ КНОПКИ SUBMIT
function activeSubmitButton(buttonSubmit, config) {
  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.disabled = true;
}
// ФУНКЦИЯ ВЫКЛ КНОПКИ SUBMIT
function disableSubmitButton(buttonSubmit, config) {
  buttonSubmit.classList.remove(config.inactiveButtonClass);
  buttonSubmit.disabled = false;
}

// ФУНКЦИЯ БЛОКИРОВКИ КНОПКИ SUBMIT ПРИ ХОТЯ БЫ 1 НЕВАЛИДНОМ ПОЛЕ
function toggleButtonState(inputList, buttonSubmit, config) {
  if (hasInputInvalid(inputList)) {
    activeSubmitButton(buttonSubmit, config);
  } else {
    disableSubmitButton(buttonSubmit, config);
  }
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// ОБЩАЯ ВАЛИДАЦИЯ ВСЕХ ФОРМ
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function(formElement) {
    setEventListener(formElement, config);
  });
}
enableValidation(validationConfig);


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// });