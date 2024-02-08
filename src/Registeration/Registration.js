import React, { useState } from "react";
import './registration.css'
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");

    const navigate = useNavigate();

    async function registerUser(e) {
        e.preventDefault();
        try {
           
            const response = await fetch('http://localhost:1337/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    address,
                    number
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to register');
            }
    
            const data = await response.json();
            console.log(data);
            // Provide user feedback here if necessary
            navigate(`/`);
        } catch (error) {
            console.error('Registration error:', error.message);
            // Provide user feedback about the error
            // Display an error message on the UI
        }
    }
    
    
    return (
        <div className="reg-cont">
            <h1>Registration</h1>
            <form onSubmit={registerUser}>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /> <br />
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" /><br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email Address" /><br />
                <input value={number} onChange={(e) => setNumber(e.target.value)} type="text" placeholder="Contact Number" /><br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" /> <br />
                <input type="submit" value="Register" />
                <p>If you are already registered <Link to='/login'>login</Link>from here</p>
            </form>
        </div>
    );
};

export default Registration;
