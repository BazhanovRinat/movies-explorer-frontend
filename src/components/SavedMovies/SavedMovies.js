import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies () {
    return (
        <main className="movies">
            <SearchForm />
            <div className="movies__switch-container">
                <input className="movies__switch" id="switch" type="checkbox" />
                <label className="movies__switch-active" for="switch"></label>
                <label className="movies__switch-lable">Короткометражки</label>
            </div>
            <MoviesCardList />
            <button className="movies__moreMovies-btn">Еще</button>
        </main>
    );
}

export default SavedMovies;