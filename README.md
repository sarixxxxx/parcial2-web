# Parcial 2 - API REST para Planificación de Viajes (NestJS)

## Instalación y ejecución

### Requisitos previos
- Node.js v18+
- PostgreSQL
- npm

### Pasos

1. Clona el repositorio e instala dependencias:
```bash
git clone <url-del-repositorio>
cd parcial2-web
npm install
```

2. Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE travel_plans_db;
```

3. Configura la conexión en `src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'travel_plans_db',
  synchronize: true,
})
```

4. Corre el proyecto:
```bash
npm run start:dev
```

El servidor queda disponible en `http://localhost:3000/api/v1`.

---

## Arquitectura interna y flujo de caché de países

El proyecto está dividido en tres módulos:

### CountryModule (interno)
No expone endpoints públicos. Su único propósito es gestionar los datos de países para uso interno de otros módulos.

Contiene un `RestCountriesProvider` que consume la API externa [RestCountries](https://restcountries.com/v3.1/alpha/{code}) y un `CountryService` con la lógica de caché:

**Flujo de caché:**
1. Cuando se crea un plan de viaje, `TravelPlanService` invoca `CountryService.existCountryByAlpha3Code(alpha3Code)`.
2. `CountryService` busca el país en la base de datos local.
3. Si el país **existe** en BD, se retorna `true` directamente (sin llamadas externas).
4. Si el país **no existe** en BD, se llama a `RestCountriesProvider` que consulta `https://restcountries.com`.
5. Si la API externa lo encuentra, se guarda el país en BD local y retorna `true`.
6. Si la API externa tampoco lo encuentra, retorna `false` y se rechaza la creación del plan.

Esto garantiza que cada país solo se consulta externamente una vez.

### TravelPlanModule (público)
Expone los endpoints REST para la gestión de planes de viaje. Importa `CountryModule` para validar la existencia del país antes de guardar un plan.

### TravelPlanCountryModule
Gestiona la asociación entre países y planes de viaje (uso interno).

---

## Ejemplos de peticiones en Postman

### Crear un plan de viaje
**POST** `http://localhost:3000/api/v1/travel-plan`

Body (JSON):
```json
{
  "travelTitle": "Viaje a Colombia",
  "startDate": "2025-06-01",
  "endDate": "2025-06-15",
  "alpha3Code": "COL"
}
```

Respuesta exitosa (201):
```json
{
  "id": "72114714-f06e-43b6-b6a9-1c3f4ef18f32",
  "travelTitle": "Viaje a Colombia",
  "startDate": "2025-06-01T00:00:00.000Z",
  "endDate": "2025-06-15T00:00:00.000Z",
  "alpha3Code": "COL"
}
```

### Listar todos los planes
**GET** `http://localhost:3000/api/v1/travel-plan`

### Consultar un plan por ID
**GET** `http://localhost:3000/api/v1/travel-plan/{id}`

Ejemplo:
```
GET http://localhost:3000/api/v1/travel-plan/72114714-f06e-43b6-b6a9-1c3f4ef18f32
```

### Eliminar un plan
**DELETE** `http://localhost:3000/api/v1/travel-plan/{id}`

Ejemplo:
```
DELETE http://localhost:3000/api/v1/travel-plan/72114714-f06e-43b6-b6a9-1c3f4ef18f32
```

Respuesta exitosa: HTTP 204 (sin contenido)


Para la inserción individual de gastos asociados a un plan de viaje, se utilizó una relación OneToMany entre TravelPlanEntity y ExpenseEntity gestionada por TypeORM. Al agregar un gasto, se carga el plan de viaje existente junto con sus gastos actuales mediante relations: ['expenses'], se concatena el nuevo gasto al arreglo en memoria con el operador spread ([...expenses, newExpense]), y finalmente se persiste el objeto completo con travelPlanRepository.save(travelPlan). TypeORM se encarga de insertar el nuevo registro en la tabla expense_entity y mantener la integridad referencial automáticamente.
