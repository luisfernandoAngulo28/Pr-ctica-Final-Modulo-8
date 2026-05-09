const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ── Pool de conexiones MySQL (maneja reconexiones automáticamente) ─────────────
const pool = mysql.createPool({
  host            : process.env.DB_HOST     || 'database',
  user            : process.env.DB_USER     || 'root',
  password        : process.env.DB_PASSWORD || 'root',
  database        : process.env.DB_NAME     || 'cvdb',
  charset         : 'utf8mb4',
  waitForConnections: true,
  connectionLimit : 10,
  queueLimit      : 0,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('⏳ Error inicial al conectar con MySQL:', err.message);
  } else {
    console.log('✅ Pool de MySQL listo');
    conn.release();
  }
});

// ── Endpoint principal ────────────────────────────────────────────────────────
app.get('/cv', (req, res) => {
  const queryPersona = `
    SELECT
      p.id, p.nombre, p.apellido, p.ciudad, p.foto,
      f.id AS formacion_id, f.titulo, f.institucion, f.anio
    FROM persona p
    LEFT JOIN formacion f ON p.id = f.persona_id
    WHERE p.id = 1
    ORDER BY f.id ASC
  `;
  const queryExp = `SELECT id, cargo, empresa, periodo, descripcion FROM experiencia WHERE persona_id = 1 ORDER BY id ASC`;

  pool.query(queryPersona, (err, rows) => {
    if (err) {
      console.error('❌ Error en query persona:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron datos' });
    }

    pool.query(queryExp, (err2, expRows) => {
      if (err2) {
        console.error('❌ Error en query experiencia:', err2.message);
        return res.status(500).json({ error: err2.message });
      }

      const persona = {
        id        : rows[0].id,
        nombre    : rows[0].nombre,
        apellido  : rows[0].apellido,
        ciudad    : rows[0].ciudad,
        foto      : rows[0].foto,
        formacion : rows
          .filter(r => r.titulo)
          .map(r => ({
            id         : r.formacion_id,
            titulo     : r.titulo,
            institucion: r.institucion,
            anio       : r.anio,
          })),
        experiencia: expRows.map(e => ({
          id         : e.id,
          cargo      : e.cargo,
          empresa    : e.empresa,
          periodo    : e.periodo,
          descripcion: e.descripcion,
        })),
      };

      res.json(persona);
    });
  });
});


// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Inicio ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend corriendo en el puerto ${PORT}`));
