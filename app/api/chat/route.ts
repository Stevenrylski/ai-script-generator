import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, topic, tone, platform } = await req.json();

    // Get the IP address of the user
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate limit the request
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }

    // Create the system message based on the selected options
    const systemMessage = {
      role: 'system',
      content: `You are a professional content writer. Generate content for ${platform} with a ${tone} tone about ${topic}. 
      Make the content engaging, informative, and optimized for the selected platform.`,
    };

    // Create the chat completion
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      stream: true,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    
    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat route:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
} 