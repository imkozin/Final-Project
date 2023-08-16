import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { getCurrentUser } from '../helpers/utils';
import Loading from './Loading';
import '../styles/Main.css';
import { styled } from '@mui/system';
import { Card, IconButton, CardMedia } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

const Favorites = ({title}) => {
    const { favorites, setFavorites, isLoading, setIsLoading } = useAppContext()
    const username = getCurrentUser();
    const favoritesKey = `favoritesOf${username}`;

    useEffect(() => {
        const storedFavorites = localStorage.getItem(favoritesKey);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const navigate = useNavigate();

    const addToFavorites = (book) => {
        const oldFavorites = [...favorites];
        const newFavorites = oldFavorites.concat(book);
        localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    const removeFromFavorites = (id) => {
        const oldFavorites = [...favorites];

        const newFavorites = oldFavorites.filter((book) => book.id !== id);
        localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    }

    const checkFavorite = (id) => {
        const isFavorite = favorites.some((book) => book.id === id);
        return isFavorite;
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <Container>
                        {favorites.length > 0 ? (
                            favorites.map((book) => (
                                <CardWrapper
                                    key={book.id}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                >
                                    <CardImage
                                        image={book.image_url}
                                        title={book.title}
                                    />
                                </CardWrapper>
                            ))
                        ) : (
                            <div className="title">
                                <h1>You don't have any favorites book yet</h1>
                            </div>
                        )}
                        {!isLoading && (
                            <IconButton
                                style={{
                                    alignSelf: 'center',
                                    color: '#FFF',
                                    transition: 'transform 0.2s ease-in-out'
                                }}
                                onClick={() => navigate(`/favorites`)}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(2.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <ChevronRightIcon />
                            </IconButton>
                        )}
                    </Container>
                </>
            )}
        </>
    );    
}    

export default Favorites;