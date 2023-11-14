export default class MoviesApi {
    constructor(data) {
        this.url = data.url;
        this.headers = data.headers;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return this._request(`${this.url}/beatfilm-movies`, {
            headers: this.headers,
        })
    }

}

export const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})