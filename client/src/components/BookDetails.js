import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "./AppContext";
import Movie from "./Movie";
import Loading from "./Loading";

const BOOK_URL = 'https://example-data.draftbit.com/books';


const Book = () => {
    const {book, setBook, isLoading, setIsLoading} = useAppContext()

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
            </div>
            <div>
                <Movie book={book}/>
            </div>
        </div>
    )
}

export default Book;