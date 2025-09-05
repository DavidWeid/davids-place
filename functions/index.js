import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import express from 'express';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Create Express app
const app = express();

// Serve static client assets from dist/client
app.use(express.static('../dist/client'));

// Use the Astro SSR handler for all other routes
app.use(ssrHandler);

// Export the server function using Firebase Functions v2
export const server = onRequest(
  {
    memory: '1GiB',
    timeoutSeconds: 60,
  },
  app,
);
