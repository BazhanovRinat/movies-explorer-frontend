import React, { useState, useEffect } from 'react';
import { moviesApi } from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";

function Movies({ openPopupError }) {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const [maxVisibleMovies, setMaxVisibleMovies] = useState(16);
    const [searched, setSearched] = useState(false);
    const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem('isShortMovies')) || false
    const [savedMovies, setSavedMovies] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const storedValue = localStorage.getItem('isShortMovies');
        if (storedValue === 'true') {
            setIsShortMovies(true);
        } else {
            setIsShortMovies(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isShortMovies', isShortMovies.toString());
    }, [isShortMovies]);

    useEffect(() => {
        const usersMovies = JSON.parse(localStorage.getItem('oldMovies'));
        if (usersMovies) {
            setAllMovies(usersMovies);
            if (screenWidth < 1150) {
                setMaxVisibleMovies(15);
            } else {
                setMaxVisibleMovies(16);
            }

            if (isShortMovies) {
                const shortMovies = usersMovies.filter(({ duration }) => duration <= 40);
                setFilteredMovies(shortMovies);
            } else {
                setFilteredMovies(usersMovies);
            }
            setSearched(true);
            updateVisibleMovies();
        }
        mainApi.getMovies()
            .then((data) => {
                setSavedMovies(data);
            })
            .catch((err) => {
                console.log(err);
                openPopupError(true);
            });
    }, [isShortMovies]);

    function findMovie(filter, isShortMovies) {
        moviesApi.getMovies()
            .then((data) => {
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

                if (screenWidth < 1150) {
                    setMaxVisibleMovies(15);
                } else {
                    setMaxVisibleMovies(16);
                }

                setSearched(true);
            })
            .catch((error) => {
                console.log(`${error}`);
                openPopupError(true)
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
        if (screenWidth <= 1025) {
            cardsToAdd = 2;
        }
        setMaxVisibleMovies((currentMaxVisibleMovies) => currentMaxVisibleMovies + cardsToAdd);
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
                    {searched && <MoviesCardList movies={visibleMovies} savedMovies={savedMovies} openPopupError={openPopupError} />}
                    {searched && visibleMovies.length < filteredMovies.length && (
                        <button className="movies__moreMovies-btn" onClick={loadMoreMovies}>Еще</button>
                    )}
                </>
            )}
        </main>
    );
}

export default Movies;