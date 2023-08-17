import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "./AppContext";
import Loading from "./Loading";
import { styled } from '@mui/system';
import { Card, IconButton, CardMedia, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const BASE_URL = 'https://example-data.draftbit.com/books?';

const Container = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  });
  
  const CardWrapper = styled(Card)({
    margin: '25px',
    minWidth: 200,
    height: 300,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)'
    },
  });
  
  
  const CardImage = styled(CardMedia)({
    height: 0,
    paddingTop: '150%',
  });


const BookList = () => {
    const { books, setBooks, isLoading, setIsLoading } = useAppContext();
    const [page, setPage] = useState(1);
    const [initialRender, setInitialRender] = useState(true);
    const [query, setQuery] = useState("");
    

    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(query.toLowerCase()) || book.authors.toLowerCase().includes(query.toLowerCase())
    })

    const navigate = useNavigate();

    const getBooks = async (pageNum) => {
        try {
            const res = await axios.get(`${BASE_URL}_page=${pageNum}`);
            console.log(res);
            setBooks(prev => [...prev, ...res.data]);
        } catch (err) {
            console.log(err.response.data.msg);
        }
        setIsLoading(false);
    }


    // useEffect(() => {
    //     getBooks();
    // }, []) 

    const handleLoadMore = () => {
      setPage(prev => prev + 1);
    };

    useEffect(() => {
      if (initialRender) {
          setInitialRender(false);
          return;
      }
      getBooks(page);
  }, [page, initialRender]); 

    return (
      <>
          {isLoading ? (
              <Loading />
          ) : (
              <div style={{ marginBottom: '50px', minHeight: '100vh', paddingBottom: '50px' }}>
                  <TextField type="search" value={query} onChange={e => setQuery(e.target.value)} 
                  error
                  label="Author or Title"
                  placeholder="Enter Author or Title"
                  style={{
                      width: '30%',
                      zIndex: 0,
                  }}
                  inputProps={{
                      style: {
                          borderRadius: '5px',
                          color: 'white'
                      },
                  }}/>
                  {filteredBooks.length ? (
                    <>
                      <Container>
                          {filteredBooks.map((book) => (
                              <CardWrapper
                                  key={book.id}
                                  onClick={() => navigate(`/book/${book.id}`)}
                              >
                                  <CardImage
                                      image={book.image_url}
                                      title={book.title}
                                  />
                              </CardWrapper>
                          ))}
                      </Container>
                        <IconButton
                            style={{
                                alignSelf: 'center',
                                color: '#FFF',
                                transition: 'transform 0.2s ease-in-out',
                            }}
                            onClick={handleLoadMore}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(2.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                        <KeyboardArrowDownIcon />
                        </IconButton>
                      </>
                  ) : (
                      <>
                          <h1>No Books Found</h1>
                          {isLoading && <Loading />}
                      </>
                  )}
              </div>
          )}
      </>
  );
  
}

export default BookList;