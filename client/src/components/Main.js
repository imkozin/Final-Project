import jwt_decode from 'jwt-decode';
import BookList from './BookList';
import { useEffect } from "react";
import { useAppContext } from './AppContext';
import Popular from './Popular';
import Trending from './Trending';
import Gems from './Gems';
import Thriller from './Thrillers';
import Romance from './Romance';
import Classic from './Classics';
import Historical from './Historical';
import Fiction from './Fiction';

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
        <>
            {isLoggedIn && (
            <h1>
                Welcome to BOOKFLIX
            </h1>
            )}
            {/* <BookList/> */}
            <Popular title="Popular on Bookflix"/>
            <Trending title="Trending Now"/>
            <Gems title={`Top Picks for ${isLoggedIn}`}/>
            <Thriller title="Thrillers"/>
            <Romance title="Romance"/>
            <Classic title="Classics"/>
            <Historical title="History"/>
            <Fiction title="Science Fiction"/>
        </>
    )
}

export default Main;