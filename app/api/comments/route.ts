import { HTTP_STATUS } from '@/lib/constants';
import { neon } from '@neondatabase/serverless';
import DOMPurify from "isomorphic-dompurify";
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const db_url = process.env.DATABASE_URL;
  if (!db_url) return new NextResponse('Database URL not configured', { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });

  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return new NextResponse('Slug parameter is required', { status: HTTP_STATUS.BAD_REQUEST });
  }

  const sql = neon(db_url);
  const comments = await sql`SELECT * FROM public.comments WHERE "slug" = ${slug} ORDER BY "createdAt"`;

  if (comments.length === 0) {
    return new NextResponse('Not found', { status: HTTP_STATUS.NOT_FOUND });
  }

  return new NextResponse(JSON.stringify(comments), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: NextRequest) {
  const db_url = process.env.DATABASE_URL;
  if (!db_url) return new NextResponse('Database URL not configured', { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });

  try {
    const body = await request.json();
    const { id, slug, name, message } = body;

    const sanitizedMessage = DOMPurify.sanitize(message);
    const sanitizedName = DOMPurify.sanitize(name);

    if (!slug || !sanitizedMessage) {
      return new NextResponse('Slug and message are required', { status: HTTP_STATUS.BAD_REQUEST });
    }

    const sql = neon(db_url);

    const existing = await sql`SELECT id FROM public.comments WHERE id = ${id}`;

    if (existing.length > 0) {
      return new NextResponse(JSON.stringify({ error: 'Comment already exists', id }), {
        status: HTTP_STATUS.CONFLICT,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await sql`
      INSERT INTO public.comments (id, slug, name, message)
      VALUES (${id}, ${slug}, ${sanitizedName || 'Anonymous'}, ${sanitizedMessage})
      RETURNING *
    `;

    if (!result || result.length === 0) {
      return new NextResponse('Failed to create comment', { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }

    const comment = result[0];
    return new NextResponse(JSON.stringify({ comment }), {
      status: HTTP_STATUS.CREATED,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new NextResponse('Internal server error', { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
  }
}

