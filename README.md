# CRUD Backend con NestJS y Prisma

Este es un backend CRUD construido con **NestJS**, **Prisma** y **PostgreSQL** en Docker. Incluye Swagger para documentación de API.

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone <URL_DEL_REPO>
cd crud-back
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar las variables de entorno
Crea un archivo `.env` en la raíz con las siguientes variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
PORT=3000
```

## 🐳 Uso con Docker y PostgreSQL
### 1️⃣ Levantar la base de datos con Docker
```bash
docker-compose up -d
```

### 2️⃣ Ejecutar migraciones de Prisma
```bash
npx prisma migrate dev --name init
```

### 3️⃣ Generar el cliente de Prisma
```bash
npx prisma generate
```

## 🚀 Ejecutar el servidor
### En desarrollo
```bash
npm run start:dev
```

### En producción
```bash
npm run build
npm run start:prod
```


## 📜 Documentación Swagger
Una vez que el servidor esté corriendo, accede a la documentación de la API en:
```
http://localhost:3000/api
```

## 🔧 Comandos Útiles
| Comando | Descripción |
|---------|------------|
| `npm run start` | Inicia la aplicación |
| `npm run start:dev` | Inicia la aplicación en modo desarrollo |
| `npm run start:prod` | Inicia la aplicación en producción |
| `npm run build` | Compila la aplicación |
| `npm run lint` | Ejecuta ESLint con corrección automática |
| `npm run format` | Formatea el código con Prettier |
| `npx prisma migrate dev --name init` | Crea y aplica migraciones en la base de datos |
| `npx prisma generate` | Genera el cliente de Prisma |
| `docker-compose up -d` | Levanta la base de datos PostgreSQL con Docker |
| `docker-compose down` | Baja la base de datos PostgreSQL con Docker |
---

