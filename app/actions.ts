'use server';

import { COMMENTS, HTTP_STATUS } from '@/lib/constants';
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

export async function submitComment(formData: FormData) {
  const { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH } = COMMENTS;
  const db_url = process.env.DATABASE_URL;

  if (!db_url) {
    return { error: 'Database URL not configured', status: HTTP_STATUS.INTERNAL_SERVER_ERROR };
  }

  try {
    const id = formData.get('id') as string;
    const slug = formData.get('slug') as string;
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!slug || !message) {
      return { error: 'Slug and message are required', status: HTTP_STATUS.BAD_REQUEST };
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return { error: 'Message too long.', status: HTTP_STATUS.BAD_REQUEST };
    }

    if (name.length > MAX_NAME_LENGTH) {
      return { error: 'Name too long.', status: HTTP_STATUS.BAD_REQUEST };
    }

    const sql = neon(db_url);

    const existing = await sql`SELECT id FROM public.comments WHERE id = ${id}`;

    if (existing.length > 0) {
      return { error: 'Comment already exists', status: HTTP_STATUS.CONFLICT };
    }

    const result = await sql`
      INSERT INTO public.comments (id, slug, name, message)
      VALUES (${id}, ${slug}, ${name}, ${message})
      RETURNING *
    `;

    if (!result || result.length === 0) {
      return { error: 'Failed to create comment', status: HTTP_STATUS.INTERNAL_SERVER_ERROR };
    }

    revalidatePath(`/${slug}`);
    return { success: true, status: HTTP_STATUS.CREATED };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { error: 'Internal server error', status: HTTP_STATUS.INTERNAL_SERVER_ERROR };
  }
}

