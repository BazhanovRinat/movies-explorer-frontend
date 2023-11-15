import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, isLoading, savedMovies, openPopupError, updateMoviesList, handleUpdateUsersMovies }) {

    return (
        <section className="moviesCardList">
            {isLoading ? (
                <div className="preloader">
                    <span className="loader"></span>
                </div>
            ) : (
                movies && movies.map((movie) => (
                    <MoviesCard key={movie.id} movie={movie} savedMovies={savedMovies} openPopupError={openPopupError}
                        updateMoviesList={updateMoviesList} handleUpdateUsersMovies={handleUpdateUsersMovies}/>
                ))
            )}
        </section>
    );
}

export default MoviesCardList;
