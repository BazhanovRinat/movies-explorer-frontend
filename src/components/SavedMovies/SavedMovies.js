import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies () {
    return (
        <section className="movies">
            <SearchForm />
            <div className="movies-switch__container">
                <input className="movies__switch" id="switch" type="checkbox" />
                <label className="movies__switch-active" for="switch"></label>
                <label className="movies__switch-lable">Короткометражки</label>
            </div>
            <MoviesCardList />
            <button className="movies__moreMovies-btn">Еще</button>
        </section>
    );
}

export default SavedMovies;