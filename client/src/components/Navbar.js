import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode';
import { useAppContext } from './AppContext';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Nav = () => {
    const { isLoggedIn, setIsLoggedIn } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(jwt_decode(token));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location]);

    const logout = async () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: 'black', zIndex: '1' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <div style={{ zIndex: '2' }}>
                    <img onClick={() => navigate(`/main`)} src={`${process.env.PUBLIC_URL}/bookflix_2.jpg`} alt="Logo" style={{ marginRight: '10px', height: '30px' }} />
                </div>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Button component={Link} to="/books" style={{ color: 'white' }}>
                                Books
                            </Button>
                            <Button component={Link} to="/favorites" style={{ color: 'white' }}>
                                My List
                            </Button>
                            <Button onClick={logout} style={{ color: 'white' }}>
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/register" style={{ color: 'white', backgroundColor: 'red', margin: '15px' }}>
                                Sign Up
                            </Button>
                            <Button component={Link} to="/login" style={{ color: 'white', backgroundColor: 'red' }}>
                                Sign In
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}
export default Nav;