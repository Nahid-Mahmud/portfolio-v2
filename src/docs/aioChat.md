A powerful Next.js-based AI chatbot application with support for multiple AI models and contextual conversations.

## Key Features

- **Multiple AI Models**: Choose from various AI models including Meta's Llama 3.2, Google's LearnLM, Qwen2.5, and more
- **Context Management**: Create, edit, and manage conversation contexts for more targeted AI responses
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing
- **Markdown Support**: AI responses render with rich markdown formatting including code blocks, lists, and more

## Tech Stack

- **Frontend**: Next.js 15.3 with React 19
- **Styling**: TailwindCSS 4.0
- **State Management**: Redux with Redux Persist
- **UI Components**: ShadCn
- **Code Highlighting**: React Syntax Highlighter
- **Theme Management**: next-themes
- **Notifications**: react-toastify

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.


# Environment Configuration

This project requires some environment variables to be set up for proper functionality, particularly for API connectivity.

## Required Environment Variables

Create a .env.local file in your project root with the following variables:

```bash
# Base URL for backend API (just put anything for now)
NEXT_PUBLIC_BASE_URL="your-backend-url"

# OpenRouter API Key for AI model access
# Get your API key from https://openrouter.ai/
NEXT_PUBLIC_OPENROUTER_API_KEY="your-openrouter-api-key"
```

## Getting an OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Create an account or sign in
3. Navigate to your API settings
4. Generate a new API key
5. Copy the key to your .env.local file

## Important Security Note

- Never commit your .env.local file to version control
- The .env.local file is already included in .gitignore
- For production deployment, set these environment variables in your hosting platform (Vercel, Netlify, etc.)

## Model Availability

The available AI models in the application are provided through OpenRouter's API. Different models may have different usage tiers and costs. Refer to the OpenRouter documentation for current model availability and pricing.

## Project Structure

The project follows a standard Next.js App Router architecture:

```
src/
├── app/             # Next.js app router pages
├── components/      # React components
│   ├── chat/        # Chat-related components
│   ├── context/     # Context management components
│   ├── layout/      # Layout components (sidebar, navigation)
│   ├── providers/   # React providers
│   └── ui/          # UI components
├── redux/           # Redux store and slices
│   └── features/    # Redux slices for different features
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Usage

1. **Select an AI Model**: Choose from different AI models using the dropdown in the header
2. **Select or Create a Context**: Choose an existing context or create a new one
3. **Send Messages**: Type your message and press Enter or click the send button
4. **View AI Responses**: AI responses will appear with proper markdown formatting

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
