# 🔐 Authentication Project Template

A full-stack authentication template using Next.js and Spring Boot, featuring JWT authentication, custom credentials, and GitHub OAuth integration.

## ✨ Features

- 🔐 JWT-based authentication
- 👤 Custom credentials login
- 🔑 GitHub OAuth integration
- 🛡️ Secure token management
- 🔄 Refresh token support

## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS

### Backend
- Spring Boot
- Spring Security
- JWT
- OAuth2
- Gradle

### Environment Setup

1. Clone the repository
```bash
git clone <https://github.com/jeehwan98/authentication_project>
```

2. Frontend Setup
```bash
cd front
npm install
```

3. Backend Setup
```bash
cd backend
./gradlew build
```

4. Configure Environment Variables

Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
GITHUB_ID=YOUR_GITHUB_ID
GITHUB_SECRET=YOUR_GITHUB_SECRET
```

Backend (application.properties):
```properties
server:
  port: 8080

spring:
  datasource:
    driver-class-name: driver-class-name
    username: data-username
    password: data-password
    url: jdbc:mysql://localhost:3306/database

  jpa:
    database: mysql
    hibernate:
      ddl-auto: update
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: your-github-client-id
            client-secret: your-github-client-secret
            scope: user:email, read:user
        provider:
          github:
            authorization-uri: https://github.com/login/oauth/authorize
            token-uri: https://github.com/login/oauth/access_token
            user-info-uri: https://api.github.com/user
            user-name-attribute: login

jwt:
  secret-key: jwt-secret-key
```

### 🏃 Running the Application

1. Start the Backend
```bash
cd backend
./gradlew bootRun
```

2. Start the Frontend
```bash
cd front
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## 🔄 Authentication Flow

1. Custom Credentials Login
   - User enters email and password
   - Backend validates credentials
   - JWT token is generated and returned
   - Frontend stores token in HTTP-only cookie

2. GitHub OAuth Login
   - User clicks GitHub login button
   - Redirected to GitHub for authorization
   - Backend receives OAuth callback
   - JWT token is generated and returned
   - Frontend stores token in HTTP-only cookie

## 🔐 Security Features

- HTTP-only cookies for token storage
- CSRF protection
- Rate limiting
- Secure password hashing
- JWT token expiration
- Refresh token rotation
