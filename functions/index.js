import functions from 'firebase-functions';
import { handler } from '../dist/server/entry.mjs';

// Export the server function using Firebase Functions v1
export const server = functions
  .region('us-east1')
  .https.onRequest(async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error('Function error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
