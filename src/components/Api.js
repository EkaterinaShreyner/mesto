class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

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

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._getResponse)
      // .then((res) => {
      //   console.log(res)
      // })
  }
}

export default Api;
