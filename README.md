# 🐳 Práctica Final — CV Personal con Docker

<div align="center">

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

</div>

---

## 📚 Información Académica

| Campo | Detalle |
|-------|---------|
| **Programa** | Diplomado en FullStack Developer Back End y Front End |
| **Módulo** | Módulo VIII — Administración y Despliegue de Aplicaciones con Docker |
| **Docente** | Marco Antonio Avendaño Ajata |
| **Estudiante** | Angulo Heredia Luis Fernando |
| **Institución** | Universidad SIMON PATIÑO (USIP) |

---

## 📋 Descripción del Proyecto

Aplicación web de **CV personal** desplegada con **Docker Compose**, compuesta por tres servicios integrados:

- 🎨 **Frontend** — ReactJS servido con Nginx
- ⚙️ **Backend** — Node.js con Express (API REST)
- 🗄️ **Base de datos** — MySQL 8.0 con inicialización automática

Toda la información del CV (datos personales y formación académica) se almacena en MySQL y es consumida por el frontend a través del backend, **sin intervención manual**.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│           cv_network (Docker)           │
│                                         │
│  ┌──────────┐    ┌──────────┐           │
│  │ frontend │───▶│ backend  │           │
│  │  :3000   │    │  :4000   │           │
│  │  React   │    │ Node.js  │           │
│  │  +Nginx  │    │ Express  │           │
│  └──────────┘    └────┬─────┘           │
│                       │                 │
│                  ┌────▼─────┐           │
│                  │ database │           │
│                  │  :3306   │           │
│                  │ MySQL8.0 │           │
│                  └──────────┘           │
└─────────────────────────────────────────┘
```

| Servicio | Tecnología | Puerto | Imagen Docker Hub |
|----------|-----------|--------|-------------------|
| frontend | React + Nginx (nginx:1.27-alpine) | 3000 | `fernandoangulo23/angulo-frontend:v1` |
| backend | Node.js (node:20-alpine) | 4000 | `fernandoangulo23/angulo-backend:v1` |
| database | MySQL 8.0 | 3306 | `mysql:8.0` (oficial) |

---

## 📁 Estructura del Proyecto

```
ProyectoFinal/
├── 📂 frontend/
│   ├── Dockerfile          ← Multi-stage: Node build + Nginx serve
│   ├── nginx.conf          ← Proxy /api/ → backend:4000
│   ├── vite.config.js
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx         ← Componente CV (consume API)
│       └── index.css       ← Diseño dark mode
├── 📂 backend/
│   ├── Dockerfile          ← node:20-alpine
│   ├── server.js           ← Express + endpoint GET /cv
│   └── package.json
├── 📂 database/
│   └── init.sql            ← Crea tablas e inserta datos automáticamente
├── 📂 capturas/            ← Evidencias de la práctica
├── docker-compose.yml      ← Orquestación completa
└── INFORME.md              ← Documento de entrega
```

---

## 🚀 Guía de Ejecución

### Pre-requisitos

- ✅ [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución
- ✅ Conexión a internet (para descargar imágenes desde Docker Hub)
- ✅ Puertos **3000** y **4000** disponibles

### ▶️ Iniciar la aplicación

```bash
# 1. Clonar el repositorio
git clone https://github.com/luisfernandoAngulo28/Pr-ctica-Final-Modulo-8.git
cd Pr-ctica-Final-Modulo-8

# 2. Levantar todos los servicios (un solo comando)
docker compose up -d
```

### 🌐 Acceder a la aplicación

Una vez iniciados los contenedores, abrir en el navegador:

```
http://localhost:3000
```

### 🔍 Verificar el backend (API)

```
http://localhost:4000/cv
```

Respuesta esperada (JSON):
```json
{
  "id": 1,
  "nombre": "Luis Fernando",
  "apellido": "Angulo Heredia",
  "ciudad": "Santa Cruz de la Sierra",
  "foto": "...",
  "formacion": [ ... ]
}
```

### ⏹️ Detener la aplicación

```bash
# Detener contenedores
docker compose down

# Detener y eliminar volúmenes (reset completo)
docker compose down -v
```

---

## 🔄 Flujo de Funcionamiento Automático

Al ejecutar `docker compose up -d`:

```
1. ✅ Docker descarga imágenes desde Docker Hub
2. ✅ Inicia cv_database (MySQL 8.0)
3. ✅ MySQL crea automáticamente la base de datos 'cvdb'
4. ✅ MySQL ejecuta /docker-entrypoint-initdb.d/init.sql
5. ✅ init.sql crea las tablas 'persona' y 'formacion'
6. ✅ init.sql inserta los registros del CV automáticamente
7. ✅ Inicia cv_backend (Node.js) con restart: always
8. ✅ Backend se conecta a MySQL mediante pool de conexiones
9. ✅ Backend expone GET /cv en el puerto 4000
10. ✅ Inicia cv_frontend (React + Nginx)
11. ✅ Frontend consume datos desde el backend
12. ✅ CV disponible en http://localhost:3000
```

---

## 🐳 Imágenes en Docker Hub

| Imagen | Tag | Enlace |
|--------|-----|--------|
| `fernandoangulo23/angulo-frontend` | `v1` | [Docker Hub](https://hub.docker.com/r/fernandoangulo23/angulo-frontend) |
| `fernandoangulo23/angulo-backend` | `v1` | [Docker Hub](https://hub.docker.com/r/fernandoangulo23/angulo-backend) |

---

## 🗄️ Base de Datos

### Tabla `persona`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT PK | Identificador |
| nombre | VARCHAR(100) | Luis Fernando |
| apellido | VARCHAR(100) | Angulo Heredia |
| ciudad | VARCHAR(100) | Santa Cruz de la Sierra |
| foto | VARCHAR(255) | URL de la fotografía |

### Tabla `formacion`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT AUTO_INCREMENT PK | Identificador |
| titulo | VARCHAR(255) | Nombre del título/diplomado |
| institucion | VARCHAR(255) | Institución educativa |
| anio | VARCHAR(50) | Año de obtención |
| persona_id | INT FK | Referencia a persona |

---

## 📸 Evidencias

Las capturas de pantalla se encuentran en la carpeta [`capturas/`](./capturas/):

| # | Evidencia |
|---|-----------|
| 01 | Construcción de imágenes (`docker build`) |
| 02 | Publicación en Docker Hub (`docker push`) |
| 03 | Ejecución de Docker Compose (`docker compose up -d`) |
| 04 | Logs de MySQL (creación automática de BD) |
| 05 | Backend retornando JSON (`localhost:4000/cv`) |
| 06 | Docker Desktop con contenedores activos |
| 07 | Aplicación CV en el navegador (`localhost:3000`) |

---

## 👨‍💻 Estudiante

**Luis Fernando Angulo Heredia**  
Ing. Redes y Telecomunicaciones  
✉️ fernando.fa671@gmail.com
