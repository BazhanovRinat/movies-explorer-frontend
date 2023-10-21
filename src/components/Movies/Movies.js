import React, { useState, useEffect } from 'react';
import { moviesApi } from "../../utils/MoviesApi";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";

function Movies({ openPopupError }) {

    const [renderMovies, setRenderMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [maxVisibleMovies, setMaxVisibleMovies] = useState(() => {
        if (window.innerWidth <= 749) {
            return 5;
        } else if (window.innerWidth <= 1024) {
            return 8;
        } else if (window.innerWidth <= 1149) {
            return 15;
        } else {
            return 16;
        }
    });
    const [savedMovies, setSavedMovies] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);

    const [searched, setSearched] = useState(false);

    const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem('isShortMovies')) || false

    const defaultMaxVisibleMovies = (() => {
        if (window.innerWidth <= 749) {
            return 5;
        } else if (window.innerWidth <= 1024) {
            return 8;
        } else if (window.innerWidth <= 1149) {
            return 15;
        } else {
            return 16;
        }
    })();

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
        if (isShortMovies !== null) {
            localStorage.setItem('isShortMovies', isShortMovies.toString());
        }
    }, [isShortMovies]);

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('allMovies'));
        if (storedMovies) {
            setSearched(true);
            setAllMovies(storedMovies);

            if (isShortMovies) {
                const shortMovies = storedMovies.filter(({ duration }) => duration <= 40);
                setShortMovies(shortMovies);
                setRenderMovies(shortMovies);
            } else {
                setShortMovies([]);
                setRenderMovies(storedMovies);
            }
        }
    }, [isShortMovies]);

    useEffect(() => {
        mainApi.getMovies()
            .then((data) => {
                setSavedMovies(data);
            })
            .catch((err) => {
                console.log(err);
                openPopupError(true);
            });
    }, [isShortMovies]);

    function findMovie(filter) {
        setIsLoading(true);
        setMaxVisibleMovies(defaultMaxVisibleMovies);
        moviesApi.getMovies()
            .then((data) => {
                let filteredMovies = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(filter.toLowerCase()));
                setAllMovies(filteredMovies);
                setShortMovies(filteredMovies.filter(({ duration }) => duration <= 40))
                localStorage.setItem('allMovies', JSON.stringify(filteredMovies));

                if (isShortMovies === true) {
                    setRenderMovies(allMovies)
                } else {
                    setRenderMovies(shortMovies)
                }

                setSearched(true);
            })
            .catch((error) => {
                console.log(`${error}`);
                openPopupError(true)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleCheckboxChange() {
        setIsShortMovies(!isShortMovies);
        if (isShortMovies === true) {
            setRenderMovies(allMovies)
        } else {
            setRenderMovies(shortMovies)
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

        const newMaxVisibleMovies = maxVisibleMovies + cardsToAdd;

        if (isShortMovies) {
            if (newMaxVisibleMovies >= shortMovies.length) {
                setMaxVisibleMovies(shortMovies.length);
            } else {
                setMaxVisibleMovies(newMaxVisibleMovies);
            }
        } else {
            if (newMaxVisibleMovies >= allMovies.length) {
                setMaxVisibleMovies(allMovies.length);
            } else {
                setMaxVisibleMovies(newMaxVisibleMovies);
            }
        }
    }

    function updateVisibleMovies() {
        if (!isShortMovies) {
            const moviesToShow = allMovies.slice(0, maxVisibleMovies);
            return moviesToShow;
        } else {
            const moviesToShow = shortMovies.slice(0, maxVisibleMovies);
            return moviesToShow;
        }
    }

    useEffect(() => {
        if (searched) {
            const updatedRenderMovies = updateVisibleMovies();
            setRenderMovies(updatedRenderMovies);
        }
    }, [maxVisibleMovies, searched, isShortMovies, allMovies, shortMovies]);

    return (
        <main className="movies">
            <SearchForm findMovie={findMovie} handleCheckboxChange={handleCheckboxChange} isShortMovies={isShortMovies} />
            {isLoading ? (
                <div className="preloader">
                    <span className="loader"></span>
                </div>
            ) : (
                <>
                    {searched && renderMovies.length === 0 ? (
                        <p>Ничего не найдено</p>
                    ) : (
                        <>
                            {searched && <MoviesCardList movies={renderMovies} savedMovies={savedMovies} openPopupError={openPopupError} />}
                            <button
                                className="movies__moreMovies-btn"
                                onClick={loadMoreMovies}
                                style={{ display: maxVisibleMovies < (isShortMovies ? shortMovies.length : allMovies.length) ? 'block' : 'none' }}
                            >
                                Еще
                            </button>
                        </>
                    )}
                </>
            )}
        </main>
    );
}

export default Movies;
