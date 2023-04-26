export default class UserInfo {
  constructor({nameProfileSelector, infoProfileSelector}) {
    this._userNameTitle = document.querySelector(nameProfileSelector);
    this._userProfileSubtitle = document.querySelector(infoProfileSelector)
  }

  getUserInfo() {
   return {
    name: this._userNameTitle.textContent,
    info: this._userProfileSubtitle.textContent
   };
  }

  setUserInfo(data) {
    this._userNameTitle.textContent = data.name;
    this._userProfileSubtitle.textContent = data.info;
  }
}