import { PrismicPyload } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const payload: PrismicPyload = await req.json();

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
            await triggerRebuild();
            return new NextResponse('Rebuild triggered successfully', { status: 200 });
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
    const secret = process.env.PRISMIC_WEBHOOK_SECRET;
    if (!secret) {
        throw new Error('webhook secret not defined');
    }

    return payloadSecret === secret;
}

async function triggerRebuild() {
    const buildUrl = process.env.VERCEL_BUILD_TRIGGER_URL;

    if (!buildUrl) {
        throw new Error('Vercel build URL is not defined');
    }

    const response = await fetch(buildUrl);

    if (!response.ok) {
        throw new Error('Failed to trigger rebuild');
    }

}