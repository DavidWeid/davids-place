import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { handler } from '../dist/server/entry.mjs';

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Export the server function
export const server = onRequest(async (req, res) => {
  return handler(req, res);
});
