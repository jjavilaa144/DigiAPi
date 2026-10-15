import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Coleccion() {
  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('misNumeros') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados.map(Number))] : [];
    } catch {
      return [];
    }
  });
  const [digimones, setDigimones] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const navigate = useNavigate();

 
  const totalDigimon = digimones.length;
  const espacio = Array.from({ length: totalDigimon }, (_, i) => i + 1);

  useEffect(() => {
    fetch('https://digimon-api.vercel.app/api/digimon')
      .then((respuesta) => respuesta.json())
      .then((datos) => setDigimones(datos))
      .catch((error) => console.error('Error al cargar Digimon:', error));
  }, []);

  const capturarAleatorios = () => {
    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * totalDigimon) + 1
    );
    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });
    const actualizados = [...vistos];

    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('misNumeros', JSON.stringify(actualizados));
  };

  
  const irAlDetalle = (id) => {
    const digimon = digimones[id - 1];
    if (digimon) navigate(`/digimon/${digimon.name}`);
  };

  return (
    <main className="coleccion">
      <h1 className="coleccion-titulo">Colección</h1>
      <p className="coleccion-contador">{listaCapturados.length} <span>/ {totalDigimon}</span></p>
      <button
        className="coleccion-boton"
        onClick={capturarAleatorios}
        disabled={totalDigimon === 0 || listaCapturados.length >= totalDigimon}
      >
        4 nuevos
      </button>

      {nuevos.length > 0 && <h2 className="coleccion-subtitulo">Tus nuevos Digimon</h2>}
      <section className="coleccion-nuevos">
        {nuevos.map(({ id, repetido }, indice) => (
          <div
            key={`${id}-${indice}`}
            className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
            onClick={() => irAlDetalle(id)}
          >
            <p>{id}</p>
            <img
              src={digimones[id - 1]?.img}
              alt={digimones[id - 1]?.name || `Digimon ${id}`}
              width="60"
              height="60"
            />
            <p>{digimones[id - 1]?.name || ''}</p>
          </div>
        ))}
      </section>

      <section className="coleccion-album">
        {espacio.map((id) => {
          const capturado = listaCapturados.includes(id);
          return (
            <div
              key={id}
              className={capturado ? 'coleccion-pokemon capturado' : 'coleccion-pokemon'}
              onClick={() => capturado && irAlDetalle(id)}
            >
              {capturado && (
                <img
                  src={digimones[id - 1]?.img}
                  width="auto"
                  height="45"
                  loading="lazy"
                  alt={String(id)}
                />
              )}
              <p>{id}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;