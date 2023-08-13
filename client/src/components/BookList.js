import { useEffect, useState } from "react";
import axios from 'axios';
import Search from "./Search";

import { useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";
import Loading from "./Loading";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const BookList = () => {
    const { books, setBooks, isLoading, setIsLoading } = useAppContext();
    const [searchItems, setSearchItems] = useState([]);

    const navigate = useNavigate();

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

    useEffect(() => {
        setIsLoading(true);
        getBooks();
    }, [])

    const searchBook = (searchQuery) => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        if (trimmedQuery === '') {
            return;
        } else {
            setSearchItems(books.filter(book => {
                const title = book.title.toLowerCase().includes(trimmedQuery);
                const author = book.authors.toLowerCase().includes(trimmedQuery);
                return title || author;
            }))
        }
    }

    return (
        <>
            {isLoading ? (
                <Loading /> 
            ) : (
                <>
                    <Search searchChange={searchBook}/>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {searchItems.length ? 
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {searchItems.map((book) => (
                                <div key={book.id} style={{ margin: '5px 10px' }}>
                                    <img src={book.image_url} alt={book.title} style={{ width: "200px", height: "300px", cursor: "pointer" }} onClick={() => navigate(`/book/${book.id}`)} />
                                </div>
                            ))}
                        </div> : 
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {books.map((book) => (
                            <div key={book.id} style={{ margin: '5px 10px' }}>
                                <img src={book.image_url} alt={book.title} style={{ width: "200px", height: "300px", cursor: "pointer" }} onClick={() => navigate(`/book/${book.id}`)} />
                            </div>
                        ))}
                    </div>}
                    </div>
                </>
            )}
        </>
    );
}

export default BookList;