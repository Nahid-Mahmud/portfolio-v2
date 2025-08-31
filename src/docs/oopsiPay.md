# OopsiPAY - Digital Wallet and Payment Platform

**OopsiPAY** is a full-stack digital wallet and payment management system designed to provide secure, efficient, and user-friendly financial transaction capabilities. The platform supports features like cash-in, cash-out, send money, and admin credit, with role-based access control for users, agents, admins, and super admins. The frontend is built with **React**, **TypeScript**, and **Vite**, while the backend leverages **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. This document provides a comprehensive overview of the project, combining details from both the frontend and backend for portfolio presentation.

## 🌟 Project Overview

OopsiPay is a Single Page Application (SPA) with a robust backend API, offering a seamless user experience for managing digital wallets and financial transactions. The platform supports secure authentication, real-time transaction processing, and comprehensive admin analytics, making it suitable for users, agents, and administrators.

### Key Features
- **Authentication**: Secure login, registration, password reset, and email OTP verification.
- **Wallet Management**: Create and manage digital wallets for users, agents, and admins.
- **Financial Transactions**:
  - **Cash In**: Add funds to wallets (0% fee).
  - **Cash Out**: Withdraw funds (1.85% fee with agent commission).
  - **Send Money**: Transfer funds between users (5 Taka flat fee).
  - **Admin Credit**: Admin-initiated wallet credits (0% fee).
- **User Management**: Role-based access for Users, Agents, Admins, and Super Admins.
- **Admin Dashboard**: View all transactions, wallets, users, and analytics with server-side pagination and filtering.
- **Security**: JWT-based authentication, bcrypt password hashing, and Zod schema validation.
- **Notifications**: Email-based OTP and transaction notifications using SMTP.
- **File Upload**: Cloudinary integration for profile picture uploads.
- **Analytics**: Comprehensive statistics for users and transactions.

### Demo User Accounts
- **Admin**:
  - Email: `admin@gmaill.com`
  - Password: `Pa$$w0rd!34`
  - PIN: `12345`
  - Wallet Number: `1788386818549`
- **User1**:
  - Email: `kamla@oletters.com`
  - Password: `passwordA1@`
  - PIN: `12345`
  - Wallet Number: `5294780550752`
- **User2**:
  - Email: `user99@oletters.com`
  - Password: `Pa$$w0rd!34`
  - PIN: `12345`
  - Wallet Number: `4924478916704`
- **Agent**:
  - Email: `agent1@oletters.com`
  - Password: `passwordA1@`
  - PIN: `12345`
  - Wallet Number: `8741495266472`

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (v19) + TypeScript
- **Bundler**: Vite
- **State & API**: Redux Toolkit + RTK Query
- **Styling**: Tailwind CSS
- **Form Validation**: Zod + react-hook-form
- **Icons**: lucide-react
- **Notifications**: sonner
- **Custom Hooks**: Debouncing, authentication, and mobile responsiveness
- **UI Primitives**: Radix UI with Tailwind styling

### Backend
- **Framework**: Node.js + Express.js + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis for session management
- **Authentication**: JWT (access and refresh tokens) + Passport.js
- **Input Validation**: Zod schema validation
- **File Upload**: Cloudinary
- **Email Service**: SMTP for notifications
- **Logging**: Morgan for HTTP request logging
- **Security**: bcrypt for password hashing, rate limiting, CORS

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18 or higher
- **pnpm**: Preferred package manager (`npm install -g pnpm`)
- **MongoDB**: For database storage
- **Redis**: For caching and session management

### Frontend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nahid-Mahmud/OopsiPay-Frontend.git
   cd OopsiPay-Frontend
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=https://api.oopsipay.example.com
   VITE_ENV=development
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```
5. **Build for production**:
   ```bash
   pnpm build
   ```

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nahid-Mahmud/OopsiPay-Backend.git
   cd OopsiPay-Backend
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/digital_wallet_management
   SUPER_ADMIN_EMAIL=admin@oopsipay.com
   SUPER_ADMIN_PASSWORD=your_secure_password
   SUPER_ADMIN_PIN=123456
   SUPER_ADMIN_ADDRESS=Admin Address
   ACCESS_TOKEN_JWT_SECRET=your_access_token_secret
   ACCESS_TOKEN_JWT_EXPIRATION=1d
   REFRESH_TOKEN_JWT_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_JWT_EXPIRATION=30d
   EXPRESS_SESSION_SECRET=your_session_secret
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_PASS=your_email_password
   SMTP_USER=your_email@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_FROM=your_email@gmail.com
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_USERNAME=your_redis_username
   REDIS_PASSWORD=your_redis_password
   BCRYPT_SALT_ROUNDS=10
   ```
4. **Start the development server**:
   ```bash
   pnpm run dev
   ```
5. **Build for production**:
   ```bash
   pnpm run build
   pnpm start
   ```
   **Note**: Ensure the `templates` folder from `src/utils` is copied to `dist/utils` for production.

### API Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://api.oopsipay.example.com/api/v1`

### Postman Documentation
[View API Documentation](https://documenter.getpostman.com/view/30562539/2sB3BALsbp#intro)

## 📋 API Endpoints Summary

### Authentication (`/auth`)
- **POST** `/auth/login`: User login (email/password).
- **POST** `/auth/refresh-token`: Generate new access token.
- **POST** `/auth/logout`: Invalidate tokens.
- **PATCH** `/auth/reset-password`: Reset password using OTP.
- **PATCH** `/auth/change-password`: Change current password.
- **POST** `/auth/forgot-password`: Request OTP for password reset.

### User Management (`/user`)
- **POST** `/user/create`: Register new user.
- **PATCH** `/user/:userId`: Update user profile (with file upload).
- **GET** `/user/get-all`: Get all users (Admin/Super Admin only).
- **GET** `/user/me`: Get current user profile.
- **POST** `/user/change-pin`: Change wallet PIN.
- **GET** `/user/:userId`: Get specific user by ID (Admin/Super Admin only).

### Wallet Management (`/wallet`)
- **PATCH** `/wallet/type/:walletId`: Update wallet type (Admin/Super Admin only).
- **GET** `/wallet/me`: Get current user's wallet.
- **GET** `/wallet/get-all`: Get all wallets (Admin/Super Admin only).
- **GET** `/wallet/:userId`: Get wallet by user ID (Admin/Super Admin only).

### Transactions (`/transaction`)
- **POST** `/transaction/create`: Create transaction (Cash In/Out, Send Money).
- **GET** `/transaction/get-all`: Get all transactions (Admin/Super Admin only).
- **GET** `/transaction/my-transactions`: Get user's transaction history.
- **GET** `/transaction/:transactionId`: Get transaction details (Admin/Super Admin only).

### OTP Verification (`/otp`)
- **POST** `/otp/resend`: Resend OTP to email.
- **POST** `/otp/verify-user`: Verify user account with OTP.

### Statistics (`/stats`)
- **GET** `/stats/user`: User statistics (Admin/Super Admin only).
- **GET** `/stats/transactions`: Transaction statistics (Admin/Super Admin only).

## 🏗️ Project Structure

### Frontend
```
src/
├── components/               # Reusable UI and feature components
│   ├── ui/                   # UI primitives (Button, Input, etc.)
│   ├── layouts/              # Layout components (DashboardLayout, Navbar, etc.)
│   ├── modules/              # Feature-specific components (Admin, Wallet, etc.)
├── pages/                    # Route-level pages
│   ├── auth/                 # Login, Register, etc.
│   ├── admin/                # AllTransactions, AllWallets, etc.
│   ├── common/               # Home, About, FAQ, Contact
├── redux/                    # Redux Toolkit and RTK Query
│   ├── features/             # API slices (auth, transaction, wallet, etc.)
├── types/                    # TypeScript interfaces
├── validations/              # Zod schemas for form validation
├── hooks/                    # Custom hooks (use-debounce, withAuth, etc.)
├── lib/                      # Utility libraries (axios, utils)
├── main.tsx                  # React entry point
├── index.css                 # Global Tailwind CSS styles
├── vite.config.ts            # Vite configuration
```

### Backend
```
src/
├── app.ts                    # Express app configuration
├── server.ts                 # Server startup and database connection
├── app/
│   ├── config/               # Configurations (Cloudinary, Redis, etc.)
│   ├── constants/            # Application constants
│   ├── errorHelpers/         # Error handling utilities
│   ├── interfaces/           # TypeScript interfaces
│   ├── middlewares/          # Express middlewares (auth, validation, etc.)
│   ├── modules/              # Feature modules (auth, user, wallet, etc.)
│   ├── routes/               # Route definitions
│   ├── utils/                # Utilities (JWT, email templates, etc.)
```

## 🛡️ Security Features
- **Frontend**: Protected routes using `withAuth` HOC, debounced search inputs, and Zod form validation.
- **Backend**: JWT-based authentication (1-day access token, 30-day refresh token), bcrypt password hashing, rate limiting, CORS, and role-based access control.
- **Data Protection**: Environment variables for sensitive data, MongoDB for secure storage, and Redis for session management.

## 👥 User Roles
1. **Super Admin**: Full system access, manages all users and transactions.
2. **Admin**: Manages users and transactions, credits wallets.
3. **Agent**: Performs cash-in/cash-out, earns commissions.
4. **User**: Sends money, manages own profile and transactions.

## 📊 Deployment
- **Frontend**: Deployable as a static SPA on Vercel, Netlify, or any static hosting service.
  - **Build Command**: `pnpm build`
  - **Output Directory**: `dist`
  - **Environment Variables**: Configure `VITE_API_BASE_URL` and `VITE_ENV`.
- **Backend**: Deployable on platforms like Render or Heroku.
  - Ensure MongoDB and Redis are configured.
  - Copy `templates` folder to `dist/utils` for email functionality.
  - Set environment variables in the hosting platform.

## 🔍 Troubleshooting
- **Frontend**:
  - **TypeScript Errors**: Run `pnpm build` to check for errors.
  - **CORS Issues**: Verify `VITE_API_BASE_URL` matches backend API.
  - **Auth Issues**: Check `axiosBaseQuery.ts` for token handling.
- **Backend**:
  - **Database Connection**: Ensure `MONGO_URI` is correct.
  - **Redis Issues**: Verify `REDIS_HOST` and `REDIS_PORT`.
  - **Email Issues**: Check SMTP configuration in `.env`.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.
6. Ensure `pnpm build` and `pnpm lint` pass before submitting.

## 📄 License
Licensed under the ISC License.

**OopsiPay** - Empowering seamless and secure digital payments! 💳✨