function SearchForm() {
    return (
        <div className="searchForm">
            <form className="searchForm__form" action="" method="get">
                <input className="searchForm__input" name="searchForm" placeholder="Фильм" type="search" />
                <button className="searchForm__submit" type="submit">Найти</button>
            </form>
        </div>
    );
}

export default SearchForm;