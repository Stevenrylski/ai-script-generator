# AI Content Generator

A modern, production-ready AI content generator built with Next.js 14, TypeScript, and OpenAI's GPT-4.

## Features

- 🎯 User-friendly interface for content generation
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Real-time streaming responses
- 🔒 Rate limiting for API protection
- 📋 Copy-to-clipboard functionality
- 🎨 Beautiful UI with shadcn/ui components

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- shadcn/ui components
- OpenAI GPT-4
- Upstash Redis (for rate limiting)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-content-generator.git
cd ai-content-generator
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.local.example .env.local
```

4. Update the environment variables in `.env.local` with your:
   - OpenAI API key
   - Upstash Redis credentials (for rate limiting)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy this application is using Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key
- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token

## License

MIT 