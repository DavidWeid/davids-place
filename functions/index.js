const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');

// Set global options
setGlobalOptions({
  region: 'us-east1',
});

// Import the Astro SSR handler
const handler = require('../dist/server/entry.mjs');

// Export the server function
exports.server = onRequest(async (req, res) => {
  return handler.handler(req, res);
});
