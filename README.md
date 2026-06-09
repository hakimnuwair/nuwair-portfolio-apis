# Nuwair Portfolio — Backend API

TypeScript REST API powering the portfolio platform. Manages all dynamic content — profile, projects, skills, experience, and contact messages — through a secure admin-only interface with JWT authentication.

**Frontend Repo →** [nuwair-portfolio](https://github.com/hakimnuwair/nuwair-portfolio)

---

## Why This API?

A static portfolio has a static problem — every content update requires a code change and a redeploy. This API eliminates that by acting as the single source of truth for all portfolio content.

Built in TypeScript with strict Zod validation throughout, it exposes clean public endpoints for the portfolio visitor and protected admin endpoints for content management. Visibility flags and ordering fields on every resource give the admin full control over what appears on the public site and in what order — no code edits needed.

---

## What does this API do?

Static portfolios break the moment you want to update something. This API is the engine behind a fully dynamic portfolio — it stores all content in MongoDB and exposes clean REST endpoints so the frontend always reflects the latest version without a single redeployment.

**The core problems it solves:**

- **Content-code separation** — projects, skills, experience, and profile info all live in the database. The frontend is just a renderer. Update your portfolio from a browser, not from your code editor.
- **Secure single-admin model** — the API is designed for one owner. Public routes are read-only; every write operation is protected behind JWT auth. The seed script bootstraps your admin account in one command.
- **Visitor contact management** — the contact form isn't just an email sender. Messages are stored, and the admin can track each one with a read/replied status so nothing falls through the cracks.
- **Visibility & ordering control** — every resource has `isVisible` and `order` fields, giving the admin fine-grained control over what appears on the public site and in what sequence.

This repo is the Node.js / TypeScript backend — the frontend lives in [nuwair-portfolio](https://github.com/hakimnuwair/nuwair-portfolio).

---

## Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Runtime    | Node.js (ESM)                        |
| Language   | TypeScript                           |
| Framework  | Express 5                            |
| Database   | MongoDB + Mongoose                   |
| Auth       | JWT                                  |
| Validation | Zod                                  |
| Logging    | Morgan                               |
| Security   | Helmet, express-rate-limit, bcryptjs |

---

## Features

- **JWT Authentication** — admin-only login with token-based access
- **Public + Protected Routes** — read endpoints are public; all write operations require auth
- **Full Content Management** — CRUD for profile, projects, skills, experience
- **Contact Form** — public submission with admin read/status management
- **Visibility & Ordering** — control what's shown on the public site per item
- **Rate Limiting** — separate limiters for auth and contact endpoints
- **Zod Validation** — strict schema validation on all request bodies
- **Seed Script** — bootstrap the admin user with a single command

---

## API Routes

### Auth

| Method | Endpoint          | Access | Description       |
| ------ | ----------------- | ------ | ----------------- |
| POST   | `/api/auth/login` | Public | Admin login       |
| GET    | `/api/auth/me`    | Admin  | Get current admin |

### Profile

| Method | Endpoint       | Access | Description      |
| ------ | -------------- | ------ | ---------------- |
| GET    | `/api/profile` | Public | Get profile info |
| PUT    | `/api/profile` | Admin  | Update profile   |

### Skills

| Method | Endpoint            | Access | Description        |
| ------ | ------------------- | ------ | ------------------ |
| GET    | `/api/skills`       | Public | Get visible skills |
| GET    | `/api/skills/admin` | Admin  | Get all skills     |
| POST   | `/api/skills`       | Admin  | Create a skill     |
| PUT    | `/api/skills/:id`   | Admin  | Update a skill     |
| DELETE | `/api/skills/:id`   | Admin  | Delete a skill     |

### Projects

| Method | Endpoint              | Access | Description          |
| ------ | --------------------- | ------ | -------------------- |
| GET    | `/api/projects`       | Public | Get visible projects |
| GET    | `/api/projects/admin` | Admin  | Get all projects     |
| GET    | `/api/projects/:id`   | Public | Get project by ID    |
| POST   | `/api/projects`       | Admin  | Create a project     |
| PUT    | `/api/projects/:id`   | Admin  | Update a project     |
| DELETE | `/api/projects/:id`   | Admin  | Delete a project     |

### Experience

| Method | Endpoint                | Access | Description             |
| ------ | ----------------------- | ------ | ----------------------- |
| GET    | `/api/experience`       | Public | Get visible experience  |
| GET    | `/api/experience/admin` | Admin  | Get all experience      |
| POST   | `/api/experience`       | Admin  | Create experience entry |
| PUT    | `/api/experience/:id`   | Admin  | Update experience entry |
| DELETE | `/api/experience/:id`   | Admin  | Delete experience entry |

### Contact

| Method | Endpoint                  | Access | Description            |
| ------ | ------------------------- | ------ | ---------------------- |
| POST   | `/api/contact`            | Public | Submit contact message |
| GET    | `/api/contact`            | Admin  | View all messages      |
| PATCH  | `/api/contact/:id/status` | Admin  | Update message status  |
| DELETE | `/api/contact/:id`        | Admin  | Delete a message       |

---

## Project Structure

```
src/
├── config/         # DB connection setup
├── controllers/    # Route handler logic
├── middlewares/    # Auth guard, rate limiters, Zod validator
├── models/         # Mongoose schemas (Profile, Skill, Project, Experience, Contact)
├── routes/         # All routes defined in index.ts
├── services/       # Business logic layer
├── types/          # TypeScript interfaces and document types
├── utils/          # Helper functions
├── validators/     # Zod schemas for each resource
└── index.ts        # App entry point
seed.ts             # Admin seeder script
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Clone the repo
git clone https://github.com/hakimnuwair/nuwair-portfolio-apis.git
cd nuwair-portfolio-apis

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
CORS_ORIGIN=http://localhost:5173
```

### Running Locally

```bash
# Development (with hot-reload via tsx)
npm run dev

# Build TypeScript
npm run build

# Production
npm start
```

The server will start on `http://localhost:5000`.

### Seed Admin User

Run this once after setup to create the admin account:

```bash
npx tsx seed.ts
```

---

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start with tsx watch (hot-reload) |
| `npm run build` | Compile TypeScript to `dist/`     |
| `npm start`     | Run compiled production build     |

---

## Deployment

Deploy to any Node.js-compatible platform (Render, Vercel, Railway, etc.).

> **Important:** Set all environment variables in your deployment platform. Update `CORS_ORIGIN` to your production frontend URL.

---

## Related Repositories

- **Frontend** — [nuwair-portfolio](https://github.com/hakimnuwair/nuwair-portfolio) (React / TypeScript / Tailwind CSS)

---

## Author

**Nuwair Hakim** — Full-Stack Developer

[LinkedIn](https://linkedin.com/in/hakimnuwair) · [GitHub](https://github.com/hakimnuwair) · [Portfolio](https://nuwairportfolio.vercel.app)
