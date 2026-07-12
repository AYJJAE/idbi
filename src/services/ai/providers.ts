// =============================================================================
// NEXUS — AI Prompt Providers (Placeholders)
// =============================================================================

// Reusable placeholder prompt templates.
// Actual proprietary prompt engineering should be configured privately or fetched from a secure database.

export const PROMPTS = {
  BUSINESS_SUMMARY: `
You are a Financial Analysis AI.
Based on the provided context, generate an executive summary for this business including Overview, Financial Position, Revenue Performance, Cash Flow Summary, and Compliance Overview.
`,
  RISK_ANALYSIS: `
You are a Risk Assessment AI.
Analyze the provided Risk Radar data. Explain why this business has its current risk level. What are the supporting metrics? Recommend immediate actions to mitigate the highest vulnerability.
`,
  RECOMMENDATION: `
You are a Strategic Advisory AI.
Based on the provided metrics, recommend actionable steps for the business to improve its financial health, optimize cash flow, and reduce risk.
`,
  HEALTH_CARD: `
You are a Financial Intelligence AI.
Explain why this business has its current Financial Health Score. What are the key drivers pulling it up or down? What is the impact on its overall stability?
`
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSystemPrompt = (data: any) => {
  return `
You are an AI assistant. Use the provided context to answer the user's prompt.

CURRENT BUSINESS CONTEXT:
\`\`\`json
${JSON.stringify(data?.currentBusiness || {}, null, 2)}
\`\`\`

FINANCIAL METRICS CONTEXT:
\`\`\`json
${JSON.stringify(data?.financialData || {}, null, 2)}
\`\`\`

CREDIT & RISK CONTEXT:
\`\`\`json
${JSON.stringify(data?.creditInsightsData || {}, null, 2)}
\`\`\`
`;
};
