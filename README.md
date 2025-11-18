# Rick and Morty Character API

**[English](#english)** | **[Español](#español)**

---

<a name="english"></a>
## English

GraphQL API for searching Rick and Morty characters with caching and relational database storage.

### Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **GraphQL** - Query language
- **Sequelize** - MySQL ORM
- **MySQL** - Relational database
- **Redis** - Cache system
- **Axios** - HTTP client for Rick and Morty API
- **Jest** - Unit testing framework
- **node-cron** - Task scheduling
- **Docker** - Service containerization

### Requirements

#### Option 1: Docker (Recommended)
- Docker
- Docker Compose

#### Option 2: Manual Setup
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Redis Server

### Setup

#### Option 1: Docker (Recommended)

1. Clone the repo:
```bash
git clone https://github.com/NairoBoom/Backend-DevCase.git
cd Backend-DevCase
```

2. Fire up all services with Docker Compose:
```bash
docker-compose up -d
```

This starts:
- MySQL (port 3306)
- Redis (port 6379)
- Rick and Morty API (port 4000)

Migrations and seeders run automatically on startup.

3. Access the API:
```
http://localhost:4000/graphql
```

4. Check the logs:
```bash
docker-compose logs -f app
```

5. Stop services:
```bash
docker-compose down
```

6. Stop and remove volumes (data):
```bash
docker-compose down -v
```

#### Option 2: Manual Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=rickandmorty_db
DB_USER=root
DB_PASSWORD=your_password

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=4000
```

3. Create MySQL database:
```sql
CREATE DATABASE rickandmorty_db;
```

4. Run migrations:
```bash
npm run migrate
```

5. Seed database with 15 characters:
```bash
npm run seed
```

### Usage

#### Development mode:
```bash
npm run dev
```

#### Production mode:
```bash
npm run build
npm start
```

Server runs at `http://localhost:4000/graphql`

### GraphQL API

#### GraphiQL Interface

Go to `http://localhost:4000/graphql` in your browser for the interactive GraphiQL interface.

#### Query: characters

Search characters with optional filters.

**Available filters:**
- `status`: String (Alive, Dead, unknown)
- `species`: String (Human, Alien, etc.)
- `gender`: String (Male, Female, Genderless, unknown)
- `name`: String (partial match)
- `origin`: String (partial match)

**Example query:**

```graphql
query {
  characters(status: "Alive", species: "Human") {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

**Query without filters:**

```graphql
query {
  characters {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

**Query with name filter:**

```graphql
query {
  characters(name: "Rick") {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

### Features

#### Redis Caching

- Search results are cached for 1 hour
- Cache keys are generated based on applied filters
- Cached data is returned immediately without hitting the database
- Cache gets invalidated automatically when the cron job updates data

#### Request Logging

Each request logs:
- Timestamp
- HTTP method
- URL
- Request body

#### Timing Decorator

TypeScript decorator that tracks method execution time:
- Auto-applied to GraphQL resolvers
- Logs execution time in milliseconds
- Helps spot performance bottlenecks

#### Auto Data Updates

Cron job that runs every 12 hours:
- Updates character data from Rick and Morty API
- Syncs changes in status, species, gender, etc.
- Invalidates cache automatically after updates
- Detailed execution logs

#### Unit Tests

Complete test suite with Jest:
- Cache hit/miss scenarios
- Exact and partial filter tests
- Combined filter tests
- Error handling tests
- Run tests: `npm test`
- Coverage report: `npm test:coverage`

#### Database

Character model fields:
- `id` (Integer, Primary Key)
- `name` (String)
- `status` (String)
- `species` (String)
- `gender` (String)
- `origin` (String)
- `image` (String)
- `created_at` (DateTime)
- `updated_at` (DateTime)

### Available Scripts

- `npm run dev` - Run server in dev mode with hot-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run server in production mode
- `npm run migrate` - Run database migrations
- `npm run seed` - Run database seeders
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Design Patterns

This project uses several software design patterns:

- **Singleton Pattern**: For database and Redis connections
- **Decorator Pattern**: For execution time measurement
- **Middleware Pattern**: For request logging
- **Repository Pattern**: Data access abstraction with Sequelize
- **Cache-Aside Pattern**: Redis caching strategy
- **Scheduled Job Pattern**: Cron-based tasks

See full documentation in [DESIGN_PATTERNS.md](DESIGN_PATTERNS.md)

### ERD Diagram

Check out [ERD.md](ERD.md) for the database diagram.

### Author

Nairo Boom

---

<a name="español"></a>
## Español

API GraphQL para buscar personajes de Rick and Morty con sistema de caché y almacenamiento en base de datos relacional.

## Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **GraphQL** - API query language
- **Sequelize** - ORM para MySQL
- **MySQL** - Base de datos relacional
- **Redis** - Sistema de caché
- **Axios** - Cliente HTTP para consumir la API de Rick and Morty
- **Jest** - Framework de pruebas unitarias
- **node-cron** - Programación de tareas periódicas
- **Docker** - Contenerización de servicios

## Requisitos Previos

### Opción 1: Con Docker (Recomendado)
- Docker
- Docker Compose

### Opción 2: Instalación Manual
- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- Redis Server

## Instalación

### Opción 1: Con Docker (Recomendado)

1. Clonar el repositorio:
```bash
git clone https://github.com/NairoBoom/Backend-DevCase.git
cd Backend-DevCase
```

2. Iniciar todos los servicios con Docker Compose:
```bash
docker-compose up -d
```

Esto iniciará automáticamente:
- MySQL (puerto 3306)
- Redis (puerto 6379)
- API de Rick and Morty (puerto 4000)

La aplicación ejecutará automáticamente las migraciones y seeders al iniciar.

3. Acceder a la API:
```
http://localhost:4000/graphql
```

4. Para ver los logs:
```bash
docker-compose logs -f app
```

5. Para detener los servicios:
```bash
docker-compose down
```

6. Para detener y eliminar los volúmenes (datos):
```bash
docker-compose down -v
```

### Opción 2: Instalación Manual

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

Editar el archivo `.env` con tus configuraciones:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=rickandmorty_db
DB_USER=root
DB_PASSWORD=tu_password

REDIS_HOST=localhost
REDIS_PORT=6379

PORT=4000
```

3. Crear la base de datos en MySQL:
```sql
CREATE DATABASE rickandmorty_db;
```

4. Ejecutar migraciones:
```bash
npm run migrate
```

5. Poblar la base de datos con 15 personajes:
```bash
npm run seed
```

## Uso

### Modo desarrollo:
```bash
npm run dev
```

### Modo producción:
```bash
npm run build
npm start
```

El servidor estará disponible en `http://localhost:4000/graphql`

## API GraphQL

### Interfaz GraphiQL

Acceder a `http://localhost:4000/graphql` en el navegador para usar la interfaz interactiva GraphiQL.

### Query: characters

Buscar personajes con filtros opcionales.

**Parámetros disponibles:**
- `status`: String (Alive, Dead, unknown)
- `species`: String (Human, Alien, etc.)
- `gender`: String (Male, Female, Genderless, unknown)
- `name`: String (búsqueda parcial)
- `origin`: String (búsqueda parcial)

**Ejemplo de query:**

```graphql
query {
  characters(status: "Alive", species: "Human") {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

**Ejemplo de query sin filtros:**

```graphql
query {
  characters {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

**Ejemplo de query con filtro de nombre:**

```graphql
query {
  characters(name: "Rick") {
    id
    name
    status
    species
    gender
    origin
    image
  }
}
```

## Funcionalidades

### Caché con Redis

- Los resultados de las búsquedas se almacenan en caché durante 1 hora
- La clave de caché se genera basándose en los filtros aplicados
- Si los datos están en caché, se retornan inmediatamente sin consultar la base de datos
- El caché se invalida automáticamente cuando el cron job actualiza los datos

### Middleware de Logging

Cada petición al servidor registra la siguiente información:
- Timestamp
- Método HTTP
- URL
- Body de la petición

### Timing Decorator

Decorator de TypeScript que mide el tiempo de ejecución de los métodos:
- Se aplica automáticamente a los resolvers de GraphQL
- Registra el tiempo de ejecución en milisegundos
- Ayuda a identificar cuellos de botella en el rendimiento

### Actualización Automática de Datos

Sistema de cron job que se ejecuta cada 12 horas:
- Actualiza los datos de personajes desde la API de Rick and Morty
- Sincroniza cambios en status, species, gender, etc.
- Invalida el caché automáticamente después de cada actualización
- Logs detallados de cada ejecución

### Pruebas Unitarias

Suite completa de tests con Jest:
- Tests para caché (hit/miss scenarios)
- Tests para filtros exactos y parciales
- Tests para combinación de filtros
- Tests para manejo de errores
- Ejecutar tests: `npm test`
- Ejecutar con cobertura: `npm test:coverage`

### Base de Datos

El modelo de Character incluye los siguientes campos:
- `id` (Integer, Primary Key)
- `name` (String)
- `status` (String)
- `species` (String)
- `gender` (String)
- `origin` (String)
- `image` (String)
- `created_at` (DateTime)
- `updated_at` (DateTime)

## Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con hot-reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor en modo producción
- `npm run migrate` - Ejecuta las migraciones de base de datos
- `npm run seed` - Ejecuta los seeders para poblar la base de datos
- `npm test` - Ejecuta los tests unitarios
- `npm run test:watch` - Ejecuta los tests en modo watch
- `npm run test:coverage` - Genera reporte de cobertura de tests

## Patrones de Diseño

Este proyecto implementa varios patrones de diseño de software:

- **Singleton Pattern**: Para conexiones de base de datos y Redis
- **Decorator Pattern**: Para medición de tiempo de ejecución
- **Middleware Pattern**: Para logging de peticiones
- **Repository Pattern**: Abstracción de acceso a datos con Sequelize
- **Cache-Aside Pattern**: Estrategia de caché con Redis
- **Scheduled Job Pattern**: Tareas programadas con cron

Ver documentación completa en [DESIGN_PATTERNS.md](DESIGN_PATTERNS.md)

## Diagrama ERD

Ver archivo [ERD.md](ERD.md) para el diagrama de la base de datos.

## Autor

Nairo Boom
