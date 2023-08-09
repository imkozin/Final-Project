import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Book = () => {
    const URL = 'https://example-data.draftbit.com/books';

    const [book, setBook] = useState([]);

    const { id } = useParams();
    
    const getBook = async () => {
        try {
            const res = await axios.get(`${URL}/${id}`);
            console.log(res);
            setBook(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

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
        </div>
    )
}

export default Book;