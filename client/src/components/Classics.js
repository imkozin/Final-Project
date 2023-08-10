import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from "./Loading";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const Classic = ({ title }) => {
    const [classic, setClassic] = useState([]);
    const { isLoading, setIsLoading } = useAppContext();

    const navigate = useNavigate();

    const getClassic = async () => {
        try {
            const res = await axios.get(BASE_URL);
            console.log(res);
            if (res.data.length > 0) {
                const genre = res.data.filter(book => book.genres.includes('Classics'));
                const sortedData = genre.sort((a, b) => b.rating_count - a.rating_count).slice(0, 21);
                console.log(sortedData);
                setClassic(sortedData);
            }
        } catch (err) {
            console.log(err.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getClassic();
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
                {classic.map((book) => (
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

export default Classic;