import './App.css';
import {Routes, Route} from 'react-router-dom';
import Nav from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
import Favorites from './components/Favorites';


function App() {
  const user = localStorage.getItem('token')
  return (
    <>
      <div className='nav'>
          <h3>BOOKFLIX</h3>
          <Nav/>
      </div>
      <div className="App">
          <Routes>
          <Route path="/main" element={<Main/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
          </Routes>
      </div>
    </>
  );
}

export default App;
