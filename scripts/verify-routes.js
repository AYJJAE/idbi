/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');

const ROUTES_TO_TEST = [
  '/',
  '/business/profile',
  '/business/onboarding',
  '/business/passport',
  '/intelligence/health-card',
  '/intelligence/revenue',
  '/intelligence/cash-flow',
  '/intelligence/compliance',
  '/intelligence/payments',
  '/intelligence/workforce',
  '/intelligence/banking-score',
  '/data-sources/gst',
  '/data-sources/upi',
  '/data-sources/aggregator',
  '/data-sources/epfo',
  '/data-sources/bank-statements',
  '/data-sources/documents',
  '/credit/eligibility',
  '/credit/readiness',
  '/credit/simulator',
  '/credit/recommendations',
  '/insights/timeline',
  '/insights/risk-radar',
  '/insights/benchmarks',
  '/insights/reports',
  '/admin/users',
  '/admin/roles',
  '/admin/audit-logs',
  '/admin/integrations',
  '/admin/settings'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      // Any 200-series status code is good
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`[PASS] ${route} (HTTP ${res.statusCode})`);
        resolve(true);
      } else {
        console.error(`[FAIL] ${route} (HTTP ${res.statusCode})`);
        resolve(false);
      }
      // Consume response data to free up memory
      res.on('data', () => {});
    }).on('error', (err) => {
      console.error(`[ERROR] ${route} - ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Starting automated route verification audit...');
  let failures = 0;

  for (const route of ROUTES_TO_TEST) {
    const success = await checkRoute(route);
    if (!success) {
      failures++;
    }
  }

  console.log('\n--- AUDIT COMPLETE ---');
  if (failures === 0) {
    console.log('✅ ALL ROUTES PASSED. Zero broken pages found.');
    process.exit(0);
  } else {
    console.error(`❌ FAILED. Found ${failures} broken route(s).`);
    process.exit(1);
  }
}

run();
