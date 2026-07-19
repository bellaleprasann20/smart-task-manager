# Smart Task Manager

A full-stack task management app built with the MERN stack, containerized with Docker, and deployable via Kubernetes with a GitHub Actions CI/CD pipeline.

## Features
- JWT authentication (register/login)
- Task CRUD with categories, priority, status, due dates
- Search and filter tasks
- Dashboard with task statistics
- Admin panel (user & task management)
- Responsive UI (React + Tailwind CSS)

## Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
**DevOps:** Docker, Docker Compose, Kubernetes, GitHub Actions

## Getting Started (local dev)

### Backend
\`\`\`bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
cp .env.example .env
npm run dev
\`\`\`

### With Docker Compose
\`\`\`bash
docker-compose up --build
\`\`\`

## Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Optional: Kubernetes manifests in \`kubernetes/\` for cluster deployment

## License
MIT