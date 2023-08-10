import jwt_decode from 'jwt-decode';
import BookList from './BookList';
import { useEffect } from "react";
import { useAppContext } from './AppContext';

const Main = () => {
    const {isLoggedIn, setIsLoggedIn } = useAppContext();

    useEffect(() => {

        const token = localStorage.getItem('token');
            if (token) {
                const username = jwt_decode(token).name;
                setIsLoggedIn(username);
            } else {
                setIsLoggedIn(false);
            } 
    }, []);

    return (
        <>{isLoggedIn && (
            <h1>
                Welcome to BOOKFLIX, {isLoggedIn}
            </h1>
            )}
            <BookList/>
        </>
    )
}

export default Main;