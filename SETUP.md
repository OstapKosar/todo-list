# Setup Guide

## Database

This app uses **PostgreSQL** with Prisma ORM, hosted on **Neon** (serverless PostgreSQL).

### Database Hosting

The database is currently hosted on **Neon** (https://neon.tech), which is a serverless PostgreSQL service. Your `.env` file should already contain the Neon database connection string.

**If you need to set up a new database:**

1. **Option 1: Use Neon (Recommended - Cloud Hosting)**

   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string from the dashboard
   - Add it to your `.env` file as `DATABASE_URL`

2. **Option 2: Use Local PostgreSQL**

   **macOS (using Homebrew):**

   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```

   **Or use Docker:**

   ```bash
   docker run --name todo-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todo_db -p 5432:5432 -d postgres:14
   ```

   Connect to PostgreSQL and create a database:

   ```bash
   psql postgres
   CREATE DATABASE todo_db;
   \q
   ```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Database (Neon connection string or local PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?schema=public"

# JWT Secrets (generate random strings)
ACCESS_TOKEN_SECRET="your-access-token-secret-here"
REFRESH_TOKEN_SECRET="your-refresh-token-secret-here"
FORGOT_PASSWORD_TOKEN_SECRET="your-forgot-password-token-secret-here"

# Email Configuration (for OTP/verification emails)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# Server Port (optional, defaults to 3000)
PORT=3000
```

**Note:** For Gmail, you'll need to use an "App Password" instead of your regular password.

## Setup Steps

### 1. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 2. Setup Database

**Generate Prisma Client:**

```bash
cd backend
npm run prisma:generate
```

**Run Migrations:**

```bash
npm run prisma:migrate
```

This will create all the database tables based on the schema.

### 3. Run the Application

**Start Backend (in one terminal):**

```bash
cd backend
npm run start:dev
```

The backend will run on `http://localhost:3000`

- API documentation: `http://localhost:3000/api`

**Start Frontend (in another terminal):**

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Useful Commands

**Prisma Studio** (Database GUI):

```bash
cd backend
npm run prisma:studio
```

Opens at `http://localhost:5555`

**Reset Database:**

```bash
cd backend
npm run prisma:reset
```

**View Database Migrations:**

```bash
cd backend
npm run prisma:migrate
```

## Quick Start Checklist

- [ ] Database connection string is set in `.env` (Neon or local PostgreSQL)
- [ ] `.env` file created in `backend/` with all required variables
- [ ] Backend dependencies installed (`npm install` in `backend/`)
- [ ] Frontend dependencies installed (`npm install` in `frontend/`)
- [ ] Prisma client generated (`npm run prisma:generate`)
- [ ] Database migrations run (`npm run prisma:migrate`)
- [ ] Backend server started (`npm run start:dev`)
- [ ] Frontend server started (`npm run dev`)

## Troubleshooting

**Database connection errors:**

- **If using Neon:** Verify DATABASE_URL in `.env` matches your Neon project connection string
- **If using local PostgreSQL:**
  - Check PostgreSQL is running: `brew services list` (macOS) or `docker ps` (Docker)
  - Verify DATABASE_URL in `.env` is correct
  - Check database exists: `psql -l`
- Test connection: `npm run prisma:studio` should connect to your database

**Port already in use:**

- Change PORT in `.env` for backend
- Or kill the process using the port

**Prisma errors:**

- Make sure DATABASE_URL is set correctly
- Run `npm run prisma:generate` after schema changes
- Run `npm run prisma:migrate` to sync database
