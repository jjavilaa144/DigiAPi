import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const NIVELES = [
  'All',
  'Fresh',
  'In Training',
  'Training',
  'Rookie',
  'Champion',
  'Armor',
  'Ultimate',
  'Mega',
]

function Inicio() {
  const [todoslosdigimon, setTodoslosdigimon] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [niveldigimon, setNiveldigimon] = useState('All')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [indicePortal, setIndicePortal] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()

    const cargarDigimon = async () => {
      try {
        setCargando(true)
        setError(false)

        const response = await fetch(
          'https://digimon-api.vercel.app/api/digimon',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('No se pudo cargar la lista de Digimon')
        }

        const data = await response.json()

        setTodoslosdigimon(
          data.map((digimon, i) => ({
            ...digimon,
            id: i + 1,
          }))
        )
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error al cargar Digimon:', err)
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarDigimon()

    return () => controller.abort()
  }, [])

  // El Digimon destacado se mantiene durante el día.
  const indiceDiario = useMemo(() => {
    if (!todoslosdigimon.length) return 0

    const fecha = new Date()
    const claveFecha = [
      fecha.getFullYear(),
      fecha.getMonth() + 1,
      fecha.getDate(),
    ].join('-')

    const suma = [...claveFecha].reduce(
      (total, caracter) => total + caracter.charCodeAt(0),
      0
    )

    return suma % todoslosdigimon.length
  }, [todoslosdigimon])

  const digimonPortal =
    todoslosdigimon[indicePortal ?? indiceDiario]

  const descubrirOtro = () => {
    if (todoslosdigimon.length < 2) return

    let nuevoIndice

    do {
      nuevoIndice = Math.floor(Math.random() * todoslosdigimon.length)
    } while (
      nuevoIndice === (indicePortal ?? indiceDiario)
    )

    setIndicePortal(nuevoIndice)
  }

  const resultados = useMemo(() => {
    return todoslosdigimon.filter((digimon) => {
      const coincideNivel =
        niveldigimon === 'All' ||
        digimon.level === niveldigimon

      const coincideBusqueda = digimon.name
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase())

      return coincideNivel && coincideBusqueda
    })
  }, [todoslosdigimon, niveldigimon, busqueda])

  const abrirDigimon = (nombre) => {
    navigate(`/digimon/${nombre}`)
  }

  if (cargando) {
    return (
      <main className="inicio">
        <div className="inicio-estado">
          <span className="inicio-spinner" />
          <p>Abriendo el portal digital...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="inicio">
        <div className="inicio-estado">
          <span className="inicio-estado-icono">⚡</span>
          <h2>El portal está desconectado</h2>
          <p>No pudimos cargar los Digimon. Comprueba tu conexión e inténtalo de nuevo.</p>
          <button
            type="button"
            className="inicio-boton"
            onClick={() => window.location.reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="inicio">
      <section className="portal-banner">
        <div className="portal-contenido">
          <span className="portal-etiqueta">
            <span className="portal-punto" />
            TU AVENTURA DIGITAL
          </span>

          <h1>
            Bienvenido al
            <br />
            <span>Portal Digiapii</span>
          </h1>

          <p>
            Explora el Mundo Digital, descubre nuevos compañeros
            y encuentra a tu próximo Digimon favorito.
          </p>

          <button
            type="button"
            className="portal-boton"
            onClick={() =>
              document.getElementById('explorar-digimon')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explorar Digimon <span aria-hidden="true">↓</span>
          </button>
        </div>

        <div className="portal-decoracion" aria-hidden="true">
          <span className="portal-orbita portal-orbita-1" />
          <span className="portal-orbita portal-orbita-2" />
          <span className="portal-estrella">✦</span>
          <span className="portal-estrella portal-estrella-2">✧</span>
          <span className="portal-simbolo">D</span>
        </div>
      </section>

      {digimonPortal && (
        <section className="portal-diario">
          <div className="portal-diario-info">
            <span className="seccion-etiqueta">
              ✦ DESCUBRIMIENTO DIARIO
            </span>

            <h2>Tu Digimon del día</h2>

            <p>
              Cada día, una nueva oportunidad para conocer
              a un compañero del Mundo Digital.
            </p>

            <div className="portal-diario-datos">
              <span className="portal-nombre">
                {digimonPortal.name}
              </span>
              <span className="portal-nivel">
                {digimonPortal.level}
              </span>
            </div>

            <div className="portal-acciones">
              <button
                type="button"
                className="inicio-boton"
                onClick={() => abrirDigimon(digimonPortal.name)}
              >
                Conocer Digimon <span aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="inicio-boton-secundario"
                onClick={descubrirOtro}
                title="Descubrir otro Digimon"
              >
                <span aria-hidden="true">↻</span> Sorpréndeme
              </button>
            </div>
          </div>

          <button
            type="button"
            className="portal-diario-imagen"
            onClick={() => abrirDigimon(digimonPortal.name)}
            aria-label={`Ver detalles de ${digimonPortal.name}`}
          >
            <span className="portal-imagen-resplandor" />
            <img
              src={digimonPortal.img}
              alt={digimonPortal.name}
              loading="lazy"
            />
            <span className="portal-imagen-pie">
              COMPAÑERO DESTACADO
            </span>
          </button>
        </section>
      )}

      <section id="explorar-digimon" className="explorador">
        <div className="explorador-cabecera">
          <div>
            <span className="seccion-etiqueta">ENCICLOPEDIA DIGITAL</span>
            <h2>Explora los Digimon</h2>
            <p>Encuentra tu próximo compañero de aventura.</p>
          </div>

          <span className="explorador-contador">
            {resultados.length} {resultados.length === 1 ? 'Digimon' : 'Digimon'}
          </span>
        </div>

        <div className="explorador-busqueda">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="c-buscador"
            aria-label="Buscar Digimon por nombre"
          />

          {busqueda && (
            <button
              type="button"
              className="busqueda-limpiar"
              onClick={() => setBusqueda('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

        <div className="c-filtro" aria-label="Filtrar por nivel">
          {NIVELES.map((nivel) => (
            <button
              type="button"
              key={nivel}
              className={
                niveldigimon === nivel ? 'filtro-activo' : ''
              }
              aria-pressed={niveldigimon === nivel}
              onClick={() => setNiveldigimon(nivel)}
            >
              {nivel === 'All' ? 'Todos' : nivel}
            </button>
          ))}
        </div>

        {resultados.length === 0 ? (
          <div className="inicio-estado inicio-sin-resultados">
            <span className="inicio-estado-icono">⌕</span>
            <h3>No encontramos ese Digimon</h3>
            <p>Prueba con otro nombre o selecciona un nivel diferente.</p>
            <button
              type="button"
              className="inicio-boton"
              onClick={() => {
                setBusqueda('')
                setNiveldigimon('All')
              }}
            >
              Mostrar todos
            </button>
          </div>
        ) : (
          <div className="digimon-grid">
            {resultados.map((digimon) => (
              <button
                type="button"
                key={digimon.name}
                className="digimon-card"
                onClick={() => abrirDigimon(digimon.name)}
              >
                <span className="digimon-card-numero">
                  #{String(digimon.id).padStart(3, '0')}
                </span>

                <div className="digimon-card-imagen">
                  <img
                    src={digimon.img}
                    alt={digimon.name}
                    loading="lazy"
                  />
                </div>

                <div className="digimon-card-info">
                  <h3>{digimon.name}</h3>
                  <span className="digimon-card-nivel">
                    {digimon.level}
                  </span>
                </div>

                <span className="digimon-card-flecha" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Inicio