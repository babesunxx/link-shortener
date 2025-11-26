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

        // Get base URL from request
        const baseUrl = new URL(request.url).origin;
        const shortUrl = `${baseUrl}/${shortCode}`;

        return NextResponse.json({ shortUrl, shortCode });
    } catch (error) {
        console.error('Error shortening URL:', error);
        return NextResponse.json({ error: 'Failed to shorten URL' }, { status: 500 });
    }
}
