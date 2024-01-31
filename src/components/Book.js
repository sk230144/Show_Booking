import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './book.css'

function Book({ showId, movieName }) {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    fetchShowDetails();
  }, [id]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    quan: '',
  });
  const navigate = useNavigate(); // Use useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Store userData and movieName in local storage
  //   const bookingData = {
  //     userData: userData,
  //     movieName: movieName
  //   };
  //   localStorage.setItem('bookingData', JSON.stringify(bookingData));
  //   // Perform booking logic here (e.g., send booking request to server)
  //   console.log('Booking request submitted:', bookingData);
  //   // Redirect user back to home page after booking
  //   navigate(`/`);
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Store userData and movieName in local storage
    const bookingData = {
      userData: {
        ...userData,
        movieName: show.name // Include show name in userData
      }
    };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    // Perform booking logic here (e.g., send booking request to server)
    console.log('Booking request submitted:', bookingData);
    // Redirect user back to home page after booking
    navigate(`/`);
  };
  



  return (
    <>
    <div className="ShowDetails">
      {show ? (
        <div>
          <h1>Movie Details</h1>
          <p>Name: {show.name}</p>
          <p>Language: {show.language}</p>
        </div>
      ) : (
        <p>Loading show details...</p>
      )}
    </div>


    <div className="Book">
      <h2>Book Tickets for {movieName}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={userData.phone} onChange={handleInputChange} required />
        </div>

        <div>
        <label htmlFor="quan">No of tickets:</label>
        <input type="text" id="quan" name="quan" value={userData.quan} onChange={handleInputChange} required />
      </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
    </>
  );
}

export default Book;
