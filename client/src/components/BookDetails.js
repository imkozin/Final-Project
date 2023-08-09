import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";
import Movie from "./Movie";

const BOOK_URL = 'https://example-data.draftbit.com/books';


const Book = () => {
    const {book, setBook} = useAppContext()

    const { id } = useParams();
    
    const getBook = async () => {
        try {
            const res = await axios.get(`${BOOK_URL}/${id}`);
            console.log(res);
            setBook(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

    console.log("book", typeof book.title);

    useEffect(() => {
        getBook();
    }, [id]);

    return(
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <h2>{book?.title}</h2>
                <img src={book?.image_url} alt="book-cover"></img>    
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <h2>Descritption</h2>
                <p>{book?.description}</p>
                <h2>Author</h2>
                <p>{book?.authors}</p>
                <h2>Genre</h2>
                <p>{book?.genres}</p>
            </div>
            <div>
                <Movie book={book}/>
            </div>
        </div>
    )
}

export default Book;