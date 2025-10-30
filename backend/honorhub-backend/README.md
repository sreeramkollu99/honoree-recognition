🧾 backend/README.md
# 🎖️ Honoree Recognition Backend (Spring Boot)

This is the backend service for the **Honoree Recognition Platform**, a system that helps track, celebrate, and manage student or scout achievements (like Eagle Scout or Governor’s Code of Honor recognitions).  
It provides REST APIs for authentication, honoree management, and integration with official recognition requests.

---

## ⚙️ Tech Stack

- **Java 17+**
- **Spring Boot 3.3+**
- **Spring Web**
- **Spring Security (JWT)**
- **Spring Data JPA (Hibernate)**
- **H2 (in-memory) / PostgreSQL (optional)**
- **Maven**
- **Lombok**

---

## 🗂️ Project Structure



backend/
├── src/main/java/com/honorhub/honorhub_backend/
│ ├── controller/ # REST controllers (Auth, Honoree, etc.)
│ ├── model/ # JPA entities (User, Role)
│ ├── repository/ # Spring Data repositories
│ ├── service/ # Business logic (AuthService, etc.)
│ ├── security/ # JWT filters & security config
│ └── config/ # Spring Security & CORS setup
├── src/main/resources/
│ ├── application.yml # Environment configuration
└── pom.xml # Maven dependencies


---

## 🚀 Getting Started

### 1️⃣ Prerequisites
- Java 17+
- Maven 3.8+
- Postman or any API client (for testing)

---

### 2️⃣ Run Locally

#### 🧩 Option A — Using Maven
```bash
cd backend
mvn spring-boot:run

🧩 Option B — Using IntelliJ or VS Code

Open the backend folder as a Maven project.

Run HonorhubApplication.java as a Spring Boot app.

Once running, the backend is available at:

http://localhost:8080

3️⃣ H2 Console (for local DB)

You can view data directly in the H2 in-memory database:

http://localhost:8080/h2-console


JDBC URL: jdbc:h2:mem:honorhub
Username: sa
Password: (leave blank)

🔐 Authentication (JWT)
🧾 Register a User

POST /api/auth/register

{
  "email": "student1@example.com",
  "password": "password123",
  "role": "STUDENT"
}


Response

"User registered successfully"

🔑 Login

POST /api/auth/login

{
  "email": "student1@example.com",
  "password": "password123"
}


Response

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "student1@example.com",
  "role": "STUDENT"
}


Copy the token and include it in request headers for secured endpoints:

Authorization: Bearer <token>

🧱 Future Endpoints (Planned)
Endpoint	Method	Description
/api/honorees	GET / POST	Manage honoree profiles
/api/letters	GET / POST	Generate and store recognition letters
/api/uploads	POST	Upload certificates and proofs
/api/admin/dashboard	GET	Admin overview of recognitions
⚙️ Environment Configuration

You can switch between H2 and PostgreSQL using application.yml.

✅ H2 (default)
spring:
  datasource:
    url: jdbc:h2:mem:honorhub
    driverClassName: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: update

🐘 PostgreSQL (production)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/honorhub
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update

🧠 API Testing (Postman)

Register → /api/auth/register

Login → /api/auth/login

Copy JWT token from login response.

Add header:

Authorization: Bearer <token>


Access secure endpoints like /api/honorees.

🧩 Common Troubleshooting
Problem	Cause	Fix
No qualifying bean of type PasswordEncoder	Missing bean	Add @Bean PasswordEncoder() in SecurityConfig
Cannot resolve symbol io.jsonwebtoken	JJWT lib not installed	Add jjwt-api, jjwt-impl, jjwt-jackson dependencies
frameOptions() deprecated	Spring Security 6+	Use .frameOptions(frame -> frame.disable())
👥 Contributors

Sreeram Kollu — Backend Developer

(Frontend team / collaborators)

📜 License

This project is released under the MIT License.
See LICENSE for details.


---

✅ **Usage**
1. Save this file as:  


backend/README.md

2. Commit and push:
```bash
git add backend/README.md
git commit -m "Added backend README"
git push