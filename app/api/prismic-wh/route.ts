import { PrismicPayload } from '@/types';
import { timingSafeEqual } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { env, isWebhookSecretConfigured } from '@/lib/env';

export async function POST(req: NextRequest) {
    try {
        const payload: PrismicPayload = await req.json();

        // Extract the secret from the request headers
        const secret = req.headers.get('secret');
        if (!secret) {
            return new NextResponse('Missing secret', { status: 400 });
        }

        // Validate the Prismic webhook signature
        const isValidSecret = verifySecret(secret);
        if (!isValidSecret) {
            return new NextResponse('Invalid webhook secret', { status: 400 });
        }

        // Handle the event only on api update
        if (payload.type === 'api-update') {
            const documentids = payload.documents;
            // Revalidate the home page and affected blog posts
            revalidatePath('/');
            for (const documentId of documentids) {
                revalidatePath(`/${documentId}`);
            }
            return new NextResponse('Revalidation triggered successfully', { status: 200 });
        } else if (payload.type === 'test-trigger') {
            return new NextResponse('Test trigger success', { status: 200 });
        }

        return new NextResponse('Invalid webhook payload', { status: 400 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

function verifySecret(payloadSecret: string): boolean {
    if (!isWebhookSecretConfigured()) {
        console.error('Webhook secret is not configured properly.');
        return false;
    }
    
    const bufferA = Buffer.from(payloadSecret);
    const bufferB = Buffer.from(env.prismicWebhookSecret);

    if (bufferA.length !== bufferB.length) return false;

    return timingSafeEqual(bufferA, bufferB);
}
