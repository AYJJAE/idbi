// =============================================================================
// NEXUS — AI Client Configuration
// =============================================================================

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { AI_CONFIG } from './config';

// Initialize the generic AI client instance.
// In a public repository, the API key must be provided via the environment.
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '';

export const google = createGoogleGenerativeAI({
  apiKey,
});

export const getModel = (modelName = AI_CONFIG.defaultModel) => {
  return google(modelName);
};

export const isAIEnabled = () => {
  if (AI_CONFIG.isDisabled) return false;
  if (!apiKey) return false;
  return true;
};
