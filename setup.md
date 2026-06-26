# Unfold Setup Guide

This guide will walk you through setting up and running **Unfold (unfoldwed.com)** on your local development environment.

---

## Prerequisites

Before starting, ensure you have the following installed:
* **Node.js** (v18.x or v20.x recommended)
* **npm** (v10.x or higher)
* **PostgreSQL Database**: A running local PostgreSQL instance or a remote database URL (e.g. from Supabase).

---

## 1. Install Dependencies

Clone the repository, navigate to the root folder, and run:

```bash
npm install
```

This installs all core framework dependencies (Next.js 16, Tailwind CSS v4, Prisma, NextAuth, Nodemailer, Razorpay, Cloudinary, and Framer Motion).

---

## 2. Environment Configuration

Create a `.env` file in the root folder of the project. Copy the template below and fill in your credentials:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Unfold

# Database Configuration (PostgreSQL / Supabase)
DATABASE_URL="postgresql://postgres:your-password@localhost:5432/unfold"

# NextAuth Configuration
# Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL=http://localhost:3000/api/auth

# Google OAuth Credentials (Optional in Dev)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Nodemailer SMTP Configuration (For Magic Link/OTP Login)
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT=587
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"
EMAIL_FROM="noreply@unfoldwed.com"

# Razorpay Payment Gateway Credentials
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxxxxx"

# Cloudinary Credentials (For Media Uploads)
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

---

## 3. Database Scaffolding

With the database connection URL configured in `.env`, run the database migration and generate the Prisma Client:

```bash
# Apply schema migrations to create database tables
npx prisma db push

# Generate Prisma Client library
npx prisma generate
```

---

## 4. Run Development Server

Launch the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the premium, responsive **Unfold** landing page.

---

## Additional Commands

* `npm run build`: Prepares the optimized production build of the Next.js application.
* `npm run lint`: Performs static analysis and code checks using ESLint rules.
* `npx prisma studio`: Launches the Prisma graphical dashboard to browse and edit database records at [http://localhost:5555](http://localhost:5555).
