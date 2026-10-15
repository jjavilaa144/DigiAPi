import './style.css'

const destacados = [
  { nombre: 'Agumon', img: 'https://digimon.shadowsmith.com/img/agumon.jpg' },
  { nombre: 'Gabumon', img: 'https://digimon.shadowsmith.com/img/gabumon.jpg' },
  { nombre: 'Omnimon', img: 'https://digimon.shadowsmith.com/img/omnimon.jpg' }
]

const niveles = [
  { nombre: 'Fresh', texto: 'La etapa más pequeña, recién nacido.' },
  { nombre: 'In Training', texto: 'Primera evolución, todavía muy débil.' },
  { nombre: 'Training', texto: 'Etapa de entrenamiento temprana.' },
  { nombre: 'Rookie', texto: 'Ya pueden pelear. Es el nivel de Agumon.' },
  { nombre: 'Champion', texto: 'Más fuertes. Es el nivel de Greymon.' },
  { nombre: 'Armor', texto: 'Nivel especial que se logra con un Digi-Huevo.' },
  { nombre: 'Ultimate', texto: 'Muy poderosos, como MetalGreymon.' },
  { nombre: 'Mega', texto: 'El nivel más alto, como WarGreymon y Omnimon.' }
]

function Info() {
  return (
    <main className="c-info">
      <h1>¿Puedes atraparlos a todos?</h1>
      <p>
        Encuentra todos los datos de tus Digimon favoritos. Sumérgete en
        nuestra app y descubre si los conocías todos.
      </p>

      <div className="c-info-imagenes">
        {destacados.map((digimon) => (
          <img
            key={digimon.nombre}
            src={digimon.img}
            alt={digimon.nombre}
            width="120"
          />
        ))}
      </div>

      <h2>Los niveles</h2>
      <ul className="c-info-lista">
        {niveles.map((nivel) => (
          <li key={nivel.nombre}>
            <strong>{nivel.nombre}</strong>: {nivel.texto}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Info