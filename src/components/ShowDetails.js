import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './show.css'

function ShowDetails() {
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

  return (
    <div className="ShowDetails">
      {show ? (
        <div>
          <h1>{show.name}</h1>
          <img src={show.image ? show.image.medium : 'https://via.placeholder.com/300'} alt={show.name} />
          <h4>{show.summary}</h4>
          <p>Language: {show.language}</p>
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Status: {show.status}</p>
          <p>Premiered: {show.premiered}</p>
          <p>Rating: {show.rating.average}</p>
          <p>Official Site: <a href={show.officialSite} target="_blank" rel="noopener noreferrer">{show.officialSite}</a></p>
          <Link to={`/book/${show.id}`} className="show-button">Book Show</Link>
        </div>
      ) : (
        <p>Loading show details...</p>
      )}
    </div>
  );
}

export default ShowDetails;
