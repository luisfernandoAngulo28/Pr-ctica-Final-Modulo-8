import { useEffect, useState } from 'react'

const API_URL = '/api/cv'

export default function App() {
  const [cv, setCV]       = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => { setCV(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="screen-center">
      <div className="spinner" />
      <p className="loading-text">Cargando CV…</p>
    </div>
  )

  if (error) return (
    <div className="screen-center">
      <p className="error-text">❌ Error al cargar datos: {error}</p>
    </div>
  )

  return (
    <div className="page">
      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="avatar-wrap">
          <img
            src={cv.foto}
            alt={`${cv.nombre} ${cv.apellido}`}
            className="avatar"
            onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=LF&size=200&background=4F46E5&color=fff' }}
          />
        </div>

        <h1 className="sidebar-name">{cv.nombre}<br />{cv.apellido}</h1>
        <p className="sidebar-title">Ing. Redes y Telecomunicaciones</p>

        <div className="sidebar-divider" />

        <div className="sidebar-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>{cv.ciudad}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <span>fernando.fa671@gmail.com</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📱</span>
            <span>+591 70252765</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Tecnologías</h3>
          <div className="tags">
            {['React', 'Angular', 'Flutter', 'Node.js', 'Laravel', 'Django',
              'NestJS', 'MySQL', 'PostgreSQL', 'Firebase', 'Docker', 'Git'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <main className="main">

        {/* Perfil */}
        <section className="card">
          <h2 className="section-title">
            <span className="section-icon">👤</span> Perfil Profesional
          </h2>
          <p className="profile-text">
            Ingeniero en Redes y Telecomunicaciones y estudiante de Ingeniería en
            Informática (8vo semestre), con sólida formación académica y práctica.
            Cuento con experiencia construyendo módulos, integrando APIs REST,
            trabajando con Git y gestionando bases de datos. Me caracterizo por ser
            responsable, honrado y orientado a resultados, con alta disposición para
            aprender continuamente.
          </p>
        </section>

        {/* Formación Académica */}
        <section className="card">
          <h2 className="section-title">
            <span className="section-icon">🎓</span> Formación Académica
          </h2>
          <ul className="formation-list">
            {cv.formacion.map((f, i) => (
              <li key={f.id ?? i} className="formation-item">
                <div className="formation-dot" />
                <div className="formation-content">
                  <p className="formation-title">{f.titulo}</p>
                  <p className="formation-meta">{f.institucion} · {f.anio}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Badge powered by */}
        <footer className="footer">
          <span>Datos cargados desde <strong>MySQL</strong> vía <strong>Node.js</strong> · Desplegado con <strong>Docker</strong></span>
        </footer>
      </main>
    </div>
  )
}
