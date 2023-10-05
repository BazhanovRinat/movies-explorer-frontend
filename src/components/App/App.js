import React, { useState } from 'react';

import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from "../Footer/Footer";
import { Route, Routes } from 'react-router-dom';
import Movies from "../Movies/Movies";
import Register from "../sign-data/Register";
import Profile from "../Profile/Profile";
import Login from "../sign-data/Logins";
import Result404 from "../Result404/Result404";
import PopupMenu from "../PopupMenu/PopupMenu";
import SavedMovies from "../SavedMovies/SavedMovies"

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<Result404 />} />
      </Routes>
      <Footer />

      <PopupMenu />
    </div>
  );
}

export default App;
