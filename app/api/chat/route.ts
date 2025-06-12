import { Configuration, OpenAIApi } from 'openai-edge';
import { NextResponse } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  console.log('API route hit - POST request received');
  
  try {
    const { topic, platform, tone } = await req.json();
    console.log('Request body:', { topic, platform, tone });

    if (!topic || !platform || !tone) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Sending request to OpenAI...');
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional content writer. Generate content for ${platform} with a ${tone} tone about ${topic}. Make the content engaging, informative, and optimized for the selected platform.`
        }
      ],
    });

    console.log('OpenAI response received');
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return NextResponse.json(
        { error: data.error?.message || 'Failed to generate content' },
        { status: response.status }
      );
    }

    const content = data.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in response');
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      );
    }

    console.log('Returning content');
    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 