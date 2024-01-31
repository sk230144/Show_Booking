import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './components/User';
import ShowDetails from './components/ShowDetails';
import Book from './components/Book';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} ></Route>
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/book/:id" element={<Book/>} />
        </Routes>
        </Router>
  );
}

export default App;
