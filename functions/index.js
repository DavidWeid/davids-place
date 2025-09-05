import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import express from 'express';
import { handler } from '../dist/server/entry.mjs';

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Create Express app
const app = express();

// Handle all routes with Astro handler
app.use(async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Astro handler error:', error);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
});

// Export the server function using Firebase Functions v2
export const server = onRequest(
  {
    memory: '1GiB',
    timeoutSeconds: 60,
  },
  app,
);
