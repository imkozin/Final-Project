import { useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import { TextField, Button } from "@mui/material";

const BOOK_URL = 'http://openlibrary.org/search.json?title='

const Search = () => {
    const { books, setBooks, isLoading, setIsLoading, searchText, setSearchText, searchResult, setSearchResult } = useAppContext();

    const searchTextRef = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const searchBook = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${BOOK_URL}${searchText}`);
            const data = res.data; 
            console.log(data);
    
            if (data.docs && data.docs.length > 0) {
                const newBooks = data.docs.slice(0, 20).map((bookSingle) => {
                    const { key, author_name, cover_i, title } = bookSingle;
    
                    return {
                        id: key,
                        author: author_name[0],
                        cover_id: cover_i,
                        title: title
                    };
                });
    
                console.log(newBooks);
                setBooks(newBooks);
    
                if (newBooks.length > 0) {
                    setSearchResult("Your Search Result");
                } else {
                    setSearchResult("No Search Result Found");
                }
            } else {
                setBooks([]);
                setSearchResult("No Search Result Found");
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };    

    useEffect(() => {
        searchBook();
    }, [searchText]);

    useEffect(() => {
        searchTextRef.current.focus();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        let tempSearchItem = searchTextRef.current.value.trim();
        if ((tempSearchItem.replace(/[^\w\s]/gi, "")).length === 0) {
            setSearchText('the lost world');
            setSearchResult('Please enter some text')
        } else {
            setSearchText(tempSearchItem);
        }

        navigate('/search');
    }

    return (
        <>
            <TextField id="book" label="Enter Book Title or Author" variant="outlined"  inputRef={searchTextRef} onChange={handleInputChange} />
            <Button variant="contained" onClick={handleClick}>Search</Button>
        </>
    )
}

export default Search;