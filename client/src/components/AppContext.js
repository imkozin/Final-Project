import { useState, useContext, useEffect, useCallback, createContext } from "react";

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

    const addToFavorites = (book) => {
        const oldFavorites = [...favorites];
        const newFavorites = oldFavorites.concat(book);
        setFavorites(newFavorites);
    };

    const removeFromFavorites = (id) => {
        const oldFavorites = [...favorites];

        const newFavorites = oldFavorites.filter((book) => book.id !== id);
        setFavorites(newFavorites);
    }

    return (
        <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites}}>
            {children}
        </AppContext.Provider>
    )
    
}

export default AppContextProvider;