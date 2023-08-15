import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";
import Movie from "./Movie";
import Loading from "./Loading";
import { getCurrentUser } from "../helpers/utils";
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

const BOOK_URL = 'https://example-data.draftbit.com/books';

const BASE_URL = process.env.REACT_APP_BASE_URL

const Book = () => {
    const {book, setBook, favorites, setFavorites, isLoading, setIsLoading} = useAppContext()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const username = getCurrentUser();
    const favoritesKey = `favoritesOf${username}`;

    const { id } = useParams();
    
    const getBook = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${BOOK_URL}/${id}`);
            console.log(res);
            setBook(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
        setIsLoading(false);
    };

    const getReview = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/reviews/${id}`);
            if (res && res.data) {
                console.log(res);
                setReviews(res.data);
                console.log('Server response:', res.data);
            } else {
                console.log("No data found in the response.");
            }
        } catch (err) {
            console.log(err.response ? err.response.data.msg : 'Error fetching reviews.');
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        getBook();
        getReview();
    }, [refresh]);

    const submitReview = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found');
            return;
        }

        console.log('Retrieved token:', token);
    
            const headers = {
                'x-access-token': token,
            };
    
            console.log('Submitting review...');
            const res = await axios.post(`http://localhost:3030/api/reviews`, { id, title, text }, { headers });
            if (res.status === 200) {
                console.log('Review submitted successfully!');
                const data = await res.data;
                console.log('Server response:', data);
                setRefresh(refresh?false:true);
            } else {
                console.log('Review submission failed.');
                setError("Review wasn't added");
            }
        } catch (err) {
            console.error('Error during review submission:', err.response.data);
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Something went wrong');
            }
        }
    };

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
    

    return(
        <div style={{ display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <img src={book?.image_url} alt="book-cover"></img>    
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: "space-between", textAlign: 'start', width: "700px" }}>
                <h1 style={{textAlign: 'center' }}>{book?.title}</h1>
                <p><b>Author: </b>{book?.authors}</p>
                <p><b>Genre: </b>{book?.genres}</p>
                <p><b>Pages: </b>{book?.num_pages}</p>
                <p>{book?.description}</p>
                {checkFavorite(book.id) ? <Button size="small" color="primary" onClick={()=> removeFromFavorites(book.id)}>
                        Don't Like <HeartBrokenIcon/>
                        </Button> :
                        <Button size="small" color="primary" onClick={()=> addToFavorites(book)}>
                        Like <FavoriteIcon/>
                        </Button>}

                <form onSubmit={submitReview}>
                    Title: <input type="text"         name="title"
                            value={title}
                            required 
                            onChange={(e) => setTitle(e.target.value)}/>
                    Review: <textarea 
                    name="text"
                    value={text}
                    required 
                    onChange={(e) => setText(e.target.value)}/>
                    <button type="submit">Post</button>
                </form>
                <div>
                    <div>
                        {reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <div key={rev.id}>
                                    <h1>{rev.title}</h1>
                                    <p>{rev.text}</p>
                                    <p>{rev.date}</p>
                                    <p>Posted by: {rev.username}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first one</p>
                        )}
                    </div>
                </div>

            </div>
            <div>
                <Movie book={book}/>
            </div>
        </div>
    )
}

export default Book;