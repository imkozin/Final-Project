import jwt_decode from 'jwt-decode';
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
import Favorites from './Favorites';

const Main = () => {
    const {isLoggedIn, setIsLoggedIn, favorites } = useAppContext();

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
            {isLoggedIn ? (
            <div>
                {favorites.length > 0 ?
                <Favorites title="My List"/> : <></>}
                <Popular title="Popular on Bookflix"/>
                <Trending title="Trending Now"/>
                <Gems title={`Top Picks for ${isLoggedIn}`}/>
                <Thriller title="Thrillers"/>
                <Romance title="Romance"/>
                <Classic title="Classics"/>
                <Historical title="History"/>
                <Fiction title="Science Fiction"/>
            </div>
            ) : (
            <div>
                <Popular title="Popular on Bookflix"/>
                <Trending title="Trending Now"/>
                <Gems title="Top Rated"/>
                <Thriller title="Thrillers"/>
                <Romance title="Romance"/>
                <Classic title="Classics"/>
                <Historical title="History"/>
                <Fiction title="Science Fiction"/>
            </div>
            )}
        </>
    )
}

export default Main;