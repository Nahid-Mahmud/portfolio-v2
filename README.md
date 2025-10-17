# Md. Nahid Mahmud - Fullstack Developer Portfolio 🌟

Welcome to the source code of my personal portfolio website! This project showcases my skills, experience, and projects as a **Fullstack Developer**. Explore my journey, tech stack, and featured projects.

🌐 **Live Website**: [nahid-mahmud.xyz](https://nahid-mahmud.xyz)

## 🚀 Features

- **About Me**: Learn about my journey and expertise.
- **Skills Section**: Explore my tech stack categorized into frontend, backend, and tools.
- **Projects**: A showcase of my recent work, personal projects, and collaborations.
- **Professional Experience**: A detailed overview of my career and achievements.
- **Blogs**: Read my latest blog posts about web development, tutorials, and insights.
- **Photo Gallery**: View and manage a collection of photos.
- **Contact Form**: Get in touch with me directly or connect via social media.
- **AI Chat Bot**: Interactive AI-powered chat to ask questions about my portfolio and expertise.
- **Authentication System**: Secure login, password reset, and user management.
- **Dashboard**: Admin panel for managing blogs, projects, and photos.
- **Dark Mode**: A seamless light/dark mode experience.
- **Responsive Design**: Optimized for all devices and screen sizes.
- **SEO Optimized**: Enhanced with meta tags, Open Graph, and Twitter cards for better visibility.

## 🛠️ Tech Stack

This portfolio is built with modern web technologies:

- **Frontend**: React 19, Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide React, Shadcn/ui
- **Forms & Validation**: React Hook Form, Zod
- **Markdown & Content**: React Markdown, Remark, MDX Editor, Highlight.js
- **Backend**: Node.js, Next.js API Routes, Server Actions
- **Database**: External API integration (MongoDB via backend)
- **Authentication**: Custom auth with cookies and JWT
- **Email**: Nodemailer
- **AI Integration**: OpenAI via OpenRouter
- **Image Processing**: Sharp
- **Styling**: Tailwind CSS, PostCSS, CSS-in-JS
- **Tools**: ESLint, TypeScript, Next Themes, Sonner (toasts), Driver.js (tours)
- **Deployment**: VPS Hosting, CI/CD with GitHub Actions

## 📂 Project Structure

```plaintext
.
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (auth)/        # Authentication pages (login, forgot/reset password)
│   │   ├── (commonLayout)/ # Public pages (home, about, blogs, contact, experience, projects)
│   │   ├── (dashboard)/   # Admin dashboard (blogs, projects management)
│   │   ├── api/           # API routes (ask-ai, blogs, photos, send-email)
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Shadcn/ui components
│   │   └── dashboard/     # Dashboard-specific components
│   ├── actions/           # Server actions (auth, blog, project, user)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configurations
│   ├── types/             # TypeScript type definitions
│   ├── data/              # Static data files
│   ├── docs/              # Blog markdown files
│   ├── service/           # Service functions (cookies, logout)
│   └── utils/             # Helper utilities
├── public/                # Public assets (robots.txt, images)
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 📚 Environment Variables

To run this project, you need to set up the following environment variables in a `.env.local` file:

```plaintext
OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY
NODEMAILER_PASSWORD=YOUR_GOOGLE_APP_PASSWORD
NODEMAILER_EMAIL=YOUR_EMAIL_ADDRESS
SEND_TO_EMAIL=RECIPIENT_EMAIL_ADDRESS
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL
SITE_URL=https://nahid-mahmud.xyz
SITE_NAME=Portfolio - Md. Nahid Mahmud
```

Replace the placeholders with your actual credentials.

## 📬 Contact Me

Feel free to reach out if you'd like to collaborate or have any questions!

- **Email**: [nahidmahmudn@gmail.com](mailto:nahidmahmudn@gmail.com)
- **LinkedIn**: [Md. Nahid Mahmud](https://www.linkedin.com/in/md-nahid-mahmud/)
- **GitHub**: [Nahid-Mahmud](https://github.com/Nahid-Mahmud)

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- npm, yarn, or pnpm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Nahid-Mahmud/portfolio-v2.git
   cd portfolio-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create a `.env.local` file in the root directory and add the required environment variables.
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. Open your browser at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 📜 License

This project is licensed under the [MIT License](LICENSE).

🌐 **Live Website**: [nahid-mahmud.xyz](https://nahid-mahmud.xyz/)

Thank you for visiting my portfolio! 😊
