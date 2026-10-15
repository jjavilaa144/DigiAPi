import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import './style.css'

function Digimon() {
    const { name } = useParams();
    const [datadigimon, setDatadigimon] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });
    const esFavorito = favoritos.some(d => d.id === datadigimon?.id);


    useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then(response => response.json())
      .then(responseData => {
        // La API no trae id: buscamos por nombre y usamos la posición como id
        const indice = responseData.findIndex(
          d => d.name.toLowerCase() === name.toLowerCase()
        );
        if (indice !== -1) {
          setDatadigimon({ ...responseData[indice], id: indice + 1 });
        }
      })
      .catch(error => console.error("Error:", error));
    }, [name]);

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
        nuevosFavoritos = favoritos.filter(d => d.id !== datadigimon.id);
        } else {
        nuevosFavoritos = [...favoritos, { id: datadigimon.id, nombre: datadigimon.name, img: datadigimon.img }];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };

    if (!datadigimon || !datadigimon.id) return <p>Cargando...</p>;
    return (
        <div>
        <p>{datadigimon.id}</p>
        <h1>{datadigimon.name}</h1>
        <img
            src={datadigimon.img}
            alt={datadigimon.name}
            width="200"
        />

        <p>{datadigimon.id}</p>
        <p>Nivel: {datadigimon.level}</p>

            <button onClick={toggleFavorito}>
            {esFavorito ? '❤️' : '🤍'}
            </button>
        </div>
    )
}

export default Digimon