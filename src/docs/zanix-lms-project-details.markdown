# Zanix LMS - Full Stack Learning Management System

## Overview

Zanix LMS is a robust, full-stack Learning Management System (LMS) designed to deliver a seamless online education experience. It supports multiple user roles—students, instructors, administrators, moderators, and super admins—enabling course creation, management, enrollment, and interactive learning. The frontend is built with **Next.js**, **React**, and **TypeScript**, ensuring a responsive and intuitive user interface. The backend, powered by **Node.js**, **Express**, **TypeScript**, and **MongoDB**, provides secure APIs, data management, and scalable services. Key features include video content integration, mock payment processing, email notifications, and analytics, making it a comprehensive solution for educational platforms.

This project showcases full-stack development expertise, integrating modern web technologies, secure authentication, and optimized performance for a production-ready LMS.

## Features

### Core Functionality

- **User Authentication & Authorization**: Secure sign-up, sign-in, password reset, OTP verification, and JWT-based role-based access control.
- **Role-Based Dashboards**: Customized interfaces for students (course browsing, progress tracking), instructors (course creation, student monitoring), administrators (user and course management), moderators (content moderation), and super admins (system oversight).
- **Course Management**: Create, edit, publish, and manage courses with rich content, including thumbnails and intro videos.
- **Video Content Management**: Upload and manage video lessons with YouTube integration and Cloudinary storage for seamless streaming.
- **MDX Editor**: Rich text editing for course descriptions and content using a custom MDX processor.
- **File Uploads**: Support for course thumbnails, profile pictures, and video files via Cloudinary.
- **Mock Payment System**: Simulated payment processing for testing, with invoice generation and email delivery.
- **Email Notifications**: Automated emails for OTP verification, invoices, and course updates using Nodemailer and Redis-based job queues.
- **Analytics & Statistics**: Comprehensive dashboards for user, course, enrollment, and revenue analytics.
- **Responsive Design**: Mobile-first design with Tailwind CSS for a consistent experience across devices.

### User Roles & Permissions

- **Students**: Browse and enroll in courses, access learning materials, track progress, and manage profiles.
- **Instructors**: Create and manage courses, upload videos, monitor student progress, and view course statistics.
- **Administrators**: Oversee users, courses, and system settings, with access to detailed analytics.
- **Moderators**: Manage content moderation and assist with user queries.
- **Super Admins**: Full system control, including user and role management.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Redux Toolkit, RTK Query
- **Forms**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Markdown Processing**: Custom MDX processing
- **Video Player**: React Player
- **Build Tool**: Turbopack (via Next.js)
- **Package Manager**: pnpm

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis (v6+)
- **Authentication**: JWT, Passport.js
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Job Queues**: BullMQ
- **Validation**: Zod
- **PDF Generation**: PDFKit
- **Security**: bcryptjs, CORS, Rate Limiting
- **Development**: ESLint, ts-node-dev

## Project Structure

### Frontend
```
src/
├── app/                          # Next.js app router pages
│   ├── (commonLayout)/           # Public pages (home, courses, auth)
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── admin-dashboard/      # Admin-specific pages
│   │   ├── instructor-dashboard/ # Instructor pages
│   │   ├── student-dashboard/    # Student pages
│   │   └── moderator-dashboard/  # Moderator pages
│   └── globals.css               # Global styles
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── home/                     # Homepage sections
│   └── ...                       # Other components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── redux/                        # Redux store and features
│   └── features/                 # RTK Query APIs
├── utils/                        # Helper utilities
└── wrapper/                      # Layout wrappers
```

### Backend
```
src/
├── controllers/                  # Request handlers
├── models/                       # Mongoose models (User, Course, etc.)
├── routes/                       # Express routes
├── services/                     # Business logic
├── middleware/                   # Authentication, validation, etc.
├── utils/                        # Helper utilities
├── jobs/                         # BullMQ job queues
├── templates/                    # Email templates
└── docs/                         # API and feature documentation
```

## Installation

### Frontend
1. **Clone the repository**:
   ```bash
   git clone <frontend-repository-url>
   cd zanix-lms-frontend
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_config
   ```
4. **Run the development server**:
   ```bash
   pnpm dev
   ```
5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

### Backend
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nahid-Mahmud/Znanix-LMS-Backend.git
   cd Zanix-LMS-Backend
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env` file:
   ```bash
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/zanix-lms
   REDIS_HOST=localhost
   REDIS_PORT=6379
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ACCESS_TOKEN_JWT_SECRET=your-access-token-secret
   REFRESH_TOKEN_JWT_SECRET=your-refresh-token-secret
   SUPER_ADMIN_EMAIL=admin@zanixlms.com
   SUPER_ADMIN_PASSWORD=your-super-admin-password
   ```
4. **Start MongoDB and Redis**:
   ```bash
   mongod
   redis-server
   ```
5. **Start the development server**:
   ```bash
   pnpm run dev
   ```

## Usage

- **Development**: Run `pnpm dev` for both frontend and backend to start development servers (`http://localhost:3000` for frontend, `http://localhost:5000` for backend).
- **Key Pages**:
  - **Home**: Landing page with featured courses and stats.
  - **Courses**: Browse and view course details.
  - **Authentication**: Sign-in/up with validation.
  - **Dashboards**: Role-specific interfaces for content and user management.
  - **Profile**: User profile management with image uploads.
  - **Checkout**: Mock payment flow for course purchases.
- **Production**: Use `pnpm build` and `pnpm start` for optimized deployment.

## API Integration

The frontend communicates with the backend via RESTful APIs for:
- User authentication and management
- Course and module CRUD operations
- Video content management
- Mock payment processing
- File uploads to Cloudinary
- Analytics and progress tracking

### Key API Endpoints
| Method | Endpoint                                      | Description                   | Access            |
| ------ | --------------------------------------------- | ----------------------------- | ----------------- |
| POST   | `/api/v1/auth/login`                          | User login                    | Public            |
| POST   | `/api/v1/user/register`                       | Register new user             | Public            |
| POST   | `/api/v1/courses/create`                      | Create new course             | Instructor/Admin  |
| POST   | `/api/v1/payments/init-payment/:courseId`     | Initialize payment            | Student           |
| GET    | `/api/v1/stats/dashboard`                     | Dashboard statistics           | Admin/Super Admin |
| PATCH  | `/api/v1/user-courses/enrollment/:enrollmentId/progress` | Update course progress | Student           |

## Mock Payment System

The backend includes a mock payment system for development and testing:
- **Features**: Simulates payment initiation, success/failure, invoice generation, and email delivery.
- **Flow**:
  1. Student initiates payment for a course.
  2. Redirects to a mock payment page.
  3. Updates payment status and creates enrollment.
  4. Generates and emails a PDF invoice.
- **Integration**: Frontend integrates via `/api/v1/payments` endpoints (see `docs/mock-payment-guide.md`).
- **Production**: Designed for seamless transition to real gateways like Stripe or PayPal.

## Data Models

- **User**: Stores name, email, password, role, profile image, and verification status.
- **Course**: Includes title, description, price, thumbnail, intro video, and modules.
- **Course Module**: Organizes course content with title, description, and videos.
- **Module Video**: Manages video content with title, description, and Cloudinary URL.
- **Payment**: Tracks transaction ID, amount, status, and course enrollment.
- **User Courses**: Manages enrollments, progress, and completion status.

## Development Highlights

- **Type Safety**: TypeScript ensures robust code on both frontend and backend.
- **Modular Architecture**: MVC pattern for backend, component-based structure for frontend.
- **Optimized Performance**: Dynamic imports, skeleton loading, and Turbopack for faster builds.
- **Security**: JWT authentication, rate limiting, input validation, and bcrypt for passwords.
- **Scalability**: Redis for caching and job queues, MongoDB for flexible data storage.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

### Guidelines
- Follow TypeScript and ESLint standards.
- Write tests for new features.
- Update documentation for API changes.
- Use meaningful commit messages.

## Documentation

- **Frontend**: Project structure, setup, and usage in `README.md`.
- **Backend**: Comprehensive guides in `docs/`:
  - `mock-payment-guide.md`: Payment integration.
  - `fileUploadGuide.md`: File upload details.
  - `email-queue-guide.md`: Email and queue processing.
  - `stats-api-documentation.md`: Analytics APIs.
  - `implementation-summary.md`: System overview.

## License

Licensed under the MIT License. See the `LICENSE` file for details.

## Support

- Check `docs/` for detailed guides.
- Open issues on the repository for bugs or questions.
- Contact maintainers for direct assistance.

This project showcases my ability to build a full-stack, scalable, and feature-rich LMS, integrating modern web technologies with secure and efficient backend services, ready for portfolio display.