import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../firebase/server';

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();

  if (!email || !password || !name) {
    return new Response('Missing form data', { status: 400 });
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    let errorMessage = 'Error creating user';

    // Handle specific Firebase Auth errors
    switch (error.errorInfo.code) {
      case 'auth/invalid-password':
        errorMessage = 'Password must at least 6 characters';
        break;

      case 'auth/invalid-email':
        errorMessage = 'Email address is improperly formatted';
        break;

      case 'auth/internal-error':
        errorMessage = 'Internal error, please try again';
        break;

      case 'auth/invalid-display-name':
        errorMessage = 'Display name is invalid';
        break;

      case 'auth/invalid-phone-number':
        errorMessage = 'Phone number must be in E.164 format';
        break;

      case 'auth/invalid-photo-url':
        errorMessage = 'Photo URL is invalid';
        break;

      case 'auth/too-many-requests':
        errorMessage = 'Too many requests, please try again later';
        break;

      case 'auth/user-disabled':
        errorMessage = 'User account is disabled';
        break;
    }

    // Return more secure error message
    return new Response(errorMessage, {
      status: 500,
    });
  }

  // Return ok response
  return new Response('Successfully created new user', { status: 200 });
};
