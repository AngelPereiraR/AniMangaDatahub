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
     - Búsquedas detalladas por título u otros filtros.

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

- `assets/`: Contiene imágenes y recursos estáticos utilizados en la aplicación.
- `components/`: Contiene componentes reutilizables, organizados en subcarpetas como:
  - `auth/`: Componentes relacionados con autenticación.
  - `info/`: Componentes para mostrar detalles específicos.
  - `layouts/`: Componentes estructurales reutilizables.
  - `results/`: Componentes para resultados de búsqueda o listados.
  - `shared/`: Componentes comunes como botones y tarjetas.
- `config/`: Configuración específica de la aplicación.
- `context/`: Contexto global de React para manejo de estados compartidos.
- `hooks/`: Hooks personalizados para lógica reutilizable.
- `layouts/`: Plantillas generales reutilizables en múltiples páginas.
- `pages/`: Páginas principales de la aplicación, organizadas por secciones:
  - `auth/`: Registro, inicio de sesión y contacto.
  - `info/`: Páginas de detalles como anime, manga o personajes.
  - `results/`: Listados y páginas de búsqueda.
  - `errors/`: Páginas para mostrar errores.
- `router/`: Configuración de las rutas principales de la aplicación.
- `scss/`: Estilos organizados en:
  - `base/`: Estilos base como resets y variables globales.
  - `layouts/`: Estilos para los layouts.
  - `components/`: Estilos para los componentes reutilizables.
  - `pages/`: Estilos específicos de cada página.
  - `utilities/`: Estilos de utilidades globales.
- `src/`: Archivos principales del proyecto (App.jsx, main.jsx, etc.).

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
  - `/anime/top`: Listado de los mejores animes.
  - `/anime/season`: Listado de animes por temporada.

- **Manga**:

  - `/manga/:id`: Detalles de un manga específico.
  - `/manga/top`: Listado de los mejores mangas.
  - `/manga/season`: Listado de mangas por temporada.

- **Información adicional**:

  - `/seiyuu/:id`: Detalles de un seiyuu.
  - `/character/:id`: Detalles de un personaje.

- **Buscar**: -`/search`: Página para realizar búsquedas.

- **Errores**:
  - Página 404 personalizada para rutas no encontradas.

## Integración de API y Comunicación Asíncrona

Este proyecto utiliza la API pública de [Jikan](https://docs.api.jikan.moe/), una API no oficial para MyAnimeList, con el fin de obtener datos en tiempo real sobre animes y mangas. La integración y comunicación asíncrona se han implementado siguiendo los principios de React, haciendo uso de hooks personalizados (`useFetch`) y contextos para gestionar el estado global.

### Detalles de la Implementación

1. Hook personalizado `useFetch`

Este hook se ha creado para encapsular la lógica de solicitudes HTTP y manejar el ciclo de vida de la carga de datos (loading, éxito, error).
Se utiliza para realizar peticiones `GET` a los endpoints de Jikan y retorna los datos procesados, junto con indicadores de carga (`loading`) y errores (`error`).
Ejemplo de uso:

```javascript
const { data, loading, error } = useFetch(
  "https://api.jikan.moe/v4/seasons/now?continuing"
);
```

2. Contextos para Configuración Global

- `FormModeContext` y `EditScreenContext`: Se emplean para manejar estados globales como el modo de formulario y la pantalla de edición, lo cual asegura una experiencia de usuario consistente al navegar entre páginas.
- `ScreenWidthContext`: Permite adaptar dinámicamente la cantidad de elementos mostrados en componentes como carruseles, dependiendo del tamaño de la pantalla del usuario (diseño responsivo).

3.  Gestión de Temporadas y Fechas

- En la página de animes por temporada, se calcula la temporada actual (`Winter`, `Spring`, `Summer`, `Fall`) en función del mes actual, y se permite al usuario navegar entre temporadas y años utilizando botones de navegación.
- Se generan las URL dinámicamente para realizar las solicitudes de datos de la temporada correspondiente.

4.  Pagos y Paginación

- La API de Jikan soporta paginación, y esto se refleja en el componente que muestra los animes por temporada:
  - Se usa un estado (currentPage) para rastrear la página actual.
  - Botones de paginación permiten moverse entre páginas, actualizando la URL de la solicitud según corresponda.

5.  Componentes para la Interfaz de Usuario

- Los datos obtenidos de la API se utilizan para renderizar componentes dinámicos como:
  - `Carousel`: Muestra un carrusel con los animes o mangas más recientes, adaptándose al tamaño de pantalla.
  - `AnimeInfoCard`: Renderiza información detallada sobre cada anime, incluyendo título, imagen, episodios, duración y valoración.

6. Manejo de Errores y Carga

- Mientras los datos están siendo cargados, se muestra un mensaje de "Cargando...".
- Si ocurre un error al realizar la solicitud, se muestra un mensaje informativo en la interfaz:

```javascript
if (loading) return <div>Cargando...</div>;
if (error) return <p>Error!!!</p>;
```

### Ejemplo de Flujo

- Inicio (Home):
  En la página principal (`Home.jsx`), se realizan dos solicitudes simultáneas para:

  - Obtener los animes de la temporada actual:
    Endpoint: `https://api.jikan.moe/v4/seasons/now?continuing`
  - Obtener los mangas actualmente en publicación:
    Endpoint: `https://api.jikan.moe/v4/manga?status=publishing&order_by=start_date&sort=desc`

  Los datos se procesan y se muestran en carruseles dinámicos. Además, si el usuario no está autenticado, se muestran botones para iniciar sesión o registrarse.

- Animes por Temporada:
  En la página `AnimesBySeason`, el usuario puede navegar entre temporadas y años para explorar los animes correspondientes. Los datos se cargan y se renderizan dinámicamente, con paginación incluida.

- También se puede ver un ejemplo de flujo mediante las capturas que se encuentran en la carpeta `images`.

### Ventajas de la Implementación

- Reutilización de Código: El hook `useFetch` permite simplificar la lógica de solicitudes HTTP y puede ser reutilizado en cualquier parte del proyecto.
- Escalabilidad: La implementación modular y basada en contextos facilita la ampliación del proyecto y la integración de nuevas funcionalidades.
- Experiencia de Usuario: La carga dinámica y los indicadores de estado (loading, error) mejoran la interacción del usuario al manejar datos en tiempo real.

## Requisitos previos

- **Node.js** (versión 16 o superior).
- **npm** o **yarn** como gestor de paquetes.

## Instalación

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/AngelPereiraR/AniMangaDatahub.git
```

2. Accede al directorio del proyecto:

```bash
cd AniMangaDatahub
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

O con Yarn:

```bash
yarn install
```

4. Copia el archivo `.env.template` y renómbralo a `.env`. Añádele tus variables de entorno.

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

## Despliegue

Puedes encontrar la página desplegada en producción en la web [https://animangadatahub.netlify.app/](https://animangadatahub.netlify.app/).

## Reflexión

Durante el desarrollo de este proyecto he tenido varios puntos de aprendizaje. En primer lugar es el uso de SCSS, debido a que no conocía hasta qué punto de profundidad podía alcanzar. En segundo lugar he aprendido a tener una mejor estructura de directorios. Y por supuesto, llegar a un mejor entendimiento de como funciona React.

El principal desafío encontrado fue la lucha contra el límite de 3 peticiones por segundo que tiene la API. En este caso la solución fue intentar no sobrepasar ese límite en peticiones realizadas exactamente al mismo tiempo, por ello, lo máximo alcanzable son 2 peticiones diferentes a la vez.

Otro desafío fue que al principio modulé demasiado el proyecto, por lo que al final han habido componentes que no han terminado de hacer falta. Posteriormente, con futuros proyectos se irá adquiriendo más soltura en este aspecto para seleccionar la cantidad adecuada de módulos en los proyectos.

Por otra parte, se han realizado varias modificaciones enfocadas en el diseño o en algunas funcionalidades, las cuales producen un mejor entendimiento de la aplicación y una menor saturación para el usuario.

## Vídeo de presentación

Para terminar, se puede encontrar un vídeo de presentación del proyecto en la carpeta `videos`.
