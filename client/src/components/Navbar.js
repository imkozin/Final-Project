import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';


const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login');
        setIsLoggedIn(false);
    }

    return (
        <>
            <div>
                <Button component={Link} to="/main">Home</Button>
                {!isLoggedIn && (<Button component={Link} to="/register">Sign Up</Button>)}
                {!isLoggedIn && (<Button component={Link} to="/login">Login</Button>)}
                {isLoggedIn && <Button component={Link} to="/favorites">Favorites</Button>}
                {isLoggedIn && (
                <Button onClick={logout}>
                    Logout
                </Button>)}
            </div>
        </>
    )
}

export default Nav;