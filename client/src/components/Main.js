import jwt_decode from 'jwt-decode';
import { TextField } from "@mui/material";
import BookList from './BookList';
import {useState,useEffect} from "react";

const Main = () => {
        const [isLoggedIn, setIsLoggedIn] = useState();
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (token) {
                const username = jwt_decode(token).name;
                setIsLoggedIn(username);
            } else {
                setIsLoggedIn(false);
            }
        }, []);
    return (
        <>
            <h1>Main</h1>
            {isLoggedIn && (
                <h2>Welcome {isLoggedIn}</h2>
            )}
            <TextField id="book" label="Book Title or Author" variant="outlined" />
            <BookList/>
        </>
    )
}

export default Main;