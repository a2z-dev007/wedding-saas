# 🏰 Unfold Wedding SaaS — Complete Backend Integration Guide & Account Setup

This guide provides an exhaustive, beginner-friendly, click-by-click walkthrough to **create accounts**, **obtain every required API key and connection string**, and **configure your local & production `.env`** for:

1. [Supabase (PostgreSQL Database & Prisma ORM)](#1-supabase--postgresql-database-setup-guide)
2. [Cloudinary (Image Storage & Optimization)](#2-cloudinary--image-storage-setup-guide)
3. [Razorpay (Payment Gateway & Live Checkout)](#3-razorpay--payment-gateway-setup-guide)
4. [Google Cloud Console (OAuth Authentication)](#4-google-oauth--nextauth-setup-guide)
5. [Complete `.env` Cheat Sheet](#5-complete-env-cheat-sheet)
6. [Database Sync & Verification Steps](#6-database-sync--verification-steps)

---

## 1. 🗄️ Supabase — PostgreSQL Database Setup Guide

Supabase provides the managed PostgreSQL database that stores users, wedding orders, invitations, ceremonies, and guest RSVPs.

### Step 1.1: Create a Free Supabase Account
1. Open your browser and go to [https://supabase.com](https://supabase.com).
2. Click **Start your project** (or **Sign In** with your GitHub account).
3. If signing up for the first time, complete the quick email verification.

### Step 1.2: Create a New Database Project
1. In the Supabase Dashboard, click the **New project** button.
2. Select an **Organization** (create one if you don't have one, e.g. `My Wedding SaaS`).
3. Fill in the project details:
   - **Name**: `unfold-wedding-saas` (or any name you prefer)
   - **Database Password**: ⚠️ *CRITICAL:* Enter a strong password (e.g., `WeddingPass2026!#`) and **save it in your notes**. You will need this password inside your `DATABASE_URL`.
   - **Region**: Choose the region closest to your target users (e.g. `South Asia (Mumbai)` for India, or `US East`).
   - **Pricing Plan**: Select **Free tier**.
4. Click **Create new project**.
5. Wait ~60–90 seconds while Supabase provisions your PostgreSQL database cluster.

### Step 1.3: Obtain Connection Strings for Prisma
Once your project status shows active (green dot):
1. In the left sidebar, click the ⚙️ **Project Settings** (gear icon at the bottom left).
2. Under **Project Settings**, click **Database**.
3. Scroll down to the **Connection strings** section.
4. You will need TWO connection URLs for Prisma:

#### A. Pooled Connection String (`DATABASE_URL`):
- Click the **Connection Pooling** tab (or **Transaction** mode, port `6543`).
- Select **Mode: Transaction** and check the box **Use connection pooling**.
- Copy the URI. It looks like:
  ```
  postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
  ```
- Replace `[YOUR-PASSWORD]` with the database password you created in Step 1.2.

#### B. Direct Connection String (`DIRECT_URL`):
- Click the **Session** or **Direct connection** tab (port `5432`).
- Copy the direct URI. It looks like:
  ```
  postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
  ```
- Replace `[YOUR-PASSWORD]` with your database password.

---

## 2. ☁️ Cloudinary — Image Storage Setup Guide

Cloudinary stores couple portraits and gallery photos with instant CDN delivery and automatic WebP image compression.

### Step 2.1: Create a Free Cloudinary Account
1. Open [https://cloudinary.com](https://cloudinary.com).
2. Click **Sign Up for Free**.
3. Sign in with Google or enter your name, email, and password.
4. When asked for primary use case, select **Programmable Media / Developer API**.

### Step 2.2: Copy API Credentials from Dashboard
1. Once logged into the Cloudinary Console ([https://console.cloudinary.com](https://console.cloudinary.com)):
2. On your **Dashboard / Programmable Media Home**, you will see a box named **Product Environment Credentials** (or **Account Details**):
   - 📋 **Cloud Name**: (e.g., `dxy7abcde`) ➔ Copy this as `CLOUDINARY_CLOUD_NAME` & `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
   - 📋 **API Key**: (e.g., `872349182374912`) ➔ Copy this as `CLOUDINARY_API_KEY`.
   - 📋 **API Secret**: Click the **Eye icon** or **Copy API Secret** ➔ Copy this as `CLOUDINARY_API_SECRET`.

### Step 2.3: Create an Upload Preset
1. In Cloudinary, click the ⚙️ **Settings** (gear icon in the bottom left sidebar).
2. In the Settings menu, click **Upload** (under Product Settings).
3. Scroll down to the **Upload presets** section.
4. Click **Add upload preset**.
5. Configure the preset:
   - **Upload preset name**: `unfold_wedding_uploads` (or any name you choose)
   - **Signing Mode**: Set to **Unsigned** (allows direct frontend uploads with fallback).
   - **Folder**: `wedding-saas/couple`
6. Click **Save** at the top right.
7. Copy the preset name (`unfold_wedding_uploads`) as `CLOUDINARY_UPLOAD_PRESET`.

---

## 3. 💳 Razorpay — Payment Gateway Setup Guide

Razorpay handles UPI payments (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and NetBanking to unlock permanent wedding invitations.

### Step 3.1: Create a Razorpay Account
1. Go to [https://razorpay.com](https://razorpay.com).
2. Click **Sign Up**.
3. Enter your business or personal email, phone number, and verify with OTP.
4. Select **Accept payments on Website/App**.

### Step 3.2: Switch to Test Mode
> [!NOTE]
> You can build, test, and accept simulated payments in **Test Mode** immediately without business KYC!

1. In the top header bar of your Razorpay Dashboard, find the toggle that says **Test Mode / Live Mode**.
2. Toggle it to **Test Mode** (the dashboard turns dark blue/purple indicating test sandbox).

### Step 3.3: Generate Test API Keys
1. In the left sidebar, click **Account & Settings** (or scroll down to **Settings**).
2. Under the **API Keys** section, click **API Keys**.
3. Click the blue **Generate Test Key** (or **Regenerate Key**) button.
4. A popup modal will display your credentials:
   - 📋 **Key ID**: Starts with `rzp_test_...` (e.g., `rzp_test_1DP5mmOlqwxqbg`) ➔ Copy as `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
   - 📋 **Key Secret**: (e.g., `s9df8s7df8s97dfsd8fsd`) ➔ Copy as `RAZORPAY_KEY_SECRET`.
5. Click **Download Key Details** or copy them immediately to your `.env` file before closing the modal.

### Step 3.4: (Optional) Set up Webhooks
1. In **Account & Settings** -> **Webhooks** -> Click **Add New Webhook**.
2. **Webhook URL**: `https://your-domain.com/api/payments/verify` (for local testing, use ngrok or skip).
3. **Secret**: Enter a secret string (e.g. `unfold_secret_webhook_2026`) and paste as `RAZORPAY_WEBHOOK_SECRET`.
4. **Active Events**: Check `order.paid` and `payment.captured`.
5. Click **Create Webhook**.

---

## 4. 🔑 Google OAuth & NextAuth Setup Guide

NextAuth provides session management and Google 1-Click Login for couples to access their wedding dashboard.

### Step 4.1: Generate `NEXTAUTH_SECRET`
Open your terminal (PowerShell or Bash) and run:
```bash
# Option A: Node.js one-liner
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option B: OpenSSL (if installed)
openssl rand -base64 32
```
Copy the generated 44-character string and set it as `NEXTAUTH_SECRET`.

### Step 4.2: Create Google OAuth 2.0 Client Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com).
2. Click the project dropdown at the top and click **New Project** (Name: `Unfold Wedding SaaS`).
3. In the left navigation menu, go to **APIs & Services** -> **OAuth consent screen**:
   - User Type: Select **External** -> Click **Create**.
   - App Name: `Unfold Wedding SaaS`
   - User support email: Select your email.
   - Developer contact email: Enter your email.
   - Click **Save and Continue** through the remaining screens.
4. In the left navigation menu, click **Credentials**:
   - Click **+ CREATE CREDENTIALS** at the top -> Select **OAuth client ID**.
   - **Application type**: Web application.
   - **Name**: `Unfold Wedding Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://your-production-domain.com` (when deployed)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-production-domain.com/api/auth/callback/google`
   - Click **Create**.
5. Copy the displayed credentials:
   - 📋 **Client ID** ➔ `GOOGLE_CLIENT_ID`
   - 📋 **Client Secret** ➔ `GOOGLE_CLIENT_SECRET`

---

## 5. 📄 Complete `.env` Cheat Sheet

Create a file named `.env` in the root of your `wedding-saas` project (`d:\practice\projects-S\invitation\wedding-saas\.env`) and paste your actual keys:

```env
# =============================================================
# 🌐 APP URL & SECRETS
# =============================================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="REPLACE_WITH_GENERATED_BASE64_STRING"

# =============================================================
# 🗄️ SUPABASE POSTGRESQL (From Supabase Project Settings -> Database)
# =============================================================
# Transaction Pooler URI (Port 6543)
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[DB-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Session Direct URI (Port 5432)
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[DB-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# =============================================================
# ☁️ CLOUDINARY (From Cloudinary Dashboard)
# =============================================================
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_UPLOAD_PRESET="unfold_wedding_uploads"

# =============================================================
# 💳 RAZORPAY (From Razorpay Dashboard -> API Keys)
# =============================================================
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_YourTestKeyId"
RAZORPAY_KEY_SECRET="YourRazorpayKeySecret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"

# =============================================================
# 🔐 GOOGLE OAUTH (From Google Cloud Console -> Credentials)
# =============================================================
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 6. 🚀 Database Sync & Verification Steps

Once your `.env` is saved with your Supabase `DATABASE_URL`:

### Step 6.1: Push Database Schema to Supabase
Run the following command in your PowerShell/terminal to automatically create all tables (`User`, `Invitation`, `Order`, `GuestMessage`):

```bash
# Push schema to Supabase Postgres
npx prisma db push

# Generate Prisma types
npx prisma generate
```

### Step 6.2: Verify the Full End-to-End Funnel
1. Start your local dev server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000/templates](http://localhost:3000/templates).
3. Pick any template (e.g. **Kitab-e-Nikah** or **Emerald Qasr**) and click **Try Free**.
4. Fill out the 5-step form with your names, date, venue, and click **✨ Generate Free Live Demo**.
5. Test the interactive live demo at `http://localhost:3000/preview/[slug]`.
6. Click **Unlock Website (₹1,499)** -> Complete the Razorpay test payment (select NetBanking / Success or UPI test).
7. Notice the confetti explosion 🎉 and instant unlock to your pristine live link at `http://localhost:3000/[slug]`.
