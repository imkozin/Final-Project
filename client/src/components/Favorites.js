import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { getCurrentUser } from '../helpers/utils';
import Loading from './Loading';

const Favorites = ({title}) => {
    const { favorites, setFavorites, isLoading, setIsLoading } = useAppContext()
    const username = getCurrentUser();
    const favoritesKey = `favoritesOf${username}`;

    useEffect(() => {
        const storedFavorites = localStorage.getItem(favoritesKey);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const navigate = useNavigate();

    const addToFavorites = (book) => {
        const oldFavorites = [...favorites];
        const newFavorites = oldFavorites.concat(book);
        localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const removeFromFavorites = (id) => {
        const oldFavorites = [...favorites];

        const newFavorites = oldFavorites.filter((book) => book.id !== id);
        localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    }

    const checkFavorite = (id) => {
        const isFavorite = favorites.some((book) => book.id === id);
        return isFavorite;
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div style={{ textAlign: "start" }}>
                        <h1>{title}</h1>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', border: "5px solid black", height: "320px" }}>
                        {favorites.length > 0 ? 
                            favorites.map((book) => (
                                <div key={book.id} style={{ margin: '5px 10px' }}>
                                    <img src={book.image_url} alt={book.title} style={{ width: "200px", height: "300px", cursor: "pointer" }} onClick={() => navigate(`/book/${book.id}`)} />
                                    {/* {checkFavorite(book.id) ? 
                                        <Button size="small" color="primary" onClick={() => removeFromFavorites(book.id)}>
                                            Remove from Favorites
                                        </Button> :
                                        <Button size="small" color="primary" onClick={() => addToFavorites(book)}>
                                            Add to Favorites
                                        </Button>
                                    } */}
                                </div>
                            ))  : <h1>You don't have any favorite books yet</h1>
                        }
                    </div>
                </>
            )}
        </>
    );
}    

export default Favorites;