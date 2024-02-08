import React, { useState } from 'react';
import './LicensePage.css';
import { useNavigate} from 'react-router-dom';

const License = () => {
    const navigate = useNavigate();
const handleHome = () => {
    navigate(`/`)
}
    const [licenseData, setLicenseData] = useState({
        name: '',
        licenseNumber: '',
        dateOfBirth: ''
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData({ ...licenseData, [name]: value });
    };

    return (
        <div className="license-container">
            <h2>Driving License Information</h2>
            <form className="license-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={licenseData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="licenseNumber">License Number:</label>
                    <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={licenseData.licenseNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={licenseData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Add more fields as needed */}
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <div className="license-card">
                <h3>Driving License Card</h3>
                <p><strong>Name:</strong> {licenseData.name}</p>
                <p><strong>License Number:</strong> {licenseData.licenseNumber}</p>
                <p><strong>Date of Birth:</strong> {licenseData.dateOfBirth}</p>
                {/* Display more license details */}
            </div>
            <button onClick={handleHome}>Home Page</button>
        </div>
    );
};

export default License;
