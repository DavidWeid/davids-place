import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore(app);
const recipesRef = db.collection('recipes');

// Update a recipe
export const POST: APIRoute = async ({ request, params, redirect }) => {
  const formData = await request.formData();
  const title = formData.get('title')?.toString();

  if (!title) {
    return new Response('Title is required', { status: 400 });
  }

  if (!params.id) {
    return new Response('Recipe not found', { status: 400 });
  }

  try {
    await recipesRef.doc(params.id).update({ title });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
  return redirect('/cookbook');
};

// Delete a recipe
export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response('Recipe not found', { status: 400 });
  }

  try {
    await recipesRef.doc(params.id).delete();
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
  return redirect('/cookbook');
};
