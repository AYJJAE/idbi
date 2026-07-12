import { streamText, Message } from 'ai';
import { getModel, isAIEnabled } from '@/services/ai/client';
import { getSystemPrompt } from '@/services/ai/providers';

export const maxDuration = 30;

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages, data }: { messages: Message[], data: any } = await req.json();

  if (!isAIEnabled()) {
    // Return a mock streamed response formatted for the Vercel AI SDK
    const mockMessage = "AI integration disabled in the public repository.\n\nAdd your Gemini API key in the environment configuration to enable AI-powered insights.";
    // Vercel AI SDK expects `0:"message"\n` stream format for text parts.
    return new Response(
      `0:${JSON.stringify(mockMessage)}\n`, 
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const systemPrompt = getSystemPrompt(data);

  const result = await streamText({
    model: getModel(),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
