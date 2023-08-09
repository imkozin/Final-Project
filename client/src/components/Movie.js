import { useEffect } from "react";
import { useAppContext } from "./AppContext";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";

const Movie = ({book}) => {
    const { movie, setMovie } = useAppContext();

    useEffect(() => {
        if (book) {
            getMovie();
        }
    }, [book]);

    const getMovie = async () => {
        if (!book) {
            return;
        }
        const bookString = book['title'].split(" ");
        const bookName = bookString.join("+");
        const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${bookName}&api_key=d9021bf18b62c9657e1433d728fb3797`
        try {
            const res = await axios.get(MOVIE_URL);
            const data = res.data; 
            if (data.results.length > 0) {
                setMovie(data.results);
            } else {
                setMovie([]);
            }
        } catch {
            console.log('Something went wrong');
        }
    }

    

    return (
            <div>
            {movie.length > 0 ? (
                movie.map((movie) => (
                    <div key={movie.id}>
                        <h1>{movie.title}</h1>
                        <img src={movie.poster_path === null ? "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg" :`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="POSTER"/>
                        <p>Release Date: {movie?.release_date}</p>
                    </div>
                    ))
                ) : (
                    <div>
                        <h1>Sorry! Movie not found!</h1>
                    </div>
                )}
            </div>
    )
}

export default Movie;