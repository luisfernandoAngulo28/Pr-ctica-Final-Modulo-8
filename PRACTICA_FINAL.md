# Práctica Final 

## Objetivo 
Implementar una aplicación web de CV personal utilizando Docker Compose, Dockerfiles, redes, volúmenes y contenedores integrados con React, Node.js y MySQL. 

## Descripción del Proyecto 
La práctica consiste en desarrollar y desplegar un sitio web que muestre su CV personal. La solución deberá estar compuesta por: 
- Frontend en ReactJS 
- Backend en Node.js 
- Base de datos MySQL 
- Docker Compose para la orquestación completa 

La aplicación debe recuperar información desde MySQL y mostrarla en una interfaz web. La información mínima que deberá mostrarse es: 
- Datos personales: nombre, apellido, ciudad, fotografía 
- Formación académica (listado) 

## Entregables 
Se debe entregar un documento PDF que contenga: 
1. URL del repositorio en GitHub para descargar el proyecto. 
2. Nombre de las imágenes publicadas en Docker Hub. 
3. Capturas de pantalla que evidencien: 
   - construcción de imágenes 
   - publicación en Docker Hub 
   - ejecución de Docker Compose 
   - creación automática de la base de datos 
   - funcionamiento de la aplicación en el navegador 
4. Instrucciones de ejecución del proyecto. 
5. Comando utilizado para iniciar la aplicación. 

La aplicación deberá poder ejecutarse correctamente utilizando:
```bash
docker compose up -d
```

## Instrucciones 

### 1. Arquitectura 
La solución deberá contener los siguientes servicios: 

| Servicio | Tecnología | Puerto |
|----------|-----------|--------|
| frontend | React + Nginx | 3000 |
| backend | Node.js | 4000 |
| database | MySQL | 3306 |

Todos los servicios deberán comunicarse mediante una única red Docker. 

### 2. Frontend 
El frontend deberá: 
- Ser desarrollado en ReactJS. 
- Mostrar: 
  - Datos personales: nombre, apellido, ciudad, fotografía 
  - Formación académica (listado) 
- Consumir datos desde el backend. 
- Ejecutarse utilizando Nginx dentro de un contenedor Docker. 
- Tener un Dockerfile propio. 

| Parámetro | Valor |
|-----------|-------|
| Puerto | 3000 |
| Versión | nginx:1.27-alpine |

### 3. Backend 
El backend deberá: 
- Estar desarrollado con Node.js. 
- Exponer al menos un endpoint GET. 
- Obtener información desde MySQL. 
- Retornar datos en formato JSON. 
- Tener un Dockerfile propio.

| Parámetro | Valor |
|-----------|-------|
| Endpoint | GET /cv |
| Puerto | 4000 |
| Versión | node:20-alpine |

### 4. Base de Datos 

| Parámetro | Valor |
|-----------|-------|
| Versión | mysql:8.0 |

Ejecución: 
- La base de datos deberá crearse automáticamente al iniciar Docker Compose. 
- La creación de tablas y registros deberá realizarse mediante scripts SQL. 
- No está permitido crear tablas manualmente. 

### 5. Estructura de Base de Datos 
La base de datos deberá contener mínimamente las siguientes tablas. 

**Tabla: persona**

| Campo | Tipo |
|-------|------|
| id | INT |
| nombre | VARCHAR |
| apellido | VARCHAR |
| ciudad | VARCHAR |
| foto | VARCHAR |

**Tabla: formacion**

| Campo | Tipo |
|-------|------|
| id | INT |
| titulo | VARCHAR |
| institucion | VARCHAR |
| anio | VARCHAR |
| persona_id | INT |

### 6. Dockerfiles 
La práctica deberá contener: 
- un Dockerfile para frontend 
- un Dockerfile para backend 

No está permitido utilizar imágenes generadas manualmente sin Dockerfile. 

### 7. Docker Hub 
Las imágenes deberán estar publicadas previamente en Docker Hub. 
Cada estudiante deberá utilizar imágenes con su apellido. 

**Formato obligatorio:**
- Frontend: `apellido-frontend:v1`
- Backend: `apellido-backend:v1`

No está permitido utilizar nombres diferentes. 

Configurar reinicio automático en el backend `restart: always` para garantizar la conexión a MySQL.

### 8. Docker Compose 
El archivo docker-compose.yml deberá: 
- descargar imágenes desde Docker Hub 
- definir obligatoriamente los siguientes servicios: 
  - frontend 
  - backend 
  - database 
- configurar una sola red Docker 
- configurar dependencias mediante depends_on 
- configurar un volumen para MySQL 
- utilizar versiones específicas 
- permitir iniciar toda la aplicación con un solo comando 

### 9. Volúmenes 
Se deberá utilizar un volumen Docker para persistencia de MySQL. 

Ejemplo: 
```yaml
volumes: 
  mysql_data:
```

### 10. Red Docker 
Se deberá utilizar una única red Docker. 

Ejemplo: 
```yaml
networks: 
  cv_network:
```

### 11. Inicialización automática de Base de Datos 
La base de datos deberá: 
- crear tablas automáticamente 
- insertar registros automáticamente 
- ejecutarse sin intervención manual 

Se recomienda utilizar scripts SQL montados en:
```
/docker-entrypoint-initdb.d
```

### 12. Estructura sugerida del Proyecto 
```
proyecto/
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   └── package.json
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── database/
│   └── init.sql
└── docker-compose.yml
```

### 13. Flujo esperado de funcionamiento 
Al ejecutar el siguiente comando: 
```bash
docker compose up -d
```

La solución deberá funcionar automáticamente en el siguiente orden: 
1. Docker Compose descarga automáticamente las imágenes publicadas en Docker Hub. 
2. Docker Compose inicia el contenedor de MySQL. 
3. MySQL crea automáticamente la base de datos. 
4. MySQL ejecuta automáticamente el script SQL ubicado en /docker-entrypoint-initdb.d. 
5. El script SQL crea las tablas persona y formacion. 
6. El script SQL inserta automáticamente los registros iniciales. 
7. Docker Compose inicia el contenedor del backend. 
8. El backend se conecta correctamente a MySQL. 
9. El backend expone un endpoint GET para consultar la información del CV. 
10. Docker Compose inicia el contenedor del frontend. 
11. El frontend consume la información desde el backend.
12. El navegador muestra correctamente el CV del estudiante. 

La solución completa deberá ejecutarse sin intervención manual. 

### 14. Resultado esperado 
Después de ejecutar: 
```bash
docker compose up -d
```

Al ingresar al navegador en: 
```
http://localhost:3000
```

Se deberá visualizar: 
- fotografía del estudiante 
- nombre 
- apellido 
- ciudad 
- formación académica (listado) 

Toda la información deberá provenir desde la base de datos MySQL mediante el backend Node.js. 

## Criterios de calificación

| Criterio | Porcentaje | Descripción |
|----------|-----------|-------------|
| Funcionamiento integral | 25% | La aplicación inicia correctamente con un solo comando y muestra información desde la base de datos. |
| Documento de entrega y evidencias | 25% | Entrega correcta del documento PDF con URL de descarga, capturas de evidencias, nombres de imágenes publicadas e instrucciones de ejecución. |
| Base de Datos | 25% | Creación automática de tablas y registros mediante scripts SQL funcionando correctamente. |
| Docker Compose | 25% | Configuración correcta de servicios, red, puertos, volumen y dependencias. |
