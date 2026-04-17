# GYM — Full-Stack Gym Management Application

A full-stack gym management platform with a Next.js frontend, Node.js/Express backend, PostgreSQL database via Prisma ORM, and a dark admin panel for managing members, memberships, and shop orders.

---

## Tech Stack

| Layer            | Technology                                          |
| ---------------- | --------------------------------------------------- |
| Frontend         | Next.js 16.2, React 19, Tailwind CSS, Radix UI      |
| State Management | Redux Toolkit (RTK), React-Redux                    |
| Backend          | Node.js, Express.js, TypeScript                     |
| Database         | PostgreSQL                                          |
| ORM              | Prisma 5                                            |
| Auth             | JWT (HS256) — separate secrets for users and admins |
| HTTP Client      | Axios                                               |

---

## Project Structure

```
GYM/
├── backend/               # Express + TypeScript API
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── src/
│   │   ├── index.ts       # Server entry point (port 5000)
│   │   ├── lib/prisma.ts  # PrismaClient singleton
│   │   ├── middleware/
│   │   │   └── auth.ts    # requireAuth / requireAdmin middleware
│   │   ├── routes/
│   │   │   ├── auth.ts        # /api/auth
│   │   │   ├── membership.ts  # /api/membership
│   │   │   ├── shop.ts        # /api/shop
│   │   │   └── admin.ts       # /api/admin
│   │   └── seed.ts        # Database seeder
│   ├── .env               # Environment variables (update before running)
│   └── package.json
│
└── frontend/              # Next.js application
    ├── app/
    │   ├── layout.tsx     # Root layout with ReduxProvider
    │   ├── page.tsx       # Homepage
    │   └── admin/
    │       └── page.tsx   # Admin panel at /admin
    ├── components/
    │   ├── navbar.tsx          # Member Login popup
    │   ├── hero-section.tsx    # Registration form
    │   ├── pricing-section.tsx # Membership plans (API-connected)
    │   ├── shop/
    │   │   └── shop-products-section.tsx  # Products + order placement
    │   └── admin/
    │       ├── admin-login.tsx       # Admin login form
    │       ├── admin-layout.tsx      # Sidebar shell
    │       ├── admin-dashboard.tsx   # Stats overview
    │       ├── admin-users.tsx       # Customer table
    │       ├── admin-memberships.tsx # Approve/reject memberships
    │       └── admin-orders.tsx      # Approve/reject shop orders
    ├── store/
    │   ├── index.ts        # Redux store
    │   ├── hooks.ts        # Typed hooks
    │   └── slices/
    │       ├── authSlice.ts       # User auth state
    │       ├── membershipSlice.ts # Membership plans & purchases
    │       ├── shopSlice.ts       # Products, cart, orders
    │       └── adminSlice.ts      # Admin auth & all admin data
    ├── lib/
    │   └── api.ts          # Axios instance (auto-attaches JWT)
    └── .env.local          # Frontend env vars
```

---

## Setup & Installation

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (default port 5432)

---

### 1. Database

Create a PostgreSQL database:

```sql
CREATE DATABASE gymdb;
```

---

### 2. Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Edit .env and update DATABASE_URL with your PostgreSQL credentials:
# DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/gymdb"

# Run database migrations
npx prisma migrate dev --name init

# Seed the database (creates admin, membership plans, products)
npm run seed

# Start the development server
npm run dev
```

The backend will run on **http://localhost:5000**.

---

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:3000**.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable           | Description                  | Default                                               |
| ------------------ | ---------------------------- | ----------------------------------------------------- |
| `DATABASE_URL`     | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/gymdb` |
| `JWT_SECRET`       | Secret for user JWT tokens   | `your_jwt_secret_here`                                |
| `JWT_ADMIN_SECRET` | Secret for admin JWT tokens  | `your_admin_jwt_secret_here`                          |
| `PORT`             | Backend port                 | `5000`                                                |
| `ADMIN_EMAIL`      | Default admin email          | `admin@gym.com`                                       |
| `ADMIN_PASSWORD`   | Default admin password       | `Admin@123`                                           |

> **Important**: Change `JWT_SECRET` and `JWT_ADMIN_SECRET` to strong random strings in production.

### Frontend (`frontend/.env.local`)

| Variable              | Description          | Default                     |
| --------------------- | -------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## Default Credentials

### Admin Panel (`/admin`)

| Field    | Value           |
| -------- | --------------- |
| Email    | `admin@gym.com` |
| Password | `Admin@123`     |

---

## API Routes

### Auth (`/api/auth`)

| Method | Endpoint    | Auth | Description              |
| ------ | ----------- | ---- | ------------------------ |
| POST   | `/register` | —    | Register a new user      |
| POST   | `/login`    | —    | User login, returns JWT  |
| GET    | `/me`       | User | Get current user profile |

### Membership (`/api/membership`)

| Method | Endpoint        | Auth | Description                                         |
| ------ | --------------- | ---- | --------------------------------------------------- |
| GET    | `/plans`        | —    | List all membership plans                           |
| POST   | `/purchase`     | User | Purchase a membership plan (creates PENDING record) |
| GET    | `/my-purchases` | User | Get current user's membership purchases             |

### Shop (`/api/shop`)

| Method | Endpoint     | Auth | Description                             |
| ------ | ------------ | ---- | --------------------------------------- |
| GET    | `/products`  | —    | List all products                       |
| POST   | `/order`     | User | Place an order (creates PENDING record) |
| GET    | `/my-orders` | User | Get current user's orders               |

### Admin (`/api/admin`)

| Method | Endpoint           | Auth  | Description                                            |
| ------ | ------------------ | ----- | ------------------------------------------------------ |
| POST   | `/login`           | —     | Admin login, returns admin JWT                         |
| GET    | `/stats`           | Admin | Dashboard statistics                                   |
| GET    | `/users`           | Admin | List all registered users                              |
| GET    | `/memberships`     | Admin | List membership purchases (optional `?status=PENDING`) |
| PATCH  | `/memberships/:id` | Admin | Approve or reject a membership (`{status, notes}`)     |
| GET    | `/orders`          | Admin | List shop orders (optional `?status=PENDING`)          |
| PATCH  | `/orders/:id`      | Admin | Approve or reject an order (`{status, notes}`)         |

---

## Database Schema

### Models

| Model                | Description                                    |
| -------------------- | ---------------------------------------------- |
| `Admin`              | Admin accounts (seeded, not self-registerable) |
| `User`               | Gym members (registration via hero form)       |
| `MembershipPlan`     | Available membership plans                     |
| `MembershipPurchase` | User membership purchases with approval status |
| `Product`            | Shop products                                  |
| `Order`              | Shop orders with approval status               |
| `OrderItem`          | Individual items within an order               |

### Enums

- `Gender`: `MALE`, `FEMALE`, `OTHER`
- `ApprovalStatus`: `PENDING`, `APPROVED`, `REJECTED`
- `PlanCategory`: `MEMBERSHIP`, `SHORT_TERM`, `ADDITIONAL`

---

## Features

### Public Site

- **Registration** (hero section): Full member registration form — name, email, password, age, gender, height, weight, phone, fitness goal, experience level
- **Member Login** (navbar): Popup login dialog, shows member name + logout when authenticated
- **Membership Plans** (pricing section): Plans loaded from database; "Get Started" submits a purchase request
- **Shop** (shop page): Products loaded from database; "Pick Now" places an order

### Admin Panel (`/admin`)

- Dark-themed dashboard
- **Dashboard**: Stats cards (total users, pending/approved memberships, pending orders) + recent activity lists
- **Customers**: Full table of all registered members with profile details
- **Memberships**: Filter by status, approve/reject purchase requests with optional admin notes
- **Shop Orders**: Filter by status, approve/reject orders with optional admin notes

---

## Running Both Servers Concurrently

Open two terminal windows:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Then open **http://localhost:3000** in your browser and **http://localhost:3000/admin** for the admin panel.
