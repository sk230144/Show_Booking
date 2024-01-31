import React, { useState, useEffect } from 'react';
import './user.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';



const User = () => {
  const [shows, setShows] = useState([]);
  
  useEffect(() => {
    fetchShows();
  }, []);
  const navigate = useNavigate()

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  return (
    <div className="User">
      <h1>TV Shows</h1>
      <div className="show-container">
        {shows.map(({ show }) => (
          <div className="show" key={show.id}>
            <img src={show.image ? show.image.medium : 'https://via.placeholder.com/100'} alt={show.name} />
            <div>
              <h3>{show.name}</h3>
              <Link to={`/show/${show.id}`} className="user-button">
              View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
