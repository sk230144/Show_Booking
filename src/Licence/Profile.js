// Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import your CSS file

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:1337/api/users/${editingUser._id}`, formData);
      console.log('User updated:', response.data);
      setUsers(users.map(user => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="user-container">
      {users.map(user => (
        <div key={user._id} className="user-box">
          {editingUser && editingUser._id === user._id ? (
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <button onClick={handleUpdateUser}>Save</button>
            </div>
          ) : (
            <div>
              <h2>{user.name}</h2>
              <div className="user-info">
                <span>Email:</span> {user.email}<br />
                <span>Name</span> {user.name}<br />
                <span>Address:</span> {user.address}<br />
                <span>Phone Number</span> {user.number}<br />
              </div>
              <button onClick={() => handleEditClick(user)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
