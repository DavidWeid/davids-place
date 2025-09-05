import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import express from 'express';
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Create Express app
const app = express();

// Serve static client assets with correct path
const clientPath = path.join(__dirname, '../dist/client');
app.use(express.static(clientPath));

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Use the Astro SSR handler for all other routes
app.use(ssrHandler);

// Export the server function using Firebase Functions v2
export const server = onRequest(
  {
    memory: '1GiB',
    timeoutSeconds: 120,
    concurrency: 1000,
  },
  app,
);
