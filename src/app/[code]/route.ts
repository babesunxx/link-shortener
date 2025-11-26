import { NextResponse } from 'next/server';
import { getLink } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    const originalUrl = await getLink(code);

    if (originalUrl) {
        return NextResponse.redirect(originalUrl);
    }

    // If not found, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
}
