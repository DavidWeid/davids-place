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
  // Check if we're in a Firebase/Cloud Run environment
  const isCloudRun = process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.FIREBASE_CONFIG;
  const isProd = import.meta.env.PROD;
  
  if (isProd || isCloudRun) {
    console.info('Cloud environment detected. Trying default initialization first.');
    try {
      // In Cloud Run/Firebase hosting, try default initialization
      return initializeApp();
    } catch (error) {
      console.error('Default initialization failed, trying with explicit project ID:', error);
      try {
        // Fallback: try with just project ID (Cloud Run should have default credentials)
        return initializeApp({
          projectId: 'davids-place-portfolio'
        });
      } catch (secondError) {
        console.error('Project ID initialization also failed:', secondError);
        // Last fallback to service account
        console.info('Attempting service account fallback...');
      }
    }
  } else {
    console.info('Local development detected.');
  }
  
  console.info('Using service account credentials.');
  
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
    console.error('Service account initialization failed:', error);
    throw error;
  }
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];
