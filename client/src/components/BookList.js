import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";
import Loading from "./Loading";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const BookList = () => {
    const { books, setBooks, isLoading, setIsLoading } = useAppContext();
    const [query, setQuery] = useState("");
    

    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(query.toLowerCase()) || book.authors.toLowerCase().includes(query.toLowerCase())
    })

    const navigate = useNavigate();

    const getBooks = async () => {
        try {
            const res = await axios.get(BASE_URL);
            console.log(res);
            setBooks(res.data);
        } catch (err) {
            console.log(err.response.data.msg);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        getBooks();
    }, []) 

    return (
        <>       
            {isLoading && <Loading/>}     
            <input type="search" value={query} onChange={e => setQuery(e.target.value)}/>
            {filteredBooks.length ?
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredBooks.map((book) => (
                        <div key={book.id} style={{ margin: '5px 10px' }}>
                            <img src={book.image_url} alt={book.title} style={{ width: "200px", height: "300px", cursor: "pointer" }} onClick={() => navigate(`/book/${book.id}`)} />
                        </div>
                    ))}
                </div>
            </div> : <h1>No Books Found</h1>}
        </>
    );
}

export default BookList;