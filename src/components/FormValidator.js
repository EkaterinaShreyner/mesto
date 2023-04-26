export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._formSelector = settings.formSelector;
    this._errorClass = settings.errorClass;
    this._form = document.forms[formElement];
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = this._form.querySelector(settings.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListener();
  }
  
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValid(input) {
      if (!(input.validity.valid)) {
        this._showInputError(input, input.validationMessage);
      } else {
        this._hideInputError(input);
      }
  };

  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValid(input);
        this._toggleButtonState();
      });
    });
  }

  _activeSubmitButton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  disableSubmitButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }

  _hasInputInvalid() {
    return this._inputList.some(function(input) {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInputInvalid()) {
      this.disableSubmitButton();
    } else {
      this._activeSubmitButton();
    }
  }
};
