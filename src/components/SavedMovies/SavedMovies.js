import React, { useState, useEffect, useContext } from 'react';
import { mainApi } from "../../utils/MainApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useLocation } from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        mainApi.getMovies()
            .then((data) => {
                setMovies(data)
            })
            .catch((error) => {
                console.log(`${error}`);
            })

    }, []);

    function findMovie(filter, isShortMovies) {
        let filteredMovies = movies.filter(({ nameRU }) => nameRU.toLowerCase().includes(filter.toLowerCase()));
        console.log(filteredMovies)
        if (isShortMovies === true) {
            filteredMovies = filteredMovies.filter(({ duration }) => duration <= 40);
        }
        setMovies(filteredMovies);
    }

    return (
        <main className="movies">
            <SearchForm findMovie={findMovie} />
            <MoviesCardList movies={movies} />
        </main>
    );
}

export default Movies;