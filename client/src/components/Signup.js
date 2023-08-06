import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import {Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3030/register', {name, email, password})
            if (res.status === 200) {
                const data = await res.data;
                console.log(data);
                navigate('/login');
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Something went wrong');
            }
        }
    }

    return (
        <div className="signup_container">
			<div className="signup_container-form">
				<div className="signup-left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sign In
						</button>
					</Link>
				</div>
                <div className="signup-right">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <h1>Create Account
                        </h1>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={name}
                            required className="input"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={email}
                            required className="input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            required className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="green_btn">Sign Up</button>
                        {error && <div className="error_msg">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;