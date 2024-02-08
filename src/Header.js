// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

function Header() {
  return (
    <header style={headerStyle}>
      <div style={siteNameStyle}>
        Driver Licence
      </div>
      <div>
      <Link to={`/profile/`}>View Profile</Link>
      </div>
    </header>
  );
}

// Styles
const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#fff',
  fontWeight: 'bold',
};

const siteNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold'
};

export default Header;
//${user._id}