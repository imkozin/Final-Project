import { useEffect, useState } from "react";
import { useAppContext } from "./AppContext";
import axios from 'axios';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://example-data.draftbit.com/books?';

const Popular = ({ title }) => {
    const [popular, setPopular] = useState([]);
    const { isLoading, setIsLoading } = useAppContext();
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const getPopular = async () => {
        try {
            const res = await axios.get(`${BASE_URL}_page=${page}&_limit=10`);
            console.log(res);
            if (res.data.length > 0) {
                const sortedData = res.data.sort((a, b) => b.review_count - a.review_count);
                setPopular(prev => [...prev, ...sortedData]);
            }
        } catch (err) {
            console.log(err.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getPopular(page);
    }, [page]);


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setIsLoading(true);
            setPage(prev => prev + 1)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


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
                {popular.map((book) => (
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

export default Popular;
