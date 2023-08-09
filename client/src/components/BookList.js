import { useEffect, useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useAppContext } from "./AppContext";
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const URL = 'https://example-data.draftbit.com/books?';
    
    const [books, setBooks] = useState([]);
    const { favorites, addToFavorites, removeFromFavorites} = useAppContext();

    const navigate = useNavigate();

    const checkFavorite = (id) => {
        const isFavorite = favorites.some((book) => book.id === id);
        return isFavorite;
    }

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        try {
            const res = await axios.get(URL);
            console.log(res);
            setBooks(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    return(
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
                        Remove from Favorites
                        </Button> :
                        <Button size="small" color="primary" onClick={()=> addToFavorites(book)}>
                        Add to Favorites
                        </Button>}
                    </CardActions>
                </Card>
                ))}
        </div>
    )
}

export default BookList;