import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from 'axios';

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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(${process.env.PUBLIC_URL}/sign.jpg)`,
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
                    <form style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }} 
                        onSubmit={handleSubmit}>
                        <h1 style={{ color: '#FFF', fontFamily: 'Inter', marginBottom: '25px' }}>Sign Up
                        </h1>
                        <TextField
                            error
                            id="filled-error"
                            label="Username"
                            variant="filled"
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={name}
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
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            Sign Up
                        </Button>
                        {error && <div className="error_msg">{error}</div>}
                    </form>
                    <div style={{ fontFamily: 'Inter', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px' }}>
                        <p style={{color: 'gray', marginRight: '10px'}}>Already have an account?</p>
                        <Link to="/login" 
                        style={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                        }}>Sign In here.</Link>
                    </div>
                </div>
            </div>
    )
}

export default Signup;