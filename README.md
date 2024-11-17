# AniMangaDatahub

Este proyecto es una aplicación web desarrollada con React y Vite. Proporciona diversas funcionalidades relacionadas con la búsqueda y visualización de información sobre anime, manga y sus personajes. Está organizada en diferentes secciones y utiliza componentes modulares para facilitar su mantenimiento y escalabilidad.

## Funcionalidades principales

1. **Autenticación de usuarios**:

   - Registro, inicio de sesión y edición de perfil.
   - Formulario de contacto para los usuarios.

2. **Búsqueda y resultados**:

   - Permite buscar anime y manga por temporadas, nombres o categorías específicas.
   - Muestra listados como:
     - Mejores animes y mangas.
     - Búsquedas detalladas por título o género.

3. **Información detallada**:

   - Páginas dedicadas a mostrar información sobre animes, mangas, personajes y "seiyuus".

4. **Interfaz**:

   - Componentes reutilizables como botones, tarjetas y barras de búsqueda.
   - Sistema de navegación con `Navbar` y `Footer`.

5. **Manejo de errores**:

   - Página 404 personalizada para rutas no encontradas.

6. **Temas**:
   - Integración de un contexto de temas (`ThemeContext.jsx`) para gestionar la apariencia de la aplicación.

## Estructura del proyecto

El proyecto está organizado en las siguientes carpetas:

- `assets/`: Contiene imágenes y recursos estáticos.
- `components/`: Contiene componentes reutilizables organizados en subcarpetas como:
  - `auth/`: Componentes relacionados con autenticación.
  - `layouts/`: Elementos estructurales como Navbar, Footer, etc.
  - `info/`: Componentes para mostrar detalles específicos.
  - `shared/`: Componentes comunes como botones, tarjetas y calificaciones.
- `context/`: Contexto global de React para el manejo del tema o estado compartido.
- `layouts/`: Plantillas generales que se aplican en múltiples páginas del proyecto.
- `pages/`: Páginas principales de la aplicación clasificadas por categorías:
  - `auth/`: Registro, inicio de sesión, perfil y contacto.
  - `info/`: Páginas de detalles de anime, manga, personajes y seiyuus.
  - `results/`: Búsquedas y listados de anime/manga.
  - `errors/`: Páginas para errores.
- `router/`: Configuración de las rutas de la aplicación.
- `src/`: Archivos principales del proyecto (`App.jsx`, `index.jsx`, etc.).

## Enrutado

La aplicación utiliza `react-router-dom` para manejar las rutas. A continuación, se describe el enrutado implementado:

- **Ruta raíz (`/`)**:

  - Carga el `LayoutPublic` y la página principal (`Home`).

- **Autenticación**:

  - `/login`: Página de inicio de sesión.
  - `/register`: Página de registro.
  - `/profile`: Perfil del usuario.
    - `/profile/edit`: Página para editar el perfil.
  - `/contact`: Página de contacto.

- **Anime**:

  - `/anime/:id`: Detalles de un anime específico.
  - `/anime/search`: Página para buscar animes.
  - `/anime/top`: Listado de los mejores animes.
  - `/anime/season`: Listado de animes por temporada.

- **Manga**:

  - `/manga/:id`: Detalles de un manga específico.
  - `/manga/search`: Página para buscar mangas.
  - `/manga/top`: Listado de los mejores mangas.
  - `/manga/season`: Listado de mangas por temporada.

- **Información adicional**:

  - `/seiyuu/:id`: Detalles de un seiyuu.
  - `/character/:id`: Detalles de un personaje.

- **Errores**:
  - Página 404 personalizada para rutas no encontradas.

## API utilizada

Esta aplicación utiliza la [API de Jikan](https://docs.api.jikan.moe/) para obtener información actualizada sobre animes, mangas, personajes y "seiyuus". La API es una herramienta de acceso público basada en los datos de MyAnimeList.

## Requisitos previos

- **Node.js** (versión 16 o superior).
- **npm** o **yarn** como gestor de paquetes.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/usuario/proyecto-react-vite.git
```

2. Accede al directorio del proyecto:

```bash
cd proyecto-react-vite
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

O con Yarn:

```bash
yarn install
```

## Ejecución del proyecto

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

O con Yarn:

```bash
yarn dev
```

2. Abre tu navegador en http://localhost:5173 para ver la aplicación en funcionamiento.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run preview`: Previsualiza la aplicación en modo de producción.
