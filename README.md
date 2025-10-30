# 🎓 HonorTrack — Honoree Recognition Management Platform

A full-stack web application for tracking, managing, and celebrating official recognitions such as **Eagle Scout achievements**, **Governor’s Letters**, **Presidential Greetings**, **Capitol Flags**, and more.  

This repository contains both the **frontend** (Next.js + Tailwind) and the **backend** (Spring Boot + JWT).

---

## 🧭 Project Overview

| Layer | Tech Stack | Description |
|-------|-------------|-------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui | Interactive web interface for honoree tracking, recognition requests, and letter generation. |
| **Backend** | Spring Boot 3.3+, Java 17, JWT Auth, Spring Security, JPA | REST API providing authentication, honoree management, and data persistence. |
| **Database** | PostgreSQL | Stores users, honorees, and recognition data. |

---

## 📁 Repository Structure

honoree-recognition/
├── frontend/ # Next.js 15 frontend (React + Tailwind)
└── backend/ # Spring Boot 3.3 backend (JWT + REST API)

yaml
Copy code

Each sub-folder has its own README file with detailed setup instructions.

- [Frontend README →](./frontend/README.md)
- [Backend README →](./backend/README.md)

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

| Tool | Version | Description |
|------|----------|-------------|
| **Java** | 17+ | Required for Spring Boot backend |
| **Maven** | 3.8+ | For building and running backend |
| **Node.js** | 18+ | For building and running frontend |
| **npm** | 8+ | Dependency management for frontend |
| **Git** | Latest | For cloning and version control |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/honoree-recognition.git
cd honoree-recognition
2️⃣ Run the Backend (Spring Boot)
bash
Copy code
cd backend
mvn spring-boot:run
Backend will start on:
👉 http://localhost:8080

Test authentication endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get JWT

3️⃣ Run the Frontend (Next.js)
Open a new terminal window:

bash
Copy code
cd frontend
npm install --legacy-peer-deps
npm run dev
Frontend will start on:
👉 http://localhost:3000 or http://localhost:5173 (if using Vite)

4️⃣ Access the App
Go to the frontend URL.

Register or log in (connects to backend API).

Manage honorees, generate letters, and track recognitions.

🔗 Connecting Frontend & Backend
In your frontend .env.local file, configure:

env
Copy code
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
This allows your React/Next.js app to call backend endpoints directly.

🧰 Development Notes
CORS is configured in the backend to allow local frontend URLs:

arduino
Copy code
http://localhost:3000
http://localhost:5173
JWT tokens are required for protected routes.

Backend uses H2 in-memory DB by default. Data resets when restarted.

🧱 Deployment Overview
Component	Recommended Platform	Notes
Frontend	Vercel / Netlify	Build static frontend (npm run build)
Backend	Render / AWS / GCP / Railway	Deploy Spring Boot JAR or Docker image
Database	PostgreSQL (Render / Neon / AWS RDS)	Replace H2 with persistent DB in application.yml

🧑‍💻 For New Developers
To continue backend work:

Go to /backend.

Update application.yml with your DB credentials.

Implement new endpoints in controller/ and service/.

To continue frontend work:

Go to /frontend.

Follow frontend/README.md for Next.js setup.

Update API URLs and add new UI modules as needed.

🧩 Future Enhancements
Integration with real authentication (Supabase Auth / NextAuth)

Database persistence (PostgreSQL)

Email notifications for completed recognitions

AI-assisted letter personalization

Admin dashboard for troop-level tracking

👥 Contributors
Name
Sreeram Kollu
To be continued by next contributors…		

📜 License
This project is licensed under the MIT License — free to use and modify for personal or organizational purposes.

🧭 Quick Summary
Command	Purpose
mvn spring-boot:run	Run backend
npm run dev	Run frontend
http://localhost:8080	Backend API
http://localhost:3000	Frontend UI

⚠️ Note for Future Developers:
The backend includes working JWT authentication and basic structure for honoree management.
Extend APIs as needed to handle recognitions, certificates, and uploads.

yaml
Copy code

---

✅ **How to add it:**
1. Create this file in your root folder:  
   `/Users/sreeramkollu/Downloads/honoree-recognition/README.md`
2. Paste the full content above.
3. Save and push:
   ```bash
   git add README.md
   git commit -m "Added parent-level README"
   git push
