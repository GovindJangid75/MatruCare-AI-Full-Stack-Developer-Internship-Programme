# 🎯 MatruCare AI Hackathon Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-v3-blueviolet.svg)](https://tailwindcss.com/)

A modern, production-grade full-stack MERN (MongoDB, Express, React, Node.js) application designed for managing hackathon registrations. The portal features a complete user authentication system, email verification using transactional OTPs, responsive dashboards, dynamic team management, contact system, and admin controls.

---

## 📋 Table of Contents

- [✨ Features](#-features)
  - [🔐 Authentication \& Security](#-authentication--security)
  - [📧 Transactional Email System](#-transactional-email-system)
  - [🎯 Hackathon Registration \& Team Management](#-hackathon-registration--team-management)
  - [🎨 Modern UI/UX \& Pages](#-modern-uiux--pages)
  - [🛠️ Technical Architecture](#️-technical-architecture)
- [🚀 Tech Stack](#-tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Development Tools](#development-tools)
- [📁 Project Structure](#-project-structure)
  - [Client Directory Tree](#client-directory-tree)
  - [Server Directory Tree](#server-directory-tree)
- [📱 Detailed Pages Walkthrough](#-detailed-pages-walkthrough)
- [⚙️ Environment Configuration](#️-environment-configuration)
  - [Client `.env`](#client-env)
- [📡 API Endpoints Reference](#-api-endpoints-reference)
  - [Auth Route (`/api/auth`)](#auth-route-apiauth)
  - [User Route (`/api/user`)](#user-route-apiuser)
  - [Hackathon Registration Route (`/api/hackathon`)](#hackathon-registration-route-apihackathon)
  - [Contact Route (`/api/contact`)](#contact-route-apicontact)
- [🛠️ Local Installation \& Setup](#️-local-installation--setup)
  - [Prerequisites](#prerequisites)
  - [Step 1: Clone and Extract](#step-1-clone-and-extract)
  - [Step 2: Database Setup](#step-2-database-setup)
  - [Step 3: Setup Server Backend](#step-3-setup-server-backend)
  - [Step 4: Setup Client Frontend](#step-4-setup-client-frontend)
- [🔒 Security & Production Guidelines](#-security--production-guidelines)
- [🐛 Recent Refactoring Notes](#-recent-refactoring-notes)

---

## ✨ Features

### 🔐 Authentication & Security
* **JWT Authentication:** Complete token-based authentication using Access Tokens.
* **OTP Verification:** Two-step verification using a 6-digit random code sent directly to user email upon registering.
* **Timer & Countdown:** 10-minute validity expiry on OTPs with custom client timers and automatic resend handling.
* **Bcrypt Hashing:** Heavy-duty password encryption hashing before saving to MongoDB database.
* **Route Protection:** Custom frontend route guards (`ProtectedRoute`, `PublicRoute`) and backend token verify middleware (`protect`, `admin`).
* **Security Middleware:** Protection against brute-force attacks via Express Rate Limiting, NoSQL Injection protection using `express-mongo-sanitize`, Cross-Site Scripting protection with `xss-clean`, and response header security using `helmet`.

### 📧 Transactional Email System
* **Nodemailer Integration:** Custom SMTP configurations tailored for Gmail services.
* **Beautiful HTML Templates:** Custom styled templates for both OTP Verification and Registration Confirmation emails.
* **Contact Enquiry Relaying:** Automatic routing of user contact form messages to organizers' designated support inboxes.

### 🎯 Hackathon Registration & Team Management
* **Dynamic Team Sizes:** Supports both Solo participants and Team registrations (1 to 4 members total).
* **Comprehensive Field Checks:** Custom validations for Indian phone numbers, URLs (Drive link for PPTs, GitHub links for Prototypes), and academic details.
* **CRUD Operations:** Participants can submit their registrations, view registration status in real-time, edit/update their project/team details, or delete their registrations directly.

### 🎨 Modern UI/UX & Pages
* **Glassmorphism Theme:** Elegant dark mode support and custom-tailored dark gradient layouts.
* **Framer Motion Animations:** Smooth page entries, hover interactive highlights, and modular transitions.
* **Form Integrations:** Rich toast notifications using `react-hot-toast` and loading/skeleton fallbacks.
* **Professional Marketing Sections:** Landing page loaded with a Hero banner, Interactive timeline, Prize pool details, and an FAQ Accordion.

### 🛠️ Technical Architecture
* **Global Interceptors:** Axios setup on the frontend that automatically appends JWT Authorization Bearer headers to requests and logs users out upon session expiration (401 errors).
* **Robust Error Handling:** Centralized Error handler class (`ApiError`, `ApiResponse`) and async handler wrappers on the Express backend.

---

## 🚀 Tech Stack

### Frontend
* **Core Framework:** React 18+ (Vite Bundler)
* **Styling & Theme:** Tailwind CSS & PostCSS
* **Routing Engine:** React Router DOM v6
* **State Management:** Context API (Auth Provider)
* **Form & Validation:** React Hook Form & Yup
* **API Client:** Axios
* **Icons & Animation:** React Icons & Framer Motion
* **Toasts:** React Hot Toast

### Backend
* **Runtime Environment:** Node.js 18+
* **Framework:** Express.js
* **NoSQL Database:** MongoDB with Mongoose ORM
* **Auth Utilities:** JsonWebToken & BcryptJS
* **Mailing Client:** Nodemailer
* **Validation Engine:** Joi

### Development Tools
* **Nodemon:** File watcher for automated backend restarts.
* **ESLint:** Code quality standards and enforcement.
* **Dotenv:** Managing environment configurations.

---

## 📁 Project Structure

### Client Directory Tree
```text
client/
├── public/                 # Static assets (favicons, logos)
├── src/
│   ├── assets/             # Images, custom SVGs, and graphics
│   ├── components/
│   │   ├── common/         # Reusable UI elements
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Select.jsx
│   │   │   └── Textarea.jsx
│   │   ├── forms/          # Form component placeholders
│   │   ├── layout/         # Header/Footer structures
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── sections/       # Landing page modules
│   │       ├── CTA.jsx
│   │       ├── FAQ.jsx
│   │       ├── Features.jsx
│   │       ├── Hero.jsx
│   │       ├── Prizes.jsx
│   │       └── Timeline.jsx
│   ├── context/
│   │   └── AuthContext.jsx # Global authorization & login states
│   ├── hooks/              # Custom reusable React hooks
│   │   ├── useDebounce.js
│   │   ├── useForm.js
│   │   └── useLocalStorage.js
│   ├── layouts/
│   │   └── MainLayout.jsx  # Wrapper with dark/light mode toggle
│   ├── pages/              # Application pages
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Registration.jsx # Hackathon team entry form
│   │   ├── Signup.jsx
│   │   └── VerifyOTP.jsx
│   ├── routes/             # Authentication route controllers
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── services/
│   │   └── api.js          # Unified Axios Client configuration
│   ├── utils/
│   │   ├── constants.js    # Colleges list, branches, course lists
│   │   ├── helpers.js      # Date converters and string formatters
│   │   └── validation.js   # Custom regex validation functions
│   ├── App.jsx             # Main App controller
│   ├── index.css           # Global custom styled themes
│   └── main.jsx            # React bootstrap entrypoint
├── .env.example
├── tailwind.config.js      # Tailwind theme extensions
└── vite.config.js          # Vite configuration
```

### Server Directory Tree
```text
server/
├── config/
│   ├── db.js               # MongoDB connection controller
│   └── email.js            # Nodemailer SMTP transporter creator
├── controllers/            # Logic handlers
│   ├── authController.js   # Signup, signin, OTP, and user context
│   ├── contactController.js# Submissions from public contact forms
│   ├── hackathonController.js # Hackathon registrations CRUD
│   └── userController.js   # User profiles & user settings updates
├── middleware/             # Express interceptors
│   ├── auth.js             # Route guards (protect, admin, optionalAuth)
│   ├── errorHandler.js     # Standardized JSON error response handler
│   ├── rateLimiter.js      # DOS & Brute force mitigation
│   └── validator.js        # Request Joi validator middleware wrapper
├── models/                 # Database schemas
│   ├── Contact.js
│   ├── Hackathon.js
│   └── User.js
├── routes/                 # Express route maps
│   ├── authRoutes.js
│   ├── contactRoutes.js
│   ├── hackathonRoutes.js
│   └── userRoutes.js
├── services/               # SMTP transactional services
│   └── emailService.js
├── templates/              # Transactional HTML email structures
│   ├── otpEmail.js
│   └── registrationEmail.js
├── utils/                  # Express helper wrappers
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── tokenUtils.js       # JWT Generation algorithms
├── validators/             # Request schema validation definitions
│   ├── authValidator.js
│   └── hackathonValidator.js
├── .env.example
├── server.js               # Application main server setup
└── package.json
```

---

## 📱 Detailed Pages Walkthrough

1. **Home/Landing Page (`Home.jsx`):**
   * Features a beautiful marketing layout containing a timeline, detailed reward lists, FAQ lists with accordion buttons, and responsive CTAs directing users to sign up.

2. **About (`About.jsx`):**
   * Tells the story of **MatruCare AI**, detailing our core mission, healthcare tracks, technological targets, and timeline milestones.

3. **Contact (`Contact.jsx`):**
   * Includes a fully validated contact form. Submissions trigger automated storage in the backend database and send transactional notifications to the organizers' main emails.

4. **Signup (`Signup.jsx`):**
   * Gathers full name, email, and password. Ensures password confirmations match and sends a request to trigger OTP creations, redirecting to the OTP Verification page.

5. **OTP Verification (`VerifyOTP.jsx`):**
   * Requests the 6-digit OTP code sent to the email. Includes countdown clocks, resend button states, and triggers JWT creation on successful verification.

6. **Login (`Login.jsx`):**
   * Authenticates verified users. Redirects unverified users automatically back to verification.

7. **Dashboard (`Dashboard.jsx`):**
   * Shows a custom avatar, registration status (e.g., Pending, Approved, Rejected), registered project info, academic profiles, statistics cards, and links to registration details.

8. **Registration (`Registration.jsx`):**
   * Collects academic, project, and team information. Dynamically inserts input blocks for team members based on the selected team size. Supports both first-time submissions and future updates.

---

## ⚙️ Environment Configuration

### Client `.env`
Create a `.env` file inside the `client/` folder:
```ini
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MatruCare AI Hackathon Portal
```

---

## 📡 API Endpoints Reference

### Auth Route (`/api/auth`)

| Method | Endpoint | Authorization | Description | Request Body (Joi validated) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/signup` | Public | Register new user; dispatches OTP | `{ fullName, email, password, confirmPassword }` |
| **POST** | `/verify-otp` | Public | Verifies OTP; returns JWT access token | `{ email, otp }` |
| **POST** | `/resend-otp` | Public | Resends OTP email | `{ email }` |
| **POST** | `/login` | Public | Authenticates credentials; returns JWT | `{ email, password }` |
| **GET** | `/me` | Protected | Retrieves active verified user profile | None |

### User Route (`/api/user`)

| Method | Endpoint | Authorization | Description | Request Body (Joi validated) |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/me` | Protected | Retrieves full profile details | None |
| **PUT** | `/update` | Protected | Updates user full name | `{ fullName }` |

### Hackathon Registration Route (`/api/hackathon`)

| Method | Endpoint | Authorization | Description | Request Body (Joi validated) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Protected | Submit a registration entry | `hackathonSchema` (Academic, Project & Team data) |
| **GET** | `/my-entry` | Protected | Fetches active user's registration | None |
| **PUT** | `/update/:id` | Protected | Updates project/team details | `hackathonSchema` (Academic, Project & Team data) |
| **DELETE**| `/:id` | Protected | Deletes active user's registration | None |
| **GET** | `/all` | Admin | Fetches all hackathon registrations | None |

### Contact Route (`/api/contact`)

| Method | Endpoint | Authorization | Description | Request Body (Joi validated) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/` | Public | Submits contact/support form | `{ name, email, subject, message }` |
| **GET** | `/all` | Admin | Retrieves list of contact queries | None |

---

## 🛠️ Local Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended).
* [MongoDB](https://www.mongodb.com/try/download/community) community server installed and running, OR a MongoDB Atlas database URI.

### Step 1: Clone and Extract
```bash
git clone https://github.com/GovindJangid75/aria_native.git # (Or navigate to the hackathon project directory)
cd matrucare-ai-hackathon-portal
```

### Step 2: Database Setup
Make sure your local MongoDB service is active:
* **Windows (PowerShell):** `Start-Service MongoDB`
* **macOS (Terminal):** `brew services start mongodb-community`

### Step 3: Setup Server Backend
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependecies:
   ```bash
   npm install
   ```
3. Copy the environment variables template and configure it:
   ```bash
   cp .env.example .env
   ```
   *Modify the database connections (`MONGODB_URI`) and Gmail configuration (`EMAIL_USER`, `EMAIL_PASS`) inside `.env`.*
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server should bootstrap and print a status box confirming connection to the database.*

### Step 4: Setup Client Frontend
1. Open a new terminal window and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Setup the frontend `.env` config:
   ```bash
   cp .env.example .env
   ```
4. Start the React development environment:
   ```bash
   npm run dev
   ```
5. Click or visit: `http://localhost:5173`

---

## 🔒 Security & Production Guidelines

* **Gmail SMTP App Password:** Do not use your primary Google account password in the configurations. Go to Google Account Settings -> Security -> 2-Step Verification -> App Passwords. Generate a new password labeled "Mail" and use the generated 16-character code in your SMTP settings.
* **Cors Configurations:** In production, configure the allowed origins with your actual hosting domain (e.g. `https://my-hackathon-portal.vercel.app`) to block external unauthorized API requests.
* **Database Credentials:** Keep production MongoDB connection strings safe, and avoid committing `.env` files to Git.

---

## 🐛 Recent Refactoring Notes

The following codebase updates were made to ensure full API functionality:
1. **User Profile Endpoint Fix (`server/routes/userRoutes.js`):**
   * *Issue:* The user routes file previously contained duplicated auth signup/login handlers, which caused profile queries to malfunction.
   * *Resolution:* Re-routed profiles to call the appropriate `getProfile` and `updateProfile` methods in the `userController.js`.
2. **Hackathon CRUD Endpoint Fix (`server/routes/hackathonRoutes.js`):**
   * *Issue:* The hackathon routes file duplicated authentication endpoint definitions, breaking the ability to submit or update registrations.
   * *Resolution:* Successfully linked the routes to handle `registerHackathon`, `getMyEntry`, `updateEntry`, `deleteEntry`, and `getAllRegistrations` with correct JWT verification checks.