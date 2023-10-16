import React, { useState } from 'react';
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext"


import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Register from "../sign-data/Register";
import Profile from "../Profile/Profile";
import Login from "../sign-data/Logins";
import Result404 from "../Result404/Result404";
import PopupMenu from "../PopupMenu/PopupMenu";
import SavedMovies from "../SavedMovies/SavedMovies"
import * as auth from "../../utils/Auth"
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRoute";
import { mainApi } from "../../utils/MainApi.js";
import InfoTooltip from "../Popup/popup";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isProfileMenuActive, setisProfileMenuActive] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isPopupInfoTooltipOpen, setIsPopupInfoTooltipOpen] = useState(false)
  const [isPopupCorret, SetisPopupCorret] = useState(false)

  const { pathname } = useLocation();

  const navigate = useNavigate()

  function openPopupProfile() {
    setisProfileMenuActive(!isProfileMenuActive)
  }

  function closePopup() {
    setisProfileMenuActive(false)
    setIsPopupInfoTooltipOpen(false)
  }

  function openPopupCorrect() {
    setIsPopupInfoTooltipOpen(true)
    SetisPopupCorret(true)
  }

  function openPopupError() {
    setIsPopupInfoTooltipOpen(true)
  }

  useEffect(() => {
    if (loggedIn) {
      mainApi.profileDataInstall()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((error) => {
          console.log(`${error}`);
        })

      tokenCheck();
    }
  }, [loggedIn])

  function tokenCheck() {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            console.log(res)
            setLoggedIn(true);
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleUpdateUser(data) {
    mainApi.setProfileInfo(data)
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((error) => {
        console.log(`${error}`);
      })
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  function handleRegister(values, setValues) {
    auth.register(values.email, values.password, values.name)
      .then((res) => {
        if (res) {
          navigate('/movies', { replace: true })
          setIsPopupInfoTooltipOpen(true)
          SetisPopupCorret(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleLogin(values, setValues) {
    if (!values.email || !values.password) {
      return;
    }
    auth.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          // SetisPopupCorret(true);
          setValues({ email: '', password: '' });
          setLoggedIn(true);
          setIsPopupInfoTooltipOpen(true)
          SetisPopupCorret(true)
          navigate('/movies', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
          <Header loggedIn={loggedIn} openPopupProfile={openPopupProfile} /> : ''}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/movies" element={<ProtectedRouteElement element={Movies} loggedIn={loggedIn} />} />
          <Route path="saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} />} />
          <Route path="/profile" element={
            <ProtectedRouteElement
              element={Profile}
              signOut={signOut}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              openPopupCorrect={openPopupCorrect}
              openPopupError={openPopupError}
            />
          } />
          <Route path="/*" element={<Result404 />} />
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}

        <PopupMenu isPopupRender={isProfileMenuActive} closePopup={closePopup} />
        <InfoTooltip isOpen={isPopupInfoTooltipOpen} onClose={closePopup} isPopupCorret={isPopupCorret} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

