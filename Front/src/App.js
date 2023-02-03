import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import Favorites from './components/Favorites/Favorites.jsx';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Form from "./components/Form/Form";

function App () {
  const location = useLocation();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);

  const username = "juli.perez.apiwan@gmail.com";
  const password = "123juli";

  const login = (userData) => {
    if(userData.username === username && userData.password === password){
      setAccess(true)
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate('/')
  }, [access])

  function onSearch(character) {
    fetch(`http://localhost:3001/rickandmorty/onsearch/${character}`)
       .then((response) => response.json())
       .then((data) => {
          if (data.name) {
             setCharacters((oldChars) => [...oldChars, data]);
          } else {
             window.alert('No hay personajes con ese ID');
          }
       });
 }
  const onClose = (id) => {
    setCharacters(
      characters.filter(character => character.id !== id)
    )
  }

  return (
    <div className='App' style={{ padding: '25px' }}>
      {location.pathname === '/' ? <Form login={login}/> : <Nav onSearch={onSearch} />}
      <Routes>
        <Route path='/home' element={<Cards onClose={onClose} characters={characters} />} />
        <Route path='/detail/:detailId' element={<Detail/>} />
        <Route path='/favorites' element={<Favorites/>} />
      </Routes>
    </div>
  )
}

export default App
