export default class MainApi {
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

    setToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    getMovies() {
        return this._request(`${this.url}/movies`, {
            method: 'GET',
            headers: this.headers,
        })
    }

    addMovie(item) {
        return this._request(`${this.url}/movies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(item)
        })
    }

    deleteMovie(movieId) {
        return this._request(`${this.url}/movies/${movieId}`, {
            method: "DELETE",
            headers: this.headers,
        })
    }

    setProfileInfo(item) {
        return this._request(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: item.name,
                email: item.email
            })
        })
    }

    profileDataInstall() {
        return this._request(`${this.url}/users/me`, {
            headers: this.headers,
        })
    }

}

const token = localStorage.getItem('token');

export const mainApi = new MainApi({
    url: 'https://api.bazhanov.rinat.diplom.nomoredomainsrocks.ru',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
})