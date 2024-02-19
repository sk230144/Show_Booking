// src/components/AudioPlayer.js
import React, { useState, useEffect } from 'react';
import './upload.css'

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load playlist from local storage (if available)
    const savedPlaylist = JSON.parse(localStorage.getItem('audioPlaylist'));
    if (savedPlaylist) {
      setPlaylist(savedPlaylist);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const audioUrl = URL.createObjectURL(e.target.files[0]);
      setPlaylist([...playlist, audioUrl]);
      localStorage.setItem('audioPlaylist', JSON.stringify([...playlist, audioUrl]));
    }
  };

  const handlePlayNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  return (
    <div className="audio-player-container"> {/* Apply styles from AudioPlayer.css */}
    <h2 className="audio-title">Audio Player</h2>
      <audio  className="audio-element" controls src={playlist[currentTrackIndex]}>
        Your browser does not support the audio element.
      </audio>
      <input className="file-input" type="file" onChange={handleFileChange} />
      <button className="play-next-button" onClick={handlePlayNext}>Play Next</button>
    </div>
  );
};

export default AudioPlayer;
