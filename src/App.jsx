import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom';
import Usuario from './componentes/usuario';
import Inicio from "./componentes/inicio";
import Favoritos from "./componentes/favoritos";
import Info from "./componentes/info";
import Coleccion from "./componentes/coleccion"
import Digimon from "./componentes/digimon"
import './App.css'

function App() {

  return (
    <>
      <Router>
        <nav className='c-menu'>
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Coleccion</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/info">Info</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/digimon/:name" element={<Pokemon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
