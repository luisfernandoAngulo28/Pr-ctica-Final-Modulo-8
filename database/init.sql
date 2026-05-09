SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS cvdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cvdb;

CREATE TABLE IF NOT EXISTS persona (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  nombre    VARCHAR(100) NOT NULL,
  apellido  VARCHAR(100) NOT NULL,
  ciudad    VARCHAR(100) NOT NULL,
  foto      VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS formacion (
  id         INT PRIMARY KEY AUTO_INCREMENT,
  titulo     VARCHAR(255) NOT NULL,
  institucion VARCHAR(255) NOT NULL,
  anio       VARCHAR(50),
  persona_id INT,
  FOREIGN KEY (persona_id) REFERENCES persona(id)
);

INSERT INTO persona (nombre, apellido, ciudad, foto) VALUES (
  'Luis Fernando',
  'Angulo Heredia',
  'Santa Cruz de la Sierra',
  '/FotodePerfil.jpg'
);

INSERT INTO formacion (titulo, institucion, anio, persona_id) VALUES
  ('Diplomado en FullStack Developer (Back-End y Front-End)', 'Universidad SIMON PATIÑO (USIP)', '2025', 1),
  ('Diplomado en Desarrollo y Programación de Aplicaciones Móviles', 'Universidad del Valle (UNIVALLE)', '2024', 1),
  ('Diplomado en Automatización Avanzada de Redes de Comunicación', 'UAGRM – UPG FICCT', '2023', 1),
  ('Lic. en Ingeniería en Redes y Telecomunicaciones', 'UAGRM', '2023', 1),
  ('Lic. en Ingeniería en Informática (8vo Semestre – En Curso)', 'UAGRM', 'Presente', 1);

CREATE TABLE IF NOT EXISTS experiencia (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  cargo       VARCHAR(255) NOT NULL,
  empresa     VARCHAR(255) NOT NULL,
  periodo     VARCHAR(100),
  descripcion TEXT,
  persona_id  INT,
  FOREIGN KEY (persona_id) REFERENCES persona(id)
);

INSERT INTO experiencia (cargo, empresa, periodo, descripcion, persona_id) VALUES
  ('Pasante Desarrollador Móvil (React Native)', 'Desarrollamelo Software Factory', 'Dic 2025 – Presente', 'Desarrollo de funcionalidades en apps iOS/Android con React Native. Integración de APIs REST, corrección de bugs y trabajo colaborativo con Git.', 1),
  ('Auxiliar Sala de Cómputo / Soporte TI (CPD)', 'UAGRM – Facultad de Ciencias Veterinarias', 'Ago 2025 – Dic 2025', 'Mantenimiento preventivo/correctivo de equipos, soporte técnico en aulas y biblioteca, configuración de routers y access points.', 1),
  ('Pasante Desarrollador Fullstack-Móvil', 'Desarrollamelo Software Factory', 'Mar 2025 – Ago 2025', 'Construcción de ecommerce end-to-end: catálogo, autenticación, carrito y CRUD de productos. Diseño UI mobile-first con TailwindCSS.', 1),
  ('Asistente de Sistemas', 'Agropartners S.R.L.', 'Feb 2024 – Feb 2025', 'Diagnóstico de incidencias de hardware y software, soporte a servidores Active Directory, configuración de telefonía IP e instalación de software empresarial (TR4, SAP).', 1);
