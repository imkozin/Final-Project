import { useEffect, useState } from "react";
import axios from 'axios';
import Search from "./Search";

import { useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";
import Loading from "./Loading";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const BookList = () => {
    const { books, setBooks, favorites, setFavorites, isLoading, setIsLoading } = useAppContext();
    const [searchItem, setSearchItem] = useState('');

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

    const searchBook = (inputValue) => {
        const trimmedInput = inputValue.trim(); // Trim the input value
        const filteredBooks = books.filter(book => {
            return book.title.toLowerCase().includes(trimmedInput.toLowerCase());
        });
        setBooks(filteredBooks);
    }
    

    return (
        <>
            {isLoading ? (
                <Loading /> 
            ) : (
                <>
                    <Search searchChange={searchBook}/>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {books.map((book) => (
                                <div key={book.id} style={{ margin: '5px 10px' }}>
                                    <img src={book.image_url} alt={book.title} style={{ width: "200px", height: "300px", cursor: "pointer" }} onClick={() => navigate(`/book/${book.id}`)} />
                                    <h3>{book.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default BookList;