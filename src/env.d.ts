interface ImportMetaEnv {
  readonly FIREBASE_PRIVATE_KEY_ID: string;
  readonly FIREBASE_PRIVATE_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_CLIENT_EMAIL: string;
  readonly FIREBASE_CLIENT_ID: string;
  readonly FIREBASE_AUTH_URI: string;
  readonly FIREBASE_TOKEN_URI: string;
  readonly FIREBASE_AUTH_CERT_URL: string;
  readonly FIREBASE_CLIENT_CERT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface UserRecord {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime?: string;
    lastRefreshTime?: string;
  };
  providerData: Array<{
    UserInfo: {
      uid: string;
      displayName: string;
      email: string;
      photoURL?: string;
      providerId: string;
      phoneNumber?: string;
    };
  }>;
  tokensValidAfterTime?: string;
}
