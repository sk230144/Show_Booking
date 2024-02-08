import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './components/User';
import ShowDetails from './components/ShowDetails';
import Book from './components/Book';
import WeatherApp from './weather/Weather';
import Quiz from './Licence/Exam';
import AdvicePage from './Licence/Performance';
import Licence from './Licence/Licence';
import Last from './ShowLic/Last';
import Registration from './Registeration/Registration';
import Login from './Login/Login';
import { AuthProvider } from './Login/AuthContext';
import Header from './Header';
import Profile from './Licence/Profile';
import Protected from './Protected';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  // <Route path="/" element={<Quiz />} ></Route>
  return (
    <>
      <Router>
        <Routes>
      
          <Route path='/' element={ <Protected isLoggedIn={isLoggedIn}>
          <Quiz />
          </Protected>} exact></Route>
          <Route path="/registration" element={<Registration />} ></Route>
          <Route path="/login" element={<Login setisLoggedIn={setisLoggedIn} />} ></Route>
          <Route path="/performance" element={<AdvicePage />} />
          <Route path="/licence" element={<Last />} />
          <Route path="/profile" element={<Profile />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;

// <Router>
//       <Routes>
//         <Route path="/" element={<User />} ></Route>
//         <Route path="/show/:id" element={<ShowDetails />} />
//         <Route path="/book/:id" element={<Book/>} />
//         </Routes>
//         </Router>
