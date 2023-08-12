import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";
import Movie from "./Movie";
import Loading from "./Loading";

const BOOK_URL = 'https://example-data.draftbit.com/books';

const Book = () => {
    const {book, setBook, isLoading, setIsLoading} = useAppContext()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const { id } = useParams();
    
    const getBook = async () => {
        try {
            const res = await axios.get(`${BOOK_URL}/${id}`);
            console.log(res);
            setBook(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
        setIsLoading(false);
    };

    console.log("book", typeof book.title);

    useEffect(() => {
        setIsLoading(true);
        getBook();
    }, [id]);

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
            const res = await axios.post(`http://localhost:3030/api/reviews`, { title, text }, { headers });
            if (res.status === 200) {
                console.log('Review submitted successfully!');
                const data = await res.data;
                console.log('Server response:', data);
            } else {
                console.log('Review submission failed.');
                setError("Review wasn't added");
            }
        } catch (err) {
            console.error('Error during review submission:', err);
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('Something went wrong');
            }
        }
    };
    

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

            </div>
            <div>
                <Movie book={book}/>
            </div>
        </div>
    )
}

export default Book;