import { useEffect, useState } from "react";
import axios from 'axios';

const BookList = () => {
    const URL = 'https://example-data.draftbit.com/books?';
    
    const [books, setBooks] = useState([]);

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
        <div>
            {books.map((book) => (
                <div key={book.id}>
                    <div><h2>{book.title}</h2></div>
                    <div><img src={book.image_url} alt="book"/></div>
                    
                </div>
            ))}
        </div>
    )
}

export default BookList;