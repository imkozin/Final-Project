import './App.css';
import {Routes, Route} from 'react-router-dom';
import Nav from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Favorites from './components/Favorites';
import Book from './components/BookDetails';
import BookList from './components/BookList';
import AppContextProvider from './components/AppContext';


function App() {
  const user = localStorage.getItem('token');

  return (
    <div className='background-container' style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpeg)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            // Add other styles for your component here
            width: '100%',
            height: '100vh',
        }}>
          <div className='nav'>
              <Nav/>
          </div>
      <div className="App">
          <Routes>
            <Route path="/main" element={<AppContextProvider>
              <Main/>
            </AppContextProvider>}/>
            <Route path="/books" element={<AppContextProvider>
              <BookList/>
            </AppContextProvider>}/>
            <Route path="/favorites" element={<AppContextProvider>
              <Favorites/>
            </AppContextProvider>}/>
            <Route path="/book/:id" element={<AppContextProvider>
              <Book/>
            </AppContextProvider>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
