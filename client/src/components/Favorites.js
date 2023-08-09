import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { getCurrentUser } from '../helpers/utils';

const Favorites = () => {
    const { favorites, setFavorites } = useAppContext()
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {favorites.length > 0 ? 
                favorites.map((book) => (
                <Card key={book.id} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        image={book.image_url}
                        alt="book cover"
                        onClick={() => navigate(`/book/${book.id}`)}/>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {checkFavorite(book.id) ? <Button size="small" color="primary" onClick={()=> removeFromFavorites(book.id)}>
                        Remove from Favorites
                        </Button> :
                        <Button size="small" color="primary" onClick={()=> addToFavorites(book)}>
                        Add to Favorites
                        </Button>}
                    </CardActions>
                </Card>
                ))  : <h1>You don't have any favorite books yet</h1>}
        </div>
    )
}

export default Favorites;