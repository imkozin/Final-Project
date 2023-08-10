import { useAppContext } from "../components/AppContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Searching = () => {
    const { books, isLoading, searchResult } = useAppContext();

    const booksFound = books.map((singleBook) => {
        const idWithoutWorks = typeof singleBook.id === 'string' ? singleBook.id.replace('/works/', '') : singleBook.id;

        return {
            ...singleBook,
            id: idWithoutWorks,
            cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : `https://www.nipponniche.com/wp-content/uploads/2021/04/fentres-pdf.jpeg`
        };
    });

    if (isLoading) return <Loading />;

    return (
        <section className='booklist'>
            <div className='container'>
                <div className='section-title'>
                    <h2>{searchResult}</h2>
                </div>
                {booksFound.slice(0, 30).map((item, index) => (
                    <div key={index} className='book-item'>
                        <div className='book-item-img'>
                            <img src={item.cover_img} alt='cover' />
                        </div>
                        <div className='book-item-info text-center'>
                            <Link to={`/book/${item.id}`} {...item}>
                                <div className='book-item-info-item title fw-7 fs-18'>
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                            <div className='book-item-info-item author fs-15'>
                                <span className='text-capitalize fw-7'>Author: </span>
                                <span>{item.author.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Searching;