import { useEffect, useState } from "react";
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useNavigate } from 'react-router-dom';
import { useAppContext, Loading } from "./AppContext";
import { getCurrentUser } from "../helpers/utils";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const { favorites, setFavorites, isLoading, setIsLoading } = useAppContext();
    const username = getCurrentUser();
    const favoritesKey = `favoritesOf${username}`;

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getBooks();
    }, [])

    const getBooks = async () => {
        try {
            const res = await axios.get(BASE_URL);
            console.log(res);
            setBooks(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    }

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
        { isLoading ? (
            <Loading /> 
            ) : (
        <div  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {books.map((book) => (
                <Card key={book.id} sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        image={book.image_url}
                        alt="book cover" onClick={() => navigate(`/book/${book.id}`)}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {book.title}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {checkFavorite(book.id) ? <Button size="small" color="primary" onClick={()=> removeFromFavorites(book.id)}>
                        Don't Like <HeartBrokenIcon/>
                        </Button> :
                        <Button size="small" color="primary" onClick={()=> addToFavorites(book)}>
                        Like <FavoriteIcon/>
                        </Button>}
                    </CardActions>
                </Card>
                ))}
            </div>
         )}
        </>
    )
}

export default BookList;