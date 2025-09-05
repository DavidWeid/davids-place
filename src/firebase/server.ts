import type { ServiceAccount } from 'firebase-admin';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const activeApps = getApps();
const getServiceAccount = () => {
  // Only create service account if we have the required environment variables
  if (!import.meta.env.FIREBASE_PRIVATE_KEY || !import.meta.env.FIREBASE_PROJECT_ID || !import.meta.env.FIREBASE_CLIENT_EMAIL) {
    return null;
  }
  
  return {
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
  } as const;
};

const initApp = () => {
  // Check if we're in a Firebase/Cloud Run environment
  const isCloudRun = process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.FIREBASE_CONFIG;
  const isProd = import.meta.env.PROD;
  
  // Try cloud environment initialization first
  if (isProd || isCloudRun) {
    console.info('Cloud environment detected. Using default Firebase credentials.');
    try {
      // In Cloud Run/Firebase hosting, use default initialization
      return initializeApp();
    } catch (error) {
      console.error('Default Firebase initialization failed in cloud environment:', error);
      // Fall through to service account as last resort
    }
  }
  
  // Local development or cloud fallback - use service account
  console.info('Using service account credentials for Firebase initialization.');
  
  const serviceAccount = getServiceAccount();
  if (!serviceAccount) {
    throw new Error('Firebase initialization failed: Missing required environment variables (FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL)');
  }
  
  try {
    return initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.error('Service account initialization failed:', error);
    throw error;
  }
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
