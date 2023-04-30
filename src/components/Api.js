class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

    //ответ
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
    
  }

  // addNewCard({name, link}) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name,
  //       link
  //     })
  //   })
  //     .then(this._getResponse)
  // }

  //получить массив объектов с карточками
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResponse)
  }

  // получить данные пользователя
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._getResponse)
  }
  // отправить новые данные пользователя
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about, 
      })  
    }) 
    .then(this._getResponse)
  }
}

export default Api;
