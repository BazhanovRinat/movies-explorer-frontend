import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, isLoading }) {
    return (
        <section className="moviesCardList">
            {isLoading ? (
                <div className="preloader">
                    <span className="loader"></span>
                </div>
            ) : (
                movies && movies.map((movie) => (
                    <MoviesCard key={movie.id} movie={movie} />
                ))
            )}
        </section>
    );
}

export default MoviesCardList;
