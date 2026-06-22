// Notificaciones flotantes (feedback de acciones). Presentacional.
export default function Toasts({ toasts }) {
  return (
    <div className="toasts">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tipo === 'error' ? 'toast--error' : ''}`}>
          <b>{t.tipo === 'error' ? '✕' : '✦'}</b>
          {t.texto}
        </div>
      ))}
    </div>
  )
}
