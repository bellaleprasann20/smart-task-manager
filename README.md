# 📋 Smart Task Manager

A full-stack task management application built with the **MERN stack**, featuring JWT authentication, role-based access control, and a clean, responsive UI. Built to demonstrate production-style full-stack architecture — from REST API design to containerized deployment.

🔗 **Live Demo:** [Add your Vercel link here]
🔗 **API:** [Add your Render link here]

## 📸 Screenshots

| Login | Dashboard |
|-------|-----------|
| ![Login](./screenshots/login.png) | ![Dashboard](./screenshots/dashboard.png) |

| New Task Modal |
|----------------|
| ![New Task](./screenshots/task-modal.png) |
---

## ✨ Features

- 🔐 **JWT Authentication** — secure register/login with hashed passwords (bcrypt)
- ✅ **Task Management** — full CRUD with categories, priority levels, and due dates
- 🔍 **Search & Filter** — find tasks instantly by keyword or status
- 📊 **Dashboard Analytics** — live stats on total, completed, and pending tasks
- 🛡️ **Protected Routes** — role-based access (user/admin) enforced on both frontend and backend
- 👤 **Profile Management** — update account details and change password
- 📱 **Responsive Design** — clean UI built with Tailwind CSS, works on mobile and desktop

---

## 🛠 Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt password hashing

**DevOps**
- Docker (multi-stage builds)
- GitHub Actions (CI)
- Deployed on Vercel (frontend) + Render (backend)

---

## 📁 Project Structure

```
smart-task-manager/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Route logic (auth, tasks)
│   ├── middleware/       # JWT auth, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── utils/             # Token generation, logging
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI (common, layout, tasks)
│   │   ├── pages/          # Route-level views
│   │   ├── context/        # Auth state management
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API call layer
│   │   └── routes/           # App routing
│
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # add your MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5000`.

---

## 🔌 API Endpoints

**Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/profile` | Get logged-in user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/change-password` | Change password |

**Tasks** *(all require auth token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all user's tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get single task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/search?q=` | Search tasks |
| GET | `/api/tasks/filter?status=` | Filter tasks |

---

## 🐳 Run with Docker

```bash
docker-compose up --build
```

---

## 👤 Author

**Prasann**
MERN Stack Developer | BCA, Guru Nanak First Grade College
🔗 [GitHub](https://github.com/bellaleprasann20)

---

## 📄 License

MIT