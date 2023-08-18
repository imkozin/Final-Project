import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";
import Movie from "./Movie";
import Loading from "./Loading";
import { getCurrentUser } from "../helpers/utils";
import { Button, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { styled } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Modal from 'react-modal';

const BOOK_URL = 'https://example-data.draftbit.com/books';

const BASE_URL = process.env.REACT_APP_BASE_URL

const TextArea = styled(Textarea)({
    backgroundColor: 'black',
    border: '1px solid red',
    color: 'white',
    width: '75%',
    marginBottom: '20px'
  });

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
    
    const formatDate = (isoDateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(isoDateString).toLocaleString(undefined, options);
      };

    return(
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'start'}}>
            <div >
                <img src={book?.image_url} alt="book-cover" style={{ width: 275, height: 400, borderRadius: '5px'}}></img>    
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: "space-around", textAlign: 'start', width: "700px" }}>
                <h1 style={{textAlign: 'center', marginBottom: '20px' }}>{book?.title}</h1>
                <p style={{marginBottom: '20px' }}><b>Author: </b>{book?.authors}</p>
                <p style={{marginBottom: '20px' }}><b>Genre: </b>{book?.genres}</p>
                <p style={{marginBottom: '20px' }}><b>Pages: </b>{book?.num_pages}</p>
                <p style={{marginBottom: '20px' }}>{book?.description}</p>
                <div style={{marginBottom: '20px' }}>
                {checkFavorite(book.id) ? <Button size="small" color="primary" onClick={()=> removeFromFavorites(book.id)} style={{color: 'white' }}>
                        Remove from My List<ThumbDownOffAltIcon style={{color: 'white', marginLeft: '10px'}}/>
                        </Button> :
                        <Button size="small" color="primary" onClick={()=> addToFavorites(book)} style={{color: 'white'}}>
                        Add to My List <AddCircleOutlineIcon style={{color: 'white', marginLeft: '10px'}}/>
                        </Button>}
                </div>
                <form onSubmit={submitReview} style={{borderTop: '1px solid white', borderBottom: '1px solid white'}}>
                    <h2 style={{
                            margin: '20px 0',
                        }}>Add Your Review</h2>
                    <TextField
                        error
                        label="Title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            marginBottom: '20px'
                        }}
                        inputProps={{
                            style: {
                                borderRadius: '5px',
                                color: 'white'
                            },
                        }}/>
                    <TextArea
                        name="review"
                        variant="outlined"
                        color="danger"
                        value={text}
                        required
                        onChange={(e) => setText(e.target.value)}
                        minRows={4}
                    />
                    <Button type="submit" style={{ color: 'white', backgroundColor: 'red', marginBottom: '20px' }}>
                        Post
                    </Button>
                </form>
                <div>
                    <div>
                    <h2 style={{
                            margin: '20px 0',
                        }}>User Reviews:</h2>
                        {reviews.length > 0 ? (
                            reviews.map((rev) => (
                                <div key={rev.id} style={{ borderBottom: '1px solid white', marginBottom: '20px'}}>
                                    <h3 style={{marginBottom: '15px'}}>Title: {rev.title}</h3>
                                    <p style={{marginBottom: '15px'}}><b>Review text: </b>{rev.text}</p>
                                    <p style={{marginBottom: '15px'}}></p>
                                    <p style={{marginBottom: '15px'}}>Posted by: {rev.username} on {formatDate(rev.date)}</p>
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