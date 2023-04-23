export default class UserInfo {
  constructor({nameProfileSelector, infoProfileSelector}) {
    this._userNameTitle = document.querySelector(nameProfileSelector);
    this._userProfileSubtitle = document.querySelector(infoProfileSelector)
  }

  getUserInfo() {
   const data = {
    name: this._userNameTitle.textContent,
    info: this._userProfileSubtitle.textContent
   };
    return data;
  }

  setUserInfo(data) {
    this._userNameTitle.textContent = data.name;
    this._userProfileSubtitle.textContent = data.info;
  }
}