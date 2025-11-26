import { NextResponse } from 'next/server';
import { saveLink, initDb } from '@/lib/db';

export async function POST(request: Request) {
    try {
        // Initialize database (create table if not exists)
        await initDb();

        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Validate URL
        try {
            new URL(url);
        } catch {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
        }

        // Save link and get short code
        const shortCode = await saveLink(url);
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${shortCode}`;

        return NextResponse.json({ shortUrl, shortCode });
    } catch (error) {
        console.error('Error shortening URL:', error);
        return NextResponse.json({ error: 'Failed to shorten URL' }, { status: 500 });
    }
}
