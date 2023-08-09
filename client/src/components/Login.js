import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3030/login', { email, password });
            if (res.status === 200) {
                const { token } = res.data;
                localStorage.setItem('token', token);
                const data = await res.data;
                console.log("user data=>", data);
                navigate('/main');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.log(err);
            setError('Something went wrong');
        }
    };
    

    return (
        <div className="login_container">
            <div className="login_container-form">
                <div className="login-left">
                <form className="form-container"onSubmit={handleSubmit}>
                        <h1>Login Into Your Account
                        </h1>
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
                        <button type="submit" className="green_btn">Sign In</button>
                        {error  && <div className="error_msg">{error}</div>}
                    </form>
                </div>
                <div className="login-right">
                <h1>New Here ?</h1>
                    <Link to="/register">
                        <button type="button" className="white_btn">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;