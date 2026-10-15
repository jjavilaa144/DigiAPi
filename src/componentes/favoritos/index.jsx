import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      <div className="c-lista">
        {favoritos.map((digimon) => (
          <div
            key={digimon.id}
            className="c-lista-pokemon"
            onClick={() => navigate(`/digimon/${digimon.nombre}`)}
          >
            <p>{digimon.id}</p>
            <p>{digimon.nombre}</p>
            <img
              src={digimon.img || `https://digimon.shadowsmith.com/img/${digimon.nombre.toLowerCase()}.jpg`}
              alt={`Digimon ${digimon.nombre}`}
              width="auto"
              height="60"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favoritos