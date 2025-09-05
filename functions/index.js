import functions from 'firebase-functions';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

// Export the astrossr function using Firebase Functions v1 (new name to avoid v2 conflict)
export const astrossr = functions
  .region('us-east1')
  .runWith({
    memory: '1GB',
    timeoutSeconds: 60,
  })
  .https.onRequest(async (req, res) => {
    try {
      await ssrHandler(req, res);
    } catch (error) {
      console.error('Astro handler error:', error);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
