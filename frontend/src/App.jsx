import { useEffect, useState } from 'react'

const API_URL = '/api/cv'

// ── Proyectos destacados ─────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: 'CobraApp',
    desc: 'App móvil premium de gestión de clientes con modos temáticos, animaciones y CRUD completo.',
    tech: [
      { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { name: 'Dart', icon: 'devicon-dart-plain colored' },
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    ],
    github: 'https://github.com/luisfernandoAngulo28',
    status: 'Completado', color: '#10b981',
  },
  {
    name: 'Nike Store',
    desc: 'Ecommerce Nike con catálogo, autenticación, carrito de compras, checkout y historial de órdenes.',
    tech: [
      { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { name: 'Dart', icon: 'devicon-dart-plain colored' },
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    ],
    github: 'https://github.com/luisfernandoAngulo28',
    status: 'Completado', color: '#10b981',
  },
  {
    name: 'Task Manager',
    desc: 'Gestor de tareas CRUD con dark mode premium, React, TypeScript y Material UI v9.',
    tech: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'MUI', icon: 'devicon-materialui-plain colored' },
    ],
    github: 'https://github.com/luisfernandoAngulo28',
    status: 'Completado', color: '#10b981',
  },
  {
    name: 'CV Personal',
    desc: 'CV web con arquitectura de 3 servicios orquestados con Docker Compose, React, Node.js y MySQL.',
    tech: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
    ],
    github: 'https://github.com/luisfernandoAngulo28/Pr-ctica-Final-Modulo-8',
    status: 'En producción', color: '#4f46e5',
  },
]

// ── Grupos de tecnologías ────────────────────────────────────────────────────
const TECH_GROUPS = [
  {
    label: 'Lenguajes',
    items: [
      { name: 'Java', icon: 'devicon-java-plain colored' },
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'C#', icon: 'devicon-csharp-plain colored' },
      { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Dart', icon: 'devicon-dart-plain colored' },
    ],
  },
  {
    label: 'Web',
    items: [
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Laravel', icon: 'devicon-laravel-plain colored' },
      { name: 'Django', icon: 'devicon-django-plain-wordmark colored' },
      { name: 'NestJS', icon: 'devicon-nestjs-plain colored' },
      { name: '.NET', icon: 'devicon-dot-net-plain colored' },
      { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Angular', icon: 'devicon-angularjs-plain colored' },
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Vue.js', icon: 'devicon-vuejs-plain colored' },
    ],
  },
  {
    label: 'Móvil',
    items: [
      { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { name: 'Kotlin', icon: 'devicon-kotlin-plain colored' },
      { name: 'React Native', icon: 'devicon-react-original colored' },
    ],
  },
  {
    label: 'Bases de Datos',
    items: [
      { name: 'MySQL', icon: 'devicon-mysql-original colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'SQL Server', icon: 'devicon-microsoftsqlserver-original colored' },
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
      { name: 'Supabase', icon: 'devicon-supabase-original colored' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark colored' },
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
    ],
  },
  {
    label: 'Diseño & AI',
    items: [
      { name: 'Figma', icon: 'devicon-figma-plain colored' },
      { name: 'TailwindCSS', icon: 'devicon-tailwindcss-original colored' },
    ],
  },
  {
    label: 'Metodologías',
    items: [
      { name: 'Jira', icon: 'devicon-jira-plain colored' },
      { name: 'Scrum', icon: null },
      { name: 'Serverless', icon: null },
    ],
  },
]

// ── Iconos FA por categoría ─────────────────────────────────────────────────────
const CAT_ICONS = {
  'Lenguajes'     : 'fa-code',
  'Web'           : 'fa-globe',
  'Backend'       : 'fa-server',
  'Frontend'      : 'fa-layer-group',
  'Móvil'         : 'fa-mobile-screen',
  'Bases de Datos': 'fa-database',
  'Cloud & DevOps': 'fa-cloud',
  'Diseño & AI'   : 'fa-palette',
  'Metodologías'  : 'fa-diagram-project',
}

export default function App() {
  const [cv, setCV] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => { setCV(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  // ── Scroll reveal (Intersection Observer) ───────────────────────────────
  useEffect(() => {
    if (!cv) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [cv])

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
            onError={e => {
              e.target.onerror = null
              e.target.src = 'https://ui-avatars.com/api/?name=Luis+Fernando&size=200&background=4F46E5&color=fff&bold=true'
            }}
          />
        </div>

        <h1 className="sidebar-name">{cv.nombre}<br />{cv.apellido}</h1>
        <p className="sidebar-title">Ing. Redes y Telecomunicaciones</p>
        <div className="disponible-badge">
          <span className="disponible-dot" />
          Disponible para trabajar
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Proyectos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">Años exp.</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <span className="stat-label">Skills</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-info">
          <div className="info-item">
            <i className="info-icon fa-solid fa-location-dot" />
            <span>{cv.ciudad}</span>
          </div>
          <div className="info-item">
            <i className="info-icon fa-solid fa-envelope" />
            <span>fernando.fa671@gmail.com</span>
          </div>
          <div className="info-item">
            <i className="info-icon fa-solid fa-mobile-screen" />
            <span>+591 70252765</span>
          </div>
          <div className="info-item">
            <i className="info-icon fa-brands fa-linkedin" />
            <a
              href="https://www.linkedin.com/in/fernando-angulo-16a204226/"
              target="_blank" rel="noreferrer"
              className="social-link"
            >LinkedIn</a>
          </div>
          <div className="info-item">
            <i className="info-icon fa-brands fa-github" />
            <a
              href="https://github.com/luisfernandoAngulo28"
              target="_blank" rel="noreferrer"
              className="social-link"
            >luisfernandoAngulo28</a>
          </div>
        </div>

        <button className="btn-pdf" onClick={() => window.print()}>
          <i className="fa-solid fa-file-arrow-down" /> Descargar CV
        </button>

        <div className="sidebar-divider" />

        {/* Tech icons por categoría */}
        <div className="sidebar-tech">
          {TECH_GROUPS.map(g => (
            <div key={g.label} className="sidebar-tech-group">
              <span className="sidebar-tech-label">
                <i className={`cat-icon fa-solid ${CAT_ICONS[g.label] ?? 'fa-circle'}`} />
                {g.label}
              </span>
              <div className="tech-icon-row">
                {g.items.map(t => (
                  t.icon
                    ? <i key={t.name} className={`tech-icon ${t.icon}`} title={t.name} />
                    : <span key={t.name} className="tech-pill" title={t.name}>{t.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────── */}
      <main className="main">

        {/* Perfil */}
        <section className="card scroll-reveal">
          <h2 className="section-title">
            <i className="section-icon fa-solid fa-user" /> Perfil Profesional
          </h2>
          <p className="profile-text">
            Ingeniero en Redes y Telecomunicaciones y estudiante de Ingeniería en
            Informática (8vo semestre), con sólida formación académica y práctica.
            Cuento con experiencia construyendo módulos, integrando APIs REST,
            trabajando con Git y gestionando bases de datos. Me caracterizo por ser
            responsable, honrado y orientado a resultados, con alta disposición para
            aprender continuamente y aportar valor al equipo.
          </p>
        </section>

        {/* Formación Académica */}
        <section className="card scroll-reveal">
          <h2 className="section-title">
            <i className="section-icon fa-solid fa-graduation-cap" /> Formación Académica
          </h2>

          {/* Títulos universitarios */}
          {(() => {
            const titulos = cv.formacion.filter(f => !f.titulo.toLowerCase().startsWith('diplomado'))
            const diplomas = cv.formacion.filter(f => f.titulo.toLowerCase().startsWith('diplomado'))
            return (
              <>
                {titulos.length > 0 && (
                  <>
                    <p className="form-subtitle"><i className="fa-solid fa-school" /> Títulos Universitarios</p>
                    <ul className="timeline-list" style={{ marginBottom: '1rem' }}>
                      {titulos.map((f, i) => (
                        <li key={f.id ?? i} className="timeline-item">
                          <div className="timeline-dot" />
                          <div className="timeline-content">
                            <p className="timeline-title">{f.titulo}</p>
                            <p className="timeline-meta">{f.institucion} · {f.anio}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {diplomas.length > 0 && (
                  <>
                    <p className="form-subtitle"><i className="fa-solid fa-certificate" /> Diplomados</p>
                    <ul className="timeline-list">
                      {diplomas.map((f, i) => (
                        <li key={f.id ?? i} className="timeline-item">
                          <div className="timeline-dot" style={{ background: 'linear-gradient(135deg,#0891b2,#22d3ee)' }} />
                          <div className="timeline-content">
                            <p className="timeline-title">{f.titulo}</p>
                            <p className="timeline-meta">{f.institucion} · {f.anio}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )
          })()}
        </section>

        {/* Experiencia Profesional */}
        {cv.experiencia && cv.experiencia.length > 0 && (
          <section className="card scroll-reveal">
            <h2 className="section-title">
              <i className="section-icon fa-solid fa-briefcase" /> Experiencia Profesional
            </h2>
            <ul className="timeline-list">
              {cv.experiencia.map((e, i) => (
                <li key={e.id ?? i} className="timeline-item">
                  <div className="timeline-dot exp-dot" />
                  <div className="timeline-content">
                    <p className="timeline-title">{e.cargo}</p>
                    <p className="exp-empresa">{e.empresa}</p>
                    <span className="exp-badge">{e.periodo}</span>
                    <p className="exp-desc">{e.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Proyectos */}
        <section className="card fade-in" style={{ animationDelay: '0.35s' }}>
          <h2 className="section-title">
            <i className="section-icon fa-solid fa-code" /> Proyectos Destacados
          </h2>
          <div className="proj-grid">
            {PROJECTS.map(p => (
              <div key={p.name} className="proj-card">
                <div className="proj-header">
                  <span className="proj-title">{p.name}</span>
                  <span className="proj-status" style={{ color: p.color, borderColor: p.color, background: p.color + '18' }}>{p.status}</span>
                </div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map(t => (
                    <i key={t.name} className={`tech-icon ${t.icon}`} title={t.name} style={{ fontSize: '1.1rem' }} />
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                  <i className="fa-brands fa-github" /> Ver en GitHub
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Idiomas */}
        <section className="card fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-title">
            <i className="section-icon fa-solid fa-language" /> Idiomas
          </h2>
          <div className="lang-list">
            <div className="lang-item">
              <div className="lang-header">
                <span className="lang-name">Español</span>
                <span className="lang-level native">Nativo</span>
              </div>
              <div className="lang-bar"><div className="lang-fill" style={{ width: '100%', background: 'linear-gradient(90deg,#4f46e5,#818cf8)' }} /></div>
            </div>
            <div className="lang-item">
              <div className="lang-header">
                <span className="lang-name">Inglés</span>
                <span className="lang-level b1">B1 — Intermedio</span>
              </div>
              <div className="lang-bar"><div className="lang-fill" style={{ width: '55%', background: 'linear-gradient(90deg,#0891b2,#22d3ee)' }} /></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <span>Datos cargados desde <strong>MySQL</strong> vía <strong>Node.js</strong> · Desplegado con <strong>Docker</strong></span>
        </footer>
      </main>
    </div>
  )
}
