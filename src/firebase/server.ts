import type { ServiceAccount } from 'firebase-admin';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const activeApps = getApps();
const serviceAccount = {
  type: 'service_account',
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

const initApp = () => {
  // Check if we're in a Firebase hosting environment or production
  const isFirebaseHosting = import.meta.env.PROD || process.env.FUNCTION_TARGET || process.env.FIREBASE_CONFIG;
  
  if (isFirebaseHosting) {
    console.info('Firebase hosting environment detected. Using default service account.');
    try {
      // Use default config in firebase functions. Should be already injected in the server by Firebase.
      return initializeApp();
    } catch (error) {
      console.error('Failed to initialize Firebase with default config:', error);
      // Fallback to service account if default initialization fails
      console.info('Attempting fallback to service account initialization...');
    }
  }
  
  console.info('Loading service account from env variables.');
  
  // Validate required environment variables
  const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  try {
    return initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.error('Failed to initialize Firebase with service account:', error);
    throw error;
  }
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
