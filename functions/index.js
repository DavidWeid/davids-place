import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { handler } from '../dist/server/entry.mjs';

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Export the server function using Firebase Functions v2
export const server = onRequest(
  {
    memory: '1GiB',
    timeoutSeconds: 60,
  },
  async (req, res) => {
    try {
      // Astro handler expects standard HTTP req/res objects
      return await handler(req, res);
    } catch (error) {
      console.error('Function error:', error);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  },
);
