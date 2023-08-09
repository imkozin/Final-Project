import { useState, useContext, createContext } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('AppContext must be within AppContextProvider')
    } else {
        return context;
    }
}


const AppContextProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [book, setBook] = useState([]);
    const [books, setBooks] = useState([]);

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, favorites, setFavorites, movie, setMovie, book, setBook, books, setBooks }}>
            {children}
        </AppContext.Provider>
    )
    
}

export default AppContextProvider;