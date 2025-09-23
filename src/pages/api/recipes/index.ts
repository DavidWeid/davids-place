import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { getFirestore } from 'firebase-admin/firestore';

// Create a new recipe
export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const title = formData.get('title')?.toString();

  if (!title) {
    return new Response('Title is required', { status: 400 });
  }

  try {
    const db = getFirestore(app);
    const recipesRef = db.collection('recipes');
    await recipesRef.add({ title });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
  return redirect('/cookbook');
};
