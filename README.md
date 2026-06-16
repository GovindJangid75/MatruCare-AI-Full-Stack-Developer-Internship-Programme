<div align="center">

# 🩺 MatruCare AI Hackathon Portal

**A production-grade MERN platform for hackathon management — featuring JWT authentication, OTP email verification, dynamic team registration, and an admin control panel.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4+-lightgrey.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-v3-blueviolet.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5+-yellow.svg)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages Walkthrough](#-pages-walkthrough)
- [API Reference](#-api-endpoints-reference)
- [Environment Configuration](#-environment-configuration)
- [Local Installation & Setup](#-local-installation--setup)
- [Security & Production Guidelines](#-security--production-guidelines)
- [Architectural Decisions](#-architectural-decisions)
- [Recent Refactoring Notes](#-recent-refactoring-notes)
- [Contributing](#-contributing)

---

## 🌟 Overview

**MatruCare AI Hackathon Portal** is a comprehensive full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that streamlines every aspect of hackathon management — from public registration to team formation, project submission, and administrative oversight.

The portal is built for real-world production use with security best practices baked in from day one: rate limiting, JWT authentication, bcrypt password hashing, NoSQL injection protection, XSS sanitization, and transactional email flows.

> 💡 **Designed for:** Organizers of the **MatruCare AI** healthcare innovation hackathon track, but is fully adaptable to any event.

---

## ✨ Features

### 🔐 Authentication & Security

| Feature | Details |
|---|---|
| **JWT Access Tokens** | Stateless token-based auth with Bearer header injection via Axios interceptors |
| **OTP Verification** | 6-digit code sent to user email on signup; 10-minute validity with countdown timer and resend logic |
| **Bcrypt Password Hashing** | Strong one-way hashing before any password touches MongoDB |
| **Route Guards** | Frontend: `ProtectedRoute` and `PublicRoute` HOCs. Backend: `protect` and `admin` middleware |
| **Rate Limiting** | Express Rate Limiter blocks brute-force and DoS attempts |
| **NoSQL Injection** | `express-mongo-sanitize` strips `$` and `.` from user inputs |
| **XSS Protection** | `xss-clean` sanitizes request bodies and query strings |
| **Security Headers** | `helmet` sets secure HTTP response headers automatically |

### 📧 Transactional Email System

- **Nodemailer + Gmail SMTP** — Custom SMTP transport with App Password support
- **Styled HTML Templates** — Branded email designs for OTP verification and registration confirmation
- **Contact Form Relay** — Incoming support queries auto-forwarded to organizer inboxes
- **Resend Flow** — Handles expired OTPs gracefully with configurable resend cool-down

### 🎯 Hackathon Registration & Team Management

- **Solo & Team Modes** — Supports 1–4 participants per team with dynamic member input blocks
- **Comprehensive Validations** — Indian phone number format, valid Drive/GitHub/portfolio URLs, course and branch lists
- **Full CRUD** — Create, read, update, and delete registrations from the participant dashboard
- **Real-time Status** — Registration status badges (Pending / Approved / Rejected) shown on dashboard

### 🎨 Modern UI/UX

- **Glassmorphism Design System** — Elegant dark-mode-first aesthetic with custom gradient layouts
- **Framer Motion** — Smooth page transitions, hover effects, and scroll-triggered animations
- **Toast Notifications** — `react-hot-toast` provides contextual feedback across all async actions
- **Skeleton Loaders** — Loading fallback states prevent layout shift during data fetch
- **Fully Responsive** — Works across mobile, tablet, and desktop breakpoints

### 🛠️ Technical Architecture

- **Axios Global Interceptors** — Automatically attaches `Authorization: Bearer <token>` to all outgoing requests; triggers logout on `401` responses
- **Centralized Error Handling** — `ApiError` / `ApiResponse` wrapper classes + `asyncHandler` for clean, consistent error propagation
- **Joi Schema Validation** — All request bodies validated at the route layer before reaching business logic
- **Context API Auth State** — Auth state managed globally via `AuthContext`; no prop drilling needed

---

## 🚀 Tech Stack

### Frontend

| Technology | Role |
|---|---|
| React 18+ (Vite) | Core UI framework and bundler |
| Tailwind CSS + PostCSS | Utility-first styling |
| React Router DOM v6 | Client-side routing and route protection |
| Context API | Global auth state management |
| React Hook Form + Yup | Form state and schema-based validation |
| Axios | HTTP client with global interceptors |
| Framer Motion | Page and component animations |
| React Icons | Icon library |
| React Hot Toast | Toast notification system |

### Backend

| Technology | Role |
|---|---|
| Node.js 18+ | Server runtime |
| Express.js | HTTP framework and middleware chain |
| MongoDB + Mongoose | NoSQL database and ODM |
| JSON Web Token (JWT) | Stateless authentication tokens |
| BcryptJS | Password hashing |
| Nodemailer | Transactional email via Gmail SMTP |
| Joi | Request body validation schemas |
| Helmet | Security HTTP headers |
| Express Rate Limit | DoS / brute-force protection |
| express-mongo-sanitize | NoSQL injection sanitization |
| xss-clean | Cross-site scripting prevention |

### Development Tools

| Tool | Purpose |
|---|---|
| Nodemon | Auto-restart server on file changes |
| ESLint | Code quality enforcement |
| Dotenv | Environment variable management |
| Vite | Frontend HMR dev server and build tool |

---

## 📁 Project Structure

### Client

```
client/
├── public/                     # Static assets (favicons, logos, manifest)
├── src/
│   ├── assets/                 # Images, custom SVGs, and brand graphics
│   ├── components/
│   │   ├── common/             # Reusable atomic UI components
│   │   │   ├── Badge.jsx           # Status badge (Pending/Approved/Rejected)
│   │   │   ├── Button.jsx          # Configurable button with loading state
│   │   │   ├── Card.jsx            # Glassmorphism card container
│   │   │   ├── EmptyState.jsx      # Illustrated empty data placeholder
│   │   │   ├── Input.jsx           # Controlled input with error state
│   │   │   ├── Loading.jsx         # Spinner and skeleton loader
│   │   │   ├── Modal.jsx           # Accessible modal dialog
│   │   │   ├── Select.jsx          # Custom dropdown selector
│   │   │   └── Textarea.jsx        # Multiline input with validation
│   │   ├── forms/              # Form-level component placeholders
│   │   ├── layout/             # Global page layout wrappers
│   │   │   ├── Footer.jsx          # Site-wide footer with links
│   │   │   └── Navbar.jsx          # Sticky navigation with auth-aware menu
│   │   └── sections/           # Landing page content modules
│   │       ├── CTA.jsx             # Call-to-action banner
│   │       ├── FAQ.jsx             # Accordion FAQ block
│   │       ├── Features.jsx        # Feature highlights grid
│   │       ├── Hero.jsx            # Full-width hero with tagline + CTA
│   │       ├── Prizes.jsx          # Prize pool breakdown
│   │       └── Timeline.jsx        # Interactive event timeline
│   ├── context/
│   │   └── AuthContext.jsx     # Global auth state, token management, login/logout
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDebounce.js          # Input debounce for search/filter
│   │   ├── useForm.js              # Lightweight form state helper
│   │   └── useLocalStorage.js      # Persistent client-side storage hook
│   ├── layouts/
│   │   └── MainLayout.jsx      # App shell: Navbar + Footer + dark/light mode
│   ├── pages/                  # Top-level route page components
│   │   ├── About.jsx               # Mission and track overview
│   │   ├── Contact.jsx             # Validated contact form
│   │   ├── Dashboard.jsx           # Authenticated user home
│   │   ├── Home.jsx                # Public marketing landing page
│   │   ├── Login.jsx               # Credential authentication
│   │   ├── NotFound.jsx            # 404 error page
│   │   ├── Registration.jsx        # Hackathon team entry form
│   │   ├── Signup.jsx              # New user registration
│   │   └── VerifyOTP.jsx           # Email OTP verification
│   ├── routes/                 # Route control components
│   │   ├── AppRoutes.jsx           # Centralized route definitions
│   │   ├── ProtectedRoute.jsx      # Redirects unauthenticated users to /login
│   │   └── PublicRoute.jsx         # Redirects authenticated users to /dashboard
│   ├── services/
│   │   └── api.js              # Axios instance with base URL + auth interceptors
│   ├── utils/
│   │   ├── constants.js            # Colleges list, branches, course options
│   │   ├── helpers.js              # Date formatters, string utilities
│   │   └── validation.js           # Custom regex validators (phone, URL, etc.)
│   ├── App.jsx                 # Root component, RouterProvider
│   ├── index.css               # Global Tailwind base + custom CSS variables
│   └── main.jsx                # React DOM bootstrap entrypoint
├── .env.example                # Environment variable template
├── tailwind.config.js          # Custom theme tokens and extensions
└── vite.config.js              # Vite dev server and proxy configuration
```

### Server

```
server/
├── config/
│   ├── db.js                   # Mongoose connection setup with retry logic
│   └── email.js                # Nodemailer SMTP transporter factory
├── controllers/                # Business logic handlers
│   ├── authController.js           # signup, verifyOTP, resendOTP, login, getMe
│   ├── contactController.js        # submitContact, getAllContacts (admin)
│   ├── hackathonController.js      # registerHackathon, getMyEntry, updateEntry,
│   │                               #   deleteEntry, getAllRegistrations (admin)
│   └── userController.js           # getProfile, updateProfile
├── middleware/                 # Express middleware chain
│   ├── auth.js                     # protect (JWT verify), admin (role check),
│   │                               #   optionalAuth (public routes with optional user)
│   ├── errorHandler.js             # Global JSON error response formatter
│   ├── rateLimiter.js              # Per-route and global rate limit configs
│   └── validator.js                # Joi schema validation middleware wrapper
├── models/                     # Mongoose schemas
│   ├── Contact.js                  # Contact form submission schema
│   ├── Hackathon.js                # Team registration schema with nested members
│   └── User.js                     # User account schema with OTP fields
├── routes/                     # Express route maps
│   ├── authRoutes.js               # /api/auth/*
│   ├── contactRoutes.js            # /api/contact/*
│   ├── hackathonRoutes.js          # /api/hackathon/*
│   └── userRoutes.js               # /api/user/*
├── services/
│   └── emailService.js         # sendOTPEmail(), sendRegistrationConfirmation(),
│                               #   forwardContactMessage()
├── templates/                  # Transactional HTML email markup
│   ├── otpEmail.js                 # Branded OTP verification email
│   └── registrationEmail.js        # Registration confirmation email
├── utils/                      # Server-side helper utilities
│   ├── ApiError.js                 # Custom error class with HTTP status codes
│   ├── ApiResponse.js              # Standardized success response wrapper
│   ├── asyncHandler.js             # try/catch wrapper for async route handlers
│   └── tokenUtils.js               # JWT sign/verify helper functions
├── validators/                 # Joi request body schemas
│   ├── authValidator.js            # Signup, login, OTP input schemas
│   └── hackathonValidator.js       # Team registration schema with field rules
├── .env.example                # Environment variable template
├── server.js                   # App entry: Express setup, middleware chain, routes
└── package.json
```

---

## 📱 Pages Walkthrough

### 1. 🏠 Home / Landing Page (`Home.jsx`)
The public marketing entry point. Contains:
- **Hero Section** — Full-screen banner with headline, tagline, and primary CTA directing visitors to sign up
- **Features Grid** — Highlights the hackathon's key themes (healthcare AI, problem tracks, tech stack requirements)
- **Interactive Timeline** — Animated milestone tracker (Registration → Submission → Judging → Results)
- **Prizes Section** — Tiered reward breakdown with icons and value details
- **FAQ Accordion** — Expandable Q&A covering eligibility, submission rules, and prizes
- **CTA Banner** — Final registration prompt before the footer

### 2. 📖 About (`About.jsx`)
Detailed narrative page covering:
- MatruCare AI mission and vision
- Healthcare innovation tracks and problem statements
- Target technologies and evaluation criteria
- Event timeline milestones

### 3. 📬 Contact (`Contact.jsx`)
Fully validated contact form with fields for name, email, subject, and message. On submission:
- Entry saved to MongoDB via `POST /api/contact`
- Transactional notification relayed to organizer inbox via Nodemailer

### 4. 📝 Signup (`Signup.jsx`)
New account creation form with:
- Full name, email, and password fields
- Live password confirmation validation
- On success: triggers OTP generation and dispatches verification email → redirects to `VerifyOTP`

### 5. 🔑 OTP Verification (`VerifyOTP.jsx`)
Email verification step:
- 6-digit OTP entry with visual input blocks
- 10-minute countdown timer displayed in real-time
- Disabled resend button with cool-down; reactivates when timer expires
- On success: JWT issued and user redirected to Dashboard

### 6. 🔓 Login (`Login.jsx`)
Credential authentication for existing users:
- Email + password form with inline validation
- Auto-redirects unverified users back to `VerifyOTP`
- On success: JWT stored and user routed to Dashboard

### 7. 📊 Dashboard (`Dashboard.jsx`)
Authenticated user home with:
- Custom avatar and welcome message
- Registration status card (Pending / Approved / Rejected badge)
- Project summary (title, abstract, GitHub link, PPT link)
- Academic profile overview (college, course, year, branch)
- Statistics cards (members count, submission date, etc.)
- Quick-action links to edit or delete registration

### 8. 📋 Registration (`Registration.jsx`)
Comprehensive hackathon entry form with three sections:

| Section | Fields |
|---|---|
| **Academic Details** | College, course, branch, year |
| **Project Details** | Title, abstract, GitHub URL, Drive PPT link, track/category |
| **Team Members** | Dynamic blocks based on team size (1–4); each block: name, email, phone, role |

Supports both first-time submission (`POST`) and future updates (`PUT`).

---

## 📡 API Endpoints Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| `POST` | `/signup` | Public | Register user; dispatch OTP email | `{ fullName, email, password, confirmPassword }` |
| `POST` | `/verify-otp` | Public | Verify OTP; return JWT access token | `{ email, otp }` |
| `POST` | `/resend-otp` | Public | Resend OTP to email | `{ email }` |
| `POST` | `/login` | Public | Authenticate; return JWT | `{ email, password }` |
| `GET` | `/me` | 🔒 Protected | Return authenticated user profile | — |

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| `GET` | `/me` | 🔒 Protected | Full user profile with details | — |
| `PUT` | `/update` | 🔒 Protected | Update display name | `{ fullName }` |

### Hackathon Routes — `/api/hackathon`

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| `POST` | `/register` | 🔒 Protected | Submit registration | `hackathonSchema` |
| `GET` | `/my-entry` | 🔒 Protected | Fetch own registration | — |
| `PUT` | `/update/:id` | 🔒 Protected | Update project/team details | `hackathonSchema` |
| `DELETE` | `/:id` | 🔒 Protected | Delete own registration | — |
| `GET` | `/all` | 🛡️ Admin | Retrieve all registrations | — |

### Contact Routes — `/api/contact`

| Method | Endpoint | Auth | Description | Body |
|---|---|---|---|---|
| `POST` | `/` | Public | Submit contact/support query | `{ name, email, subject, message }` |
| `GET` | `/all` | 🛡️ Admin | Retrieve all contact submissions | — |

> 🔒 **Protected** = requires valid `Authorization: Bearer <token>` header  
> 🛡️ **Admin** = requires valid JWT with `role: "admin"` claim

---

## ⚙️ Environment Configuration

### Client — `client/.env`

```ini
# Backend API base URL (no trailing slash)
VITE_API_URL=http://localhost:5000/api

# Application display name
VITE_APP_NAME=MatruCare AI Hackathon Portal
```


## 🛠️ Local Installation & Setup

### Prerequisites

- [Node.js v18+](https://nodejs.org/) — verify with `node -v`
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) OR a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI
- A Gmail account with 2-Step Verification enabled (for App Password generation)
- Git

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/GovindJangid75/aria_native.git
cd matrucare-ai-hackathon-portal
```

---

### Step 2 — Start MongoDB

Ensure your MongoDB instance is running before starting the server.

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Windows (PowerShell, run as Administrator):**
```powershell
Start-Service MongoDB
```

**Linux (systemd):**
```bash
sudo systemctl start mongod
```

**OR** — Use a MongoDB Atlas URI in `MONGODB_URI` and skip this step entirely.

---

### Step 3 — Configure and Start the Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy env template and configure it
cp .env.example .env
# → Edit .env: set MONGODB_URI, EMAIL_USER, EMAIL_PASS, JWT_SECRET

# Start development server (with hot reload via Nodemon)
npm run dev
```

✅ You should see a startup box confirming:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

---

### Step 4 — Configure and Start the Frontend

Open a **new terminal tab/window**, then:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Copy env template
cp .env.example .env
# → Confirm VITE_API_URL=http://localhost:5000/api

# Start Vite development server
npm run dev
```

✅ Visit: **[http://localhost:5173](http://localhost:5173)**

---

### Full Stack: Running Both Simultaneously

For convenience, from the project root you can use two terminal panes:

| Terminal | Command |
|---|---|
| Terminal 1 (Backend) | `cd server && npm run dev` |
| Terminal 2 (Frontend) | `cd client && npm run dev` |

---

## 🔒 Security & Production Guidelines

### Gmail App Password (Required for Email)

Never use your main Google account password. Instead:

1. Go to [myaccount.google.com](https://myaccount.google.com/) → **Security**
2. Enable **2-Step Verification** if not already active
3. Navigate to **App Passwords** (search if needed)
4. Generate a new password labeled `"MatruCare Mail"` 
5. Copy the **16-character code** and paste into `EMAIL_PASS` in `server/.env`

### CORS in Production

Update `FRONTEND_URL` in `server/.env` to your actual deployed domain before going live:

```ini
FRONTEND_URL=https://your-production-domain.com
```

Leaving it as `localhost` in production will block all cross-origin requests from your deployed frontend.

### Secret Management Checklist

- [ ] `JWT_SECRET` is a long random string (32+ chars) — not `"secret"` or similar
- [ ] `.env` files are added to `.gitignore` and never committed
- [ ] MongoDB Atlas cluster uses IP allowlist and strong credentials
- [ ] Production uses environment variables via hosting platform (Vercel, Railway, Render, etc.), not `.env` files

### Recommended Production Additions

- **HTTPS** — Use a reverse proxy (Nginx) or deploy to a platform that handles TLS
- **Refresh Tokens** — Extend JWT architecture with short-lived access + long-lived refresh token rotation
- **File Uploads** — Replace Drive link submissions with direct S3/Cloudinary uploads
- **Admin Dashboard** — Build a dedicated `/admin` route with registration management UI

---

## 🏗️ Architectural Decisions

### Why JWT (Stateless) over Sessions?

Stateless JWTs avoid the need for server-side session stores, making horizontal scaling straightforward. The trade-off (no server-side revocation) is mitigated by short expiry windows and the OTP-based account recovery flow.

### Why Context API over Redux?

The auth state is the only truly global state in this app. Context API handles this cleanly without the boilerplate overhead of Redux. If the app grows to include complex server state (caching, pagination), consider layering in React Query.

### Why Joi on the Backend AND Yup on the Frontend?

Frontend Yup validation improves UX by catching errors instantly. Backend Joi validation is the security boundary — it exists independently so malicious clients bypassing the UI still hit server-side checks.

### Why MongoDB over PostgreSQL?

Team registration structures (variable member counts, flexible project metadata) fit document storage naturally. Mongoose provides enough schema enforcement to prevent data integrity issues without the rigidity of relational migrations.

---

## 🐛 Recent Refactoring Notes

### 1. User Profile Endpoint Fix (`server/routes/userRoutes.js`)

**Issue:** The user routes file previously contained duplicated auth signup/login handlers, causing profile queries to return auth responses instead of user data.

**Resolution:** Rewired the routes to correctly call `getProfile` and `updateProfile` from `userController.js`.

```js
// Before (broken)
router.get('/me', protect, authController.signup); // ❌ Wrong controller

// After (fixed)
router.get('/me', protect, userController.getProfile); // ✅ Correct
router.put('/update', protect, userController.updateProfile);
```

### 2. Hackathon CRUD Endpoint Fix (`server/routes/hackathonRoutes.js`)

**Issue:** Hackathon route definitions were duplicating auth endpoint handlers, causing registration submissions and updates to fail silently.

**Resolution:** Routes now correctly point to all five hackathon controller methods with proper JWT middleware:

```js
router.post('/register', protect, hackathonController.registerHackathon);
router.get('/my-entry', protect, hackathonController.getMyEntry);
router.put('/update/:id', protect, hackathonController.updateEntry);
router.delete('/:id', protect, hackathonController.deleteEntry);
router.get('/all', protect, admin, hackathonController.getAllRegistrations);
```

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear, descriptive commits
4. Push to your fork and open a Pull Request

Please follow the existing code style (ESLint is configured) and ensure your changes don't break existing functionality before submitting.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) — free to use, modify, and distribute with attribution.

---

<div align="center">

Built with ❤️ for the **MatruCare AI** healthcare innovation hackathon

</div>