import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import axios from 'axios';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const Thriller = ({ title }) => {
    const [thriller, setThriller] = useState([]);
    const { isLoading, setIsLoading } = useAppContext();

    const navigate = useNavigate();

    const getThriller = async () => {
        try {
            const res = await axios.get(BASE_URL);
            console.log(res);
            if (res.data.length > 0) {
                const genre = res.data.filter(book => book.genres.includes('Thriller'));
                const sortedData = genre.sort((a, b) => b.rating_count - a.rating_count).slice(0, 21);
                console.log(sortedData);
                setThriller(sortedData);
            }
        } catch (err) {
            console.log(err.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getThriller();
    }, []);

    return (
        <>
        {isLoading ? (
            <Loading />
        ) : (
            <>
                <div style={{ textAlign: "start" }}>
                    <h1>{title}</h1>
                </div>
                <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', border: "5px solid black", height: "320px"}}>
                {thriller.map((book) => (
                    <div key={book.id} style={{ margin: '5px 10px' }}>
                        <img src={book.image_url} alt={book.title} style={{width: "200px", height: "300px", cursor: "pointer"}} onClick={() => navigate(`/book/${book.id}`)}/>
                    </div>
                ))}
                </div>
            </>
            )}
        </>
    );
};

export default Thriller;