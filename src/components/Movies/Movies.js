import React, { useState, useEffect } from 'react';
import { moviesApi } from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const [maxVisibleMovies, setMaxVisibleMovies] = useState(16);
    const [searched, setSearched] = useState(false);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const screenWidth = window.innerWidth;

    useEffect(() => {
        const usersMovies = JSON.parse(localStorage.getItem('oldMovies'));
        if (usersMovies) {
            setAllMovies(usersMovies);
            setFilteredMovies(usersMovies);
            setSearched(true);
            updateVisibleMovies();
        }
    }, []);

    function findMovie(filter, isShortMovies) {
        moviesApi.getMovies()
            .then((data) => {
                setIsLoading(true);
                let filteredMovies = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(filter.toLowerCase()));
                if (isShortMovies === true) {
                    filteredMovies = filteredMovies.filter(({ duration }) => duration <= 40);
                }
                setAllMovies(filteredMovies);
                localStorage.setItem('oldMovies', JSON.stringify(filteredMovies));
                if (isShortMovies) {
                    setFilteredMovies(filteredMovies);
                } else {
                    setFilteredMovies(allMovies);
                }
                if (screenWidth <= 1150) {
                    setMaxVisibleMovies(15);
                } else {
                    setMaxVisibleMovies(16);
                }
                setSearched(true);
            })
            .catch((error) => {
                console.log(`${error}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

        function handleCheckboxChange() {
            setIsShortMovies(!isShortMovies);
            if (!isShortMovies) {
                setFilteredMovies(allMovies.filter(({ duration }) => duration <= 40));
            } else {
                setFilteredMovies(allMovies);
            }
        }

        function loadMoreMovies() {
            let cardsToAdd = 4;
            if (screenWidth <= 1150) {
                cardsToAdd = 3;
            }
            if (screenWidth <= 480) {
                cardsToAdd = 2;
            }
            setMaxVisibleMovies(currentMaxVisibleMovies => currentMaxVisibleMovies + cardsToAdd);
        }

        useEffect(() => {
            if (searched) {
                updateVisibleMovies();
            }
        }, [filteredMovies, maxVisibleMovies, searched]);

        function updateVisibleMovies() {
            const moviesToShow = filteredMovies.slice(0, maxVisibleMovies);
            setVisibleMovies(moviesToShow);
        }

        return (
            <main className="movies">
                <SearchForm findMovie={findMovie} handleCheckboxChange={handleCheckboxChange} isShortMovies={isShortMovies} />
                {searched && filteredMovies.length === 0 ? (
                    <p>Фильм не найден</p>
                ) : (
                    <>
                        {searched && <MoviesCardList movies={visibleMovies} isLoading={isLoading} />}
                        {searched && visibleMovies.length < filteredMovies.length && (
                            <button className="movies__moreMovies-btn" onClick={loadMoreMovies}>Еще</button>
                        )}
                    </>
                )}
            </main>
        );
    }

    export default Movies;