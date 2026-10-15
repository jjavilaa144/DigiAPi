import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Inicio() {
  const [todoslosdigimon, setTodoslosdigimon] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [niveldigimon, setNiveldigimon] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const cargarDigimon = async () => {
      try {
        const response = await fetch('https://digimon-api.vercel.app/api/digimon')
        const responseData = await response.json()
        // La API no trae id: usamos la posición en la lista (1, 2, 3...)
        setTodoslosdigimon(responseData.map((digimon, i) => ({ ...digimon, id: i + 1 })))
      } catch (error) {
        console.error('Error:', error)
      }
    }

    cargarDigimon()
  }, [])

  const porNivel = niveldigimon === 'All'
    ? todoslosdigimon
    : todoslosdigimon.filter((digimon) => digimon.level === niveldigimon)

  const resultados = busqueda.trim().length >= 3 && isNaN(busqueda)
    ? porNivel.filter((digimon) =>
        digimon.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : porNivel

  const niveles = [
    'All',
    'Fresh', 'In Training', 'Training', 'Rookie',
    'Champion', 'Armor', 'Ultimate', 'Mega'
  ]

  if (todoslosdigimon.length === 0) return <p>Cargando...</p>
  if (resultados.length === 0) return <p>No se encontraron Digimon.</p>

  return (
    <>
      <div className="c-filtro">
        {niveles.map((unNivel, index) => (
          <button type="button" key={index} onClick={() => setNiveldigimon(unNivel)}>
            {unNivel}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar Digimon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {resultados.map((digimon) => (
        <div key={digimon.name} onClick={() => navigate(`/digimon/${digimon.name}`)}>
          <p>{digimon.id}</p>
          <p>{digimon.name}</p>

          <img
            src={digimon.img}
            alt={`Digimon ${digimon.name}`}
            width="auto"
            height="60"
            loading="lazy"
          />
        </div>
      ))}
    </>
  )
}

export default Inicio