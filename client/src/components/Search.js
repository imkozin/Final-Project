import { TextField } from '@mui/material';
import { useState } from 'react';

// const Lib_API = 'http://openlibrary.org/search.json?=q'


const Search = ({ searchChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInput = (e) => {
        const input = e.target.value;
        setSearchQuery(input);
        return searchChange(input);
    }

    return (
        <TextField
            label="Search Book"
            variant="outlined"
            value={searchQuery}
            onChange={handleInput}
        />
    );
}

export default Search;