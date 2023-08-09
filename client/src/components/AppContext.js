import { useState, useContext, createContext } from "react";
import { TailSpin } from 'react-loader-spinner';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('AppContext must be within AppContextProvider')
    } else {
        return context;
    }
}

export const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
        )
}


const AppContextProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AppContext.Provider value={{ isLoading, setIsLoading, favorites, setFavorites }}>
            {children}
        </AppContext.Provider>
    )
    
}

export default AppContextProvider;