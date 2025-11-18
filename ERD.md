# Entity Relationship Diagram (ERD)

**[English](#english)** | **[Español](#español)**

---

<a name="english"></a>
## English

### Table: characters

```
┌─────────────────────────────────────────┐
│            CHARACTERS                   │
├─────────────────────────────────────────┤
│ PK │ id          │ INTEGER              │
│    │ name        │ VARCHAR(255)         │
│    │ status      │ VARCHAR(255)         │
│    │ species     │ VARCHAR(255)         │
│    │ gender      │ VARCHAR(255)         │
│    │ origin      │ VARCHAR(255)         │
│    │ image       │ VARCHAR(255)         │
│    │ created_at  │ DATETIME             │
│    │ updated_at  │ DATETIME             │
└─────────────────────────────────────────┘
```

### Field Descriptions

#### characters

| Field | Type | Null | Key | Description |
|-------|------|------|-----|-------------|
| id | INTEGER | NO | PK | Unique character ID (from API) |
| name | VARCHAR(255) | NO | - | Character name |
| status | VARCHAR(255) | NO | - | Character status (Alive, Dead, unknown) |
| species | VARCHAR(255) | NO | - | Character species (Human, Alien, etc.) |
| gender | VARCHAR(255) | NO | - | Character gender (Male, Female, Genderless, unknown) |
| origin | VARCHAR(255) | NO | - | Character's origin place name |
| image | VARCHAR(255) | YES | - | Character image URL |
| created_at | DATETIME | NO | - | Record creation date |
| updated_at | DATETIME | NO | - | Last update date |

### Indexes

- **PRIMARY KEY**: `id`

### Notes

- The `characters` table stores Rick and Morty character info
- The `id` field matches the character ID from the official Rick and Morty API
- `created_at` and `updated_at` are handled automatically by Sequelize
- No relationships with other tables in this simplified model
- The `origin` field stores only the place name (simplified from API structure)

### Visual Diagram

```
                    ┌──────────────────────┐
                    │                      │
                    │     CHARACTERS       │
                    │                      │
                    ├──────────────────────┤
                    │ • id (PK)            │
                    │ • name               │
                    │ • status             │
                    │ • species            │
                    │ • gender             │
                    │ • origin             │
                    │ • image              │
                    │ • created_at         │
                    │ • updated_at         │
                    │                      │
                    └──────────────────────┘
```

### Possible Values

#### status
- Alive
- Dead
- unknown

#### gender
- Male
- Female
- Genderless
- unknown

#### species
Variable values from API (Human, Alien, Robot, etc.)

---

<a name="español"></a>
## Español

### Tabla: characters

```
┌─────────────────────────────────────────┐
│            CHARACTERS                   │
├─────────────────────────────────────────┤
│ PK │ id          │ INTEGER              │
│    │ name        │ VARCHAR(255)         │
│    │ status      │ VARCHAR(255)         │
│    │ species     │ VARCHAR(255)         │
│    │ gender      │ VARCHAR(255)         │
│    │ origin      │ VARCHAR(255)         │
│    │ image       │ VARCHAR(255)         │
│    │ created_at  │ DATETIME             │
│    │ updated_at  │ DATETIME             │
└─────────────────────────────────────────┘
```

### Descripción de Campos

#### characters

| Campo | Tipo | Nulo | Clave | Descripción |
|-------|------|------|-------|-------------|
| id | INTEGER | NO | PK | Identificador único del personaje (obtenido de la API) |
| name | VARCHAR(255) | NO | - | Nombre del personaje |
| status | VARCHAR(255) | NO | - | Estado del personaje (Alive, Dead, unknown) |
| species | VARCHAR(255) | NO | - | Especie del personaje (Human, Alien, etc.) |
| gender | VARCHAR(255) | NO | - | Género del personaje (Male, Female, Genderless, unknown) |
| origin | VARCHAR(255) | NO | - | Nombre del lugar de origen del personaje |
| image | VARCHAR(255) | YES | - | URL de la imagen del personaje |
| created_at | DATETIME | NO | - | Fecha de creación del registro |
| updated_at | DATETIME | NO | - | Fecha de última actualización del registro |

### Índices

- **PRIMARY KEY**: `id`

### Notas

- La tabla `characters` almacena la información de los personajes de Rick and Morty
- El campo `id` corresponde al ID del personaje en la API oficial de Rick and Morty
- Los campos `created_at` y `updated_at` se manejan automáticamente por Sequelize
- No hay relaciones con otras tablas en este modelo simplificado
- El campo `origin` almacena solo el nombre del lugar de origen (simplificación de la estructura de la API)

### Diagrama Visual

```
                    ┌──────────────────────┐
                    │                      │
                    │     CHARACTERS       │
                    │                      │
                    ├──────────────────────┤
                    │ • id (PK)            │
                    │ • name               │
                    │ • status             │
                    │ • species            │
                    │ • gender             │
                    │ • origin             │
                    │ • image              │
                    │ • created_at         │
                    │ • updated_at         │
                    │                      │
                    └──────────────────────┘
```

### Valores Posibles

#### status
- Alive
- Dead
- unknown

#### gender
- Male
- Female
- Genderless
- unknown

#### species
Valores variables según los datos de la API (Human, Alien, Robot, etc.)
