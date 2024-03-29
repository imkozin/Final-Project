import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Loading from "./Loading";

const Movie = ({book}) => {
    const { movie, setMovie, isLoading, setIsLoading } = useAppContext();

    useEffect(() => {
        if (book) {
            setIsLoading(true);
            getMovie();
        }
    }, [book]);

    const getMovie = async () => {
        if (!book || !book.title) {
            return;
        }
        const bookString = book.title.split(" ").join("+");
        const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${bookString}&api_key=d9021bf18b62c9657e1433d728fb3797`;
        try {
            const res = await axios.get(MOVIE_URL);
            const data = res.data; 
            if (data.results.length > 0) {
                const sortedData = data.results
                    .filter((movie) => 
                    !movie.original_title.toLowerCase().includes("d'une")) // Exclude titles containing "d'une"'
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 3);
                setMovie(sortedData);
            } else {
                setMovie([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Something went wrong', error);
        }
    };
    
    

    return (
        <Carousel width={'250px'}>
                {movie.length > 0 ? (
                    movie.map((movie) => (
                        <div key={movie?.id} >
                            <img src={movie?.poster_path === null ? "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg" : `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="POSTER" style={{marginBottom: '30px'}}/>
                            <p style={{marginBottom: '30px'}}>Release Date: {movie?.release_date}</p>
                        </div>
                    ))
                ) : (
                    <div>
                        <h1>Sorry! Movie not found!</h1>
                    </div>
                )}
        </Carousel>
    )
}

export default Movie;