import React, { useState, useEffect } from 'react';
import { mainApi } from "../../utils/MainApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { UsersMovies } from "../../contexts/UsersMovies";

function Movies({ openPopupError, handleUpdateUsersMovies}) {
    const [movies, setMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [allMovies, setAllMovies] = useState([]);

    const addedMovies = React.useContext(UsersMovies);

    useEffect(() => {
        // mainApi.getMovies()
        //     .then((data) => {
        //         setMovies(data);
        //         setAllMovies(data);
        //     })
        //     .catch((error) => {
        //         console.log(`${error}`);
        //         openPopupError(true);
        //     });
        // setMovies(addedMovies)
        // setAllMovies(addedMovies)
         setMovies(addedMovies)
         setAllMovies(addedMovies)
        console.log(addedMovies)
    }, [addedMovies]);

    function findMovie(filter) {
        let filteredMovies = allMovies.filter(({ nameRU }) => nameRU.toLowerCase().includes(filter.toLowerCase()));

        if (isShortMovies) {
            filteredMovies = filteredMovies.filter(({ duration }) => duration <= 40);
        }

        setMovies(filteredMovies);
    }

    function updateMoviesList(movieCard) {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieCard._id));
    }

    function handleCheckboxChange() {
        setIsShortMovies(!isShortMovies);

        if (isShortMovies) {
            setMovies(allMovies);
        } else {
            const filteredMovies = allMovies.filter(({ duration }) => duration <= 40);
            setMovies(filteredMovies);
        }
    }

    return (
        <main className="movies">
            <SearchForm findMovie={findMovie} handleCheckboxChange={handleCheckboxChange} isShortMovies={isShortMovies} />
            <MoviesCardList movies={movies} updateMoviesList={updateMoviesList} handleUpdateUsersMovies={handleUpdateUsersMovies}/>
        </main>
    );
}

export default Movies;
