import { TextField } from '@mui/material';
import { useState } from 'react';

// const Lib_API = 'http://openlibrary.org/search.json?=q'


const Search = ({ searchChange }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleInput = (e) => {
        const input = e.target.value;
        setSearchInput(input); // Update the local searchInput state
        searchChange(input);  // Call the searchChange prop with the input value
    }

    return (
        <TextField
            label="Search Book"
            variant="outlined"
            value={searchInput}
            onChange={handleInput}
        />
    );
}

export default Search;