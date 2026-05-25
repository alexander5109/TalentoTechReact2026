# APD Finder

Aplicación web desarrollada con React para la búsqueda y gestión de Actos Públicos Digitales (APD) de la Provincia de Buenos Aires.

El proyecto fue realizado como entrega integradora para la cursada:

**TalentoTech - Curso de React - 2026**

---

## Deploy online

https://talento-tech-react2026.vercel.app/

---

## Alumno

Alexander Seling

---

## Descripción del proyecto

APD Finder es una aplicación frontend inspirada en los sistemas oficiales de Actos Públicos Digitales utilizados por docentes de la Provincia de Buenos Aires.

La aplicación permite:

- visualizar ofertas docentes
- filtrarlas dinámicamente
- navegar entre distintas páginas utilizando React Router
- acceder al detalle de cada oferta
- agregar ofertas a una lista de postulaciones pendientes
- gestionar postulaciones mediante Context API

El concepto tradicional de “carrito” fue adaptado a la lógica de negocio del proyecto como:

> “Postulaciones pendientes”

---

## Tecnologías utilizadas

- React
- React Router DOM
- Context API
- Vite
- CSS Modules
- SweetAlert2

---

## Funcionalidades implementadas

### Layout general

- Header reutilizable
- NavBar responsive
- Footer con información institucional y tarjetas de integrantes

### Catálogo de ofertas

- Lectura de datos desde `ofertas.json`
- Uso de `fetch` y `useEffect`
- Renderizado dinámico mediante componentes reutilizables

### Sistema de filtros

- Filtrado reactivo por:
  - cargo
  - distrito
  - turno

### Sistema de ruteo

Rutas implementadas:

- `/`
- `/ofertas`
- `/ofertas/:id`
- `/about`
- `/contacto`
- `/pendingPostulations`

### Estado global

Implementado mediante Context API:

- agregar postulaciones
- quitar postulaciones
- contador global en navbar
- visualización de postulaciones pendientes

### Diseño y experiencia visual

- Estética inspirada en pergaminos/documentación institucional
- Fuente Albertus cargada localmente
- Navbar responsive
- Componentes reutilizables de contenido y presentación

---

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/alexander5109/TalentoTechReact2026
```

Instalar dependencias:

```bash
npm install
```

Ejecutar entorno de desarrollo:

```bash
npm run dev
```

Generar build de producción:

```bash
npm run build
```

---

## Estado del proyecto

Proyecto académico funcional desarrollado como pre-entrega/final integrador del curso de React.

Actualmente el estado global se mantiene únicamente en memoria (sin persistencia en localStorage o backend).

---

## Observaciones

El proyecto toma como inspiración los sistemas reales de Actos Públicos Digitales utilizados en educación pública bonaerense, reinterpretando varias funcionalidades tradicionales de e-commerce hacia una lógica orientada a postulaciones docentes.
