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
  'https://ui-avatars.com/api/?name=Luis+Fernando+Angulo&size=200&background=4F46E5&color=fff&bold=true'
);

INSERT INTO formacion (titulo, institucion, anio, persona_id) VALUES
  ('Diplomado en FullStack Developer (Back-End y Front-End)', 'Universidad SIMON PATIÑO (USIP)', '2025', 1),
  ('Diplomado en Desarrollo y Programación de Aplicaciones Móviles', 'Universidad del Valle (UNIVALLE)', '2024', 1),
  ('Diplomado en Automatización Avanzada de Redes de Comunicación', 'UAGRM – UPG FICCT', '2023', 1),
  ('Lic. en Ingeniería en Redes y Telecomunicaciones', 'UAGRM', '2023', 1),
  ('Lic. en Ingeniería en Informática (8vo Semestre – En Curso)', 'UAGRM', 'Presente', 1);
