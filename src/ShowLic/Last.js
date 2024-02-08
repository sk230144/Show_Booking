import React, { useState } from 'react';
import './last.css';
import { useNavigate } from 'react-router-dom';

const Last = () => {
    const [licenseData, setLicenseData] = useState({
        name: '',
        licenseNumber: generateLicenseNumber(),
        dateOfBirth: '',
        identificationNumber: '',
        address: '', // New field for address
        image: null
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData({ ...licenseData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setLicenseData({ ...licenseData, image: file });
    };

    const handleHome = () => {
        navigate(`/`);
    };

    const handleDownload = () => {
        const licenseText = `Name: ${licenseData.name}\nLicense Number: ${licenseData.licenseNumber}\nDate of Birth: ${licenseData.dateOfBirth}\nIdentification Number: ${licenseData.identificationNumber}\nAddress: ${licenseData.address}`;
        const element = document.createElement('a');
        const file = new Blob([licenseText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'driving_license.txt';
        document.body.appendChild(element);
        element.click();
    };

    function generateLicenseNumber() {
        return Math.random().toString(36).substr(2, 9);
    }

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
                <div className="form-group">
                    <label htmlFor="identificationNumber">Identification Number(Adhar Card/Voter Id):</label>
                    <input
                        type="text"
                        id="identificationNumber"
                        name="identificationNumber"
                        value={licenseData.identificationNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={licenseData.address}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </div>
            </form>
            <h3>Driving License Card</h3>
            <div className="license-card">
                <div className='data-sec'>
                <p><strong>License Number:</strong> {licenseData.licenseNumber}</p>
                    <p><strong>Name:</strong> {licenseData.name}</p>
                    <p><strong>Date of Birth:</strong> {licenseData.dateOfBirth}</p>
                    <p><strong>Identification Number:</strong> {licenseData.identificationNumber}</p>
                    <p><strong>Address:</strong> {licenseData.address}</p>
                </div>
                <div className='image-sec'>
                    {licenseData.image && (
                        <img src={URL.createObjectURL(licenseData.image)} alt="License" />
                    )}
                </div>
            </div>
            <button type="button" onClick={handleDownload} className="submit-button">Download License</button>
        </div>
    );
};

export default Last;
