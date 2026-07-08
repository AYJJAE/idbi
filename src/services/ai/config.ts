// =============================================================================
// NEXUS — AI Configuration Layer
// =============================================================================

export const AI_CONFIG = {
  // Flag to completely disable live AI requests
  isDisabled: process.env.NEXT_PUBLIC_DISABLE_AI === 'true',
  
  // Model configuration
  defaultModel: 'gemini-1.5-flash',
  maxDuration: 30, // seconds for streaming
  
  // Prompts are structured as templates on the backend to avoid exposing 
  // proprietary prompt engineering directly in the client code.
};
