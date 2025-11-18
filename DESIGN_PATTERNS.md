# Design Patterns Implementation

**[English](#english)** | **[Español](#español)**

---

<a name="english"></a>
## English

This doc explains the design patterns used throughout the project.

### 1. Singleton Pattern

**Location**: [src/config/database.ts](src/config/database.ts), [src/config/redis.ts](src/config/redis.ts)

**Why**: We need a single database and Redis connection shared across the entire app.

**How it works**:
- Sequelize instance is created once and exported as a singleton
- Redis client is created once and reused everywhere
- Prevents connection pool exhaustion and memory bloat

**Benefits**:
- Single source of truth for connections
- No risk of running out of connections
- Lower memory footprint

### 2. Decorator Pattern

**Location**: [src/decorators/measureTime.ts](src/decorators/measureTime.ts)

**Why**: We want to track method execution time without cluttering business logic.

**How it works**:
```typescript
@measureTime
async characters(filters: CharacterFilters) {
  // Method implementation
}
```

**Benefits**:
- Timing logic stays separate from business logic
- Can be reused on any method
- Non-invasive performance monitoring

### 3. Middleware Pattern

**Location**: [src/middleware/logger.ts](src/middleware/logger.ts)

**Why**: Need to log all HTTP requests before they reach resolvers.

**How it works**:
- Express middleware logs timestamp, method, URL, and body
- Applied globally with `app.use(loggerMiddleware)`

**Benefits**:
- Logging is centralized in one place
- Easy to toggle on/off
- Keeps business logic clean

### 4. Repository Pattern (implicit)

**Location**: [src/models/Character.ts](src/models/Character.ts)

**Why**: Abstract data access from business logic.

**How it works**:
- Sequelize Model acts as repository for Character data
- Clean interface for DB operations (`findAll`, `upsert`, etc.)
- Resolvers don't need to know about underlying database

**Benefits**:
- Business logic doesn't care about the database
- Easy to swap ORM or database later
- All data access in one place

### 5. Cache-Aside Pattern

**Location**: [src/graphql/resolvers.ts](src/graphql/resolvers.ts)

**Why**: Speed up reads by caching frequently accessed data.

**How it works**:
1. Check cache first
2. On cache miss, hit the database
3. Store result in cache for next time
4. Return data to client

**Benefits**:
- Less load on the database
- Faster response times for repeated queries
- TTL-based cache expiration (1 hour)

### 6. Scheduled Job Pattern

**Location**: [src/services/cronService.ts](src/services/cronService.ts)

**Why**: Automate periodic data updates without manual work.

**How it works**:
- Cron job scheduled for every 12 hours
- Updates character data from external API
- Clears cache after updates

**Benefits**:
- Data stays fresh automatically
- No manual maintenance needed
- Runs at optimal times (00:00 and 12:00)

---

<a name="español"></a>
## Español

Este documento explica los patrones de diseño implementados en el proyecto.

### 1. Singleton Pattern

**Ubicación**: [src/config/database.ts](src/config/database.ts), [src/config/redis.ts](src/config/redis.ts)

**Por qué**: Necesitamos una única conexión a la base de datos y Redis compartida en toda la app.

**Cómo funciona**:
- La instancia de Sequelize se crea una vez y se exporta como singleton
- El cliente Redis se crea una vez y se reutiliza en todas partes
- Previene el agotamiento del pool de conexiones y el exceso de memoria

**Beneficios**:
- Una única fuente de verdad para las conexiones
- Sin riesgo de quedarse sin conexiones
- Menor huella de memoria

### 2. Decorator Pattern

**Ubicación**: [src/decorators/measureTime.ts](src/decorators/measureTime.ts)

**Por qué**: Queremos medir el tiempo de ejecución de métodos sin ensuciar la lógica de negocio.

**Cómo funciona**:
```typescript
@measureTime
async characters(filters: CharacterFilters) {
  // Implementación del método
}
```

**Beneficios**:
- La lógica de timing se mantiene separada de la lógica de negocio
- Se puede reutilizar en cualquier método
- Monitoreo de rendimiento no invasivo

### 3. Middleware Pattern

**Ubicación**: [src/middleware/logger.ts](src/middleware/logger.ts)

**Por qué**: Necesitamos registrar todas las peticiones HTTP antes de que lleguen a los resolvers.

**Cómo funciona**:
- El middleware de Express registra timestamp, método, URL y body
- Se aplica globalmente con `app.use(loggerMiddleware)`

**Beneficios**:
- El logging está centralizado en un solo lugar
- Fácil de activar/desactivar
- Mantiene la lógica de negocio limpia

### 4. Repository Pattern (implícito)

**Ubicación**: [src/models/Character.ts](src/models/Character.ts)

**Por qué**: Abstraer el acceso a datos de la lógica de negocio.

**Cómo funciona**:
- El Model de Sequelize actúa como repositorio para los datos de Character
- Interfaz limpia para operaciones de BD (`findAll`, `upsert`, etc.)
- Los resolvers no necesitan saber sobre la base de datos subyacente

**Beneficios**:
- La lógica de negocio no depende de la base de datos
- Fácil cambiar el ORM o la base de datos más adelante
- Todo el acceso a datos en un solo lugar

### 5. Cache-Aside Pattern

**Ubicación**: [src/graphql/resolvers.ts](src/graphql/resolvers.ts)

**Por qué**: Acelerar las lecturas mediante caché de datos frecuentemente accedidos.

**Cómo funciona**:
1. Revisar primero el caché
2. Si no está en caché, consultar la base de datos
3. Guardar el resultado en caché para la próxima vez
4. Retornar los datos al cliente

**Beneficios**:
- Menor carga en la base de datos
- Tiempos de respuesta más rápidos para consultas repetidas
- Expiración de caché basada en TTL (1 hora)

### 6. Scheduled Job Pattern

**Ubicación**: [src/services/cronService.ts](src/services/cronService.ts)

**Por qué**: Automatizar actualizaciones periódicas de datos sin trabajo manual.

**Cómo funciona**:
- Cron job programado para ejecutarse cada 12 horas
- Actualiza datos de personajes desde la API externa
- Limpia el caché después de actualizar

**Beneficios**:
- Los datos se mantienen frescos automáticamente
- No requiere mantenimiento manual
- Se ejecuta en horarios óptimos (00:00 y 12:00)
