import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import axios from 'axios';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import '../styles/Main.css';
import { styled } from '@mui/system';
import { Card, IconButton, CardMedia } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BASE_URL = 'https://example-data.draftbit.com/books?';

const Container = styled('div')({
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    height: '330px',
  });
  
  const CardWrapper = styled(Card)({
    margin: '10px',
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

const Trending = ({ title }) => {
    const [trending, setTrending] = useState([]);
    const { isLoading, setIsLoading } = useAppContext();
    const [page, setPage] = useState(1);
    const [initialRender, setInitialRender] = useState(true); // Add this state

    const navigate = useNavigate();

    const getTrending = async (pageNum) => {
        try {
            const res = await axios.get(`${BASE_URL}_page=${pageNum}`);
            console.log(res);
            if (res.data.length > 0) {
                const sortedData = res.data.sort((a, b) => b.rating_count - a.rating_count);
                setTrending(prev => [...prev, ...sortedData]);
            }
        } catch (err) {
            console.log(err.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
            return;
        }
        getTrending(page);
    }, [page, initialRender]); 

    return (
        <>
            <div className="title">
                <h1>{title}</h1>
            </div>
            <Container>
                {trending.map((book) => (
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
                {!isLoading && (
                    <IconButton
                    style={{
                        alignSelf: 'center',
                        color: '#FFF',
                        transition: 'transform 0.2s ease-in-out'
                    }}
                    onClick={handleLoadMore}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(2.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <ChevronRightIcon />
                </IconButton> 
                )}
            </Container>
            {isLoading && <Loading/>}
        </>
    );
};

export default Trending;