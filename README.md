# NEXUS Financial Intelligence Engine

NEXUS is an enterprise-grade financial health intelligence platform designed for MSMEs.

## Setup and Installation

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run the development server: \`npm run dev\`
4. Open [http://localhost:3000](http://localhost:3000)

## AI Configuration

The application features advanced AI integration powered by Google Gemini. For security and open-source compliance, the live AI integration is disabled by default until you configure it.

### Enabling AI Insights
To reconnect the AI functionality:

1. Obtain a **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).
2. Create a \`.env.local\` file in the root directory (you can copy the provided \`.env.example\` file):
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
3. Add your key to the environment variables:
   \`\`\`env
   GEMINI_API_KEY=your_actual_api_key_here
   \`\`\`
4. Restart the development server.

### AI Architecture
The AI integration is modularized inside \`src/services/ai/\`:
- **\`config.ts\`**: Configuration flags (e.g., \`NEXT_PUBLIC_DISABLE_AI\`) and model selection.
- **\`client.ts\`**: The Gemini client initialization.
- **\`providers.ts\`**: Reusable placeholder prompt templates. You can customize these prompts to tailor the AI responses to your specific data models.

## Deployment

### Vercel Deployment
NEXUS is optimized for Vercel. 
1. Push your code to GitHub.
2. Import the repository in your Vercel dashboard.
3. In the Vercel project settings, add the `GEMINI_API_KEY` environment variable.
4. Deploy.

If you wish to deploy the application publicly *without* enabling the live AI for visitors, you can set the environment variable `NEXT_PUBLIC_DISABLE_AI=true`. This will gracefully fall back to a mock message across all AI panels.

## Author
Developed by [AYJJAE](https://github.com/AYJJAE)
