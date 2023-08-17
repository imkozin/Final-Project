import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { TextField, Button } from "@mui/material";
import Footer from "./Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, { email, password });
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
        <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${process.env.PUBLIC_URL}/login.jpg)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh',
        }}>
            <div style={{
            backgroundColor: '#000',
            opacity: '0.8',
            width: '400px',
            height: '600px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
        }}>
            <form onSubmit={handleSubmit} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1 style={{ color: '#FFF', fontFamily: 'Inter', marginBottom: '25px' }}>Sign In</h1>
                <TextField
                    error
                    id="filled-error"
                    label="E-mail"
                    variant="filled"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    required
                    style={{
                        width: '80%',
                        marginBottom: '25px',
                    }}
                    inputProps={{
                        style: {
                            backgroundColor: 'gray',
                            borderRadius: '5px',
                            border: '1px solid white'
                        },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    error
                    id="filled-error"
                    label="Password"
                    variant="filled"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={password}
                    required
                    style={{
                        width: '80%',
                        marginBottom: '25px', 
                    }}
                    inputProps={{
                        style: {
                            backgroundColor: 'gray',
                            borderRadius: '5px',
                            border: '1px solid white'
                        },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    style={{
                        width: '80%',
                        backgroundColor: 'red',
                        color: 'white',
                        marginBottom: '25px'
                    }}
                >
                    Sign In
                </Button>
                {error && <div className="error_msg">{error}</div>}
            </form>
            <div style={{ fontFamily: 'Inter', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px' }}>
                <p style={{color: 'gray', marginRight: '10px'}}>New to Bookflix?</p>
                <Link to="/register" 
                style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                }}>Sign up now.</Link>
            </div>
        </div>
    </div>
    <div >
        <Footer />
    </div>
    </>
    );    
}

export default Login;