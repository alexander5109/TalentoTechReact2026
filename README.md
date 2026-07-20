# APD Finder

Aplicación web desarrollada con **React** para la búsqueda y gestión de **Actos Públicos Digitales (APD)** de la Provincia de Buenos Aires.

Proyecto realizado como entrega final integradora para:

**TalentoTech - Curso de React - 2026**

---

## 🌐 Demo

https://talento-tech-react2026.vercel.app/

---

## 📂 Repositorio

https://github.com/alexander5109/TalentoTechReact2026

---

## 👨‍💻 Autor

**Alexander Seling**

---

# Descripción

APD Finder es una aplicación frontend inspirada en los sistemas oficiales de Actos Públicos Digitales utilizados por docentes de la Provincia de Buenos Aires.

En lugar de implementar un e-commerce tradicional, el proyecto adapta los requerimientos del curso a un dominio específico del ámbito educativo.

Entre sus principales funcionalidades permite:

- consultar ofertas de actos públicos
- aplicar filtros dinámicos
- administrar perfiles de búsqueda
- guardar postulaciones pendientes
- registrarse e iniciar sesión
- administrar promociones mediante una cuenta de administrador

---

# Funcionalidades principales

## 🔐 Autenticación de usuarios

Implementada mediante **Firebase Authentication**.

Incluye:

- registro de usuarios
- inicio y cierre de sesión
- edición del perfil
- subida de avatar (ImgBB)
- rutas protegidas para usuarios autenticados
- rutas de administración protegidas por rol

---

## 📋 Gestión de postulaciones

El requerimiento de "carrito de compras" fue readaptado al dominio de la aplicación como:

> **Postulaciones Pendientes**

Permite:

- agregar ofertas
- eliminar postulaciones
- contador global en la barra de navegación
- almacenamiento mediante Context API

---

## 🔎 Perfiles de búsqueda

Cada usuario puede guardar múltiples perfiles de búsqueda compuestos por filtros personalizados.

Cada perfil almacena, entre otros:

- cargos
- distritos
- niveles
- turnos
- estados

Estos perfiles representan futuras alertas automáticas sobre actos públicos.

Implementado mediante **Firebase Firestore**.

---

## 🎁 Gestión de promociones

El concepto tradicional de **cupones de descuento** fue adaptado al dominio de la aplicación mediante un sistema de **promociones**, administrado por una cuenta con permisos de administrador.

Cada promoción puede asociarse a una o varias **features** (funcionalidades premium) que se habilitan para el usuario al ingresar un código promocional válido.

El administrador puede:

- crear promociones
- editarlas
- activarlas o desactivarlas
- eliminarlas
- asociarles un código promocional
- definir las features que habilita cada una

De esta manera, el proyecto adapta el requerimiento de **cupones de descuento** a una solución acorde al contexto de una aplicación para la gestión de Actos Públicos Digitales.

---

## 📚 Catálogo de ofertas

Las ofertas son obtenidas desde un archivo JSON local mediante `fetch`.

Actualmente se utiliza un pequeño **fake delay** para simular tiempos reales de carga y visualizar los spinners implementados.

Cada oferta posee:

- vista resumida
- vista detallada
- filtros dinámicos
- posibilidad de agregarse a postulaciones pendientes

---

## 🎨 Diseño

Se desarrolló una pequeña biblioteca propia de componentes reutilizables para mantener una interfaz consistente.

Incluye componentes como:

- Panels
- Containers
- Layouts Flex
- Layouts Grid
- Botones
- Inputs
- Selects
- Checkboxes
- Tarjetas

La aplicación posee un diseño parcialmente responsive mediante Flexbox, Grid y Media Queries.

---

# Tecnologías utilizadas

- React
- React Router DOM
- Context API
- Firebase Authentication
- Firebase Firestore
- Vite
- CSS Modules
- SweetAlert2
- ImgBB API

---

# Requerimientos de la entrega

## ✅ Gestión de usuarios

- Registro
- Login
- Logout
- Perfil editable
- Avatar
- Protección de rutas

## ✅ CRUD con Firestore

Usuarios:

- CRUD de perfiles de búsqueda

Administrador:

- CRUD completo de promociones

## ✅ Optimización visual

- Componentes reutilizables
- Layouts propios
- Spinners personalizados
- SweetAlert2 para mensajes y confirmaciones

## ✅ Deploy

Proyecto desplegado en:

https://talento-tech-react2026.vercel.app/

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/alexander5109/TalentoTechReact2026
```

Instalar dependencias

```bash
npm install
```

Ejecutar

```bash
npm run dev
```

Compilar

```bash
npm run build
```

---

# Cuentas de prueba

## Administrador

Correo

```
admin@gmail.com
```

Contraseña

```
admin1234
```

---

## Usuario de prueba

Correo

```
alexanderseling@outlook.com
```

Contraseña

```
123456
```

---

# Observaciones

- Los avatares de usuario son almacenados utilizando la API de ImgBB.
- La autenticación se realiza mediante Firebase Authentication.
- Los datos persistentes (usuarios, perfiles y promociones) se almacenan en Firebase Firestore.
- Las ofertas docentes se consumen desde un JSON estático que simula la respuesta de una API real.
- El sistema de promociones adapta el concepto de cupones de descuento al dominio de la aplicación, habilitando funcionalidades premium.
- El concepto de carrito de compras fue reinterpretado como **Postulaciones Pendientes**, respetando la temática del proyecto.

---

# Estado del proyecto

✅ Proyecto finalizado como entrega integradora del curso **TalentoTech React 2026**.