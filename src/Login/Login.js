import React, { useState } from "react";
import './Login.css'
import { Link, useNavigate } from "react-router-dom";

const Login = ({setisLoggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    async function loginUser(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:1337/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, password
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
                
            }
    
            const data = await response.json();
            console.log(data);
            if(data.user){
                localStorage.setItem('token', data.user);
                alert('Login Successfully')
                setisLoggedIn(true);
            navigate(`/`);
            } else{
                alert('Please Check Your username and Password')
            }
        } catch (error) {
            console.error('Login error:', error.message);
            navigate(`/login`);
            // Provide user feedback about the error
        }
    }
    


    
    return (
        <div className="reg-cont">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email Address" /><br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" /> <br />
                <input type="submit" value="Login" />
                <Link className="reg-btn" to='/registration'>Register Now</Link>
            </form>
        </div>
    );
};

export default Login;
