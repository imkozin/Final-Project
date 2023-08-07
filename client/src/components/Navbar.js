// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import jwt_decode from 'jwt-decode';

// const Nav = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             console.log(jwt_decode(token));
//             setIsLoggedIn(true);
//         }
//     },[isLoggedIn])

//     const navigate = useNavigate();

//     const logout = async () => {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         // window.location.reload();
//         navigate('/login');
//     }

//     return (
//         <>
//             <div>
//                 <Button component={Link} to="/main">Home</Button>
//                 {isLoggedIn ? (<><Button component={Link} to="/favorites">Favorites</Button>
//                      <Button onClick={logout}>
//                      Log Out
//                  </Button></>
                    
//                 ) : (
//                     <>
//                     <Button component={Link} to="/register">Sign Up</Button> 
//                     <Button component={Link} to="/login">Login</Button>
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

// export default Nav;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <>
            <div>
                <Button component={Link} to="/main">Home</Button>
                {isLoggedIn ? (
                    <>
                        <Button component={Link} to="/favorites">Favorites</Button>
                        <Button onClick={logout}>
                            Log Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/register">Sign Up</Button>
                        <Button component={Link} to="/login">Login</Button>
                    </>
                )}
            </div>
        </>
    )
}
export default Nav;