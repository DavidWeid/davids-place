# Firebase Hosting with Astro SSR Deployment

This document explains how Firebase hosting and Server-Side Rendering (SSR) deployment works in this Astro project using the Node.js adapter as middleware.

## Project Overview

This is an Astro project configured for SSR deployment to Firebase Hosting with authentication features. The setup includes:

- **Framework**: Astro v5.12.0 with SSR (`output: 'server'`)
- **Adapter**: `@astrojs/node` in middleware mode
- **Hosting**: Firebase Hosting with web frameworks support
- **Authentication**: Firebase Auth with session-based authentication

## Architecture Components

### 1. Astro Configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
  output: 'server',           // Enable SSR mode
  adapter: node({
    mode: 'middleware',       // Use Node.js as middleware
  }),
  site: 'https://davids-place-portfolio.web.app/',
  // ... other config
});
```

Key configurations:
- **Server-side rendering** enabled with `output: 'server'`
- **Node adapter** in middleware mode allows Firebase to handle routing
- **Site URL** configured for Firebase hosting domain

### 2. Firebase Configuration (`firebase.json`)

```json
{
  "hosting": {
    "source": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "frameworksBackend": {
      "region": "us-east1"
    }
  }
}
```

- Uses Firebase's **web frameworks** integration
- Automatically detects and deploys the Astro SSR application
- Server functions deployed to **us-east1** region

### 3. Firebase Client Setup (`src/firebase/client.ts`)

Initializes Firebase for client-side operations:
- **Firebase app** initialization with project configuration
- **Analytics** setup for tracking
- Used by client-side authentication flows

### 4. Firebase Server Setup (`src/firebase/server.ts`)

Handles server-side Firebase Admin SDK:
- **Environment-aware** initialization (prod vs dev)
- In production: Uses default Firebase hosting credentials
- In development: Uses service account from environment variables
- **Singleton pattern** to prevent multiple app initializations

### 5. Authentication System

#### API Routes (`src/pages/api/auth/`)

**Registration** (`register.ts`):
- Creates new users with Firebase Admin SDK
- Accepts form data (email, password, name)
- Redirects to sign-in page on success

**Sign In** (`signin.ts`):
- Verifies ID tokens from client-side auth
- Creates **session cookies** (5-day expiration)
- Uses Firebase session management for SSR compatibility

**Sign Out** (`signout.ts`):
- Clears session cookies
- Redirects to sign-in page

#### SSR Pages

**Sign In Page** (`src/pages/signin.astro`):
- Server-side: Checks existing session and redirects if authenticated
- Client-side: Handles form submission with Firebase Auth
- **Hybrid approach**: Server handles routing, client handles authentication

**Registration Page** (`src/pages/register.astro`):
- Simple form that posts to `/api/auth/register`
- No client-side authentication logic

**Dashboard Page** (`src/pages/dashboard.astro`):
- **Protected route**: Checks session cookie server-side
- Verifies session with Firebase Admin SDK
- Displays user information and sign-out option

## Deployment Workflow

### GitHub Actions Integration

Two automated workflows handle deployment:

#### Production Deployment (`.github/workflows/firebase-hosting-merge.yml`)
- **Trigger**: Push to `main` branch
- **Process**:
  1. Install dependencies (`npm ci`)
  2. Build Astro project (`npm run build`)
  3. Deploy to Firebase hosting live channel
- **Environment**: `FIREBASE_CLI_EXPERIMENTS=webframeworks`

#### Preview Deployment (`.github/workflows/firebase-hosting-pull-request.yml`)
- **Trigger**: Pull request creation
- **Process**:
  1. Install dependencies (`npm ci`)
  2. Build Astro project (`npm run build`)
  3. Deploy to Firebase hosting preview channel
- **Features**: Automatic preview URLs in PR comments

### Build Process

The build command (`npm run build`) executes:
1. **Type checking** with `astro check`
2. **Build process** with `astro build`
3. **Output**: Server-ready middleware for Firebase hosting

## Authentication Flow

### Sign-In Process
1. User submits credentials on sign-in page
2. **Client-side**: Firebase Auth authenticates user
3. **ID token** obtained from successful authentication
4. **Server request**: Token sent to `/api/auth/signin`
5. **Session cookie** created and set by server
6. **Redirect** to dashboard

### Session Management
- **Server-side rendering** uses session cookies for authentication
- **Session verification** happens on each protected page load
- **5-day expiration** for session cookies
- **Automatic redirect** for unauthenticated users

### Protected Routes
- Dashboard and other protected pages check session server-side
- **Session cookie** verified with Firebase Admin SDK
- **User data** fetched for personalization
- **Redirect to sign-in** if session invalid

## Key Features

### SSR Benefits
- **SEO-friendly** server-rendered pages
- **Fast initial page load** with server-side data
- **Session-based authentication** compatible with SSR
- **Protected routes** handled server-side

### Firebase Integration
- **Scalable hosting** with CDN
- **Automatic HTTPS** and custom domain support
- **Authentication service** with session management
- **Admin SDK** for server-side operations

### Development Experience
- **Hot reload** in development mode
- **Type checking** integrated in build process
- **Automated deployment** with GitHub Actions
- **Preview deployments** for testing

## Environment Variables (Development)

Required for local development:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_CERT_URL`
- `FIREBASE_CLIENT_CERT_URL`

Production deployments use Firebase's built-in service account credentials.

## Files Structure

```
src/
├── firebase/
│   ├── client.ts          # Client-side Firebase setup
│   └── server.ts          # Server-side Firebase Admin setup
├── pages/
│   ├── api/auth/
│   │   ├── register.ts    # User registration API
│   │   ├── signin.ts      # Sign-in API with session creation
│   │   └── signout.ts     # Sign-out API
│   ├── dashboard.astro    # Protected dashboard page
│   ├── register.astro     # Registration form page
│   └── signin.astro       # Sign-in form page
.github/workflows/
├── firebase-hosting-merge.yml        # Production deployment
└── firebase-hosting-pull-request.yml # Preview deployment
```

This setup provides a robust, scalable SSR application with Firebase authentication deployed automatically through GitHub Actions.