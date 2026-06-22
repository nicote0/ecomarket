// Cinta superior animada (estética de fanzine/feria).
// Componente puramente presentacional, sin estado.
const FRASES = [
  'Comercio justo',
  'Cero plástico',
  'Productos a granel',
  'Hecho a mano',
  'Envases reutilizables',
  'Consumo consciente',
]

export default function Ticker() {
  // Duplicamos el contenido para que el scroll infinito sea continuo.
  const contenido = [...FRASES, ...FRASES]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {contenido.map((frase, i) => (
          <span key={i}>
            <b>✦</b> {frase}
          </span>
        ))}
      </div>
    </div>
  )
}
